function PacmanGame(rows, cols){
	this.init(rows,cols);
}
PacmanGame.prototype = {
	init: function(rows, cols){
		this.rows = rows;
		this.cols = cols;
		var center = Math.floor(rows/2);
		this.pacState = "up";

		this.pac_x = center;
		this.pac_y = center;

		this.pacFace = {
			left:  '>',
			right: '<',
			down:  'A',
			up:    'V'	
		}	

		this.directions = {
			up:     {y:-1,x:+0},
			down:   {y:+1,x:+0},
			right:  {y:+0,x:+1},
			left:   {y:+0,x:-1}	
		}
		this.board = [];

		this.initBoard();
	},

	initBoard : function(){
		for(var y = 0; y < this.rows; y ++){
			row = [];
			this.board.push(row);
			for(var x = 0; x < this.cols; x ++){
				row.push('.');
			}
		}
		this.updateFace();
	},

	cell :  function(row, col){ 
		return this.board[row][col];
	},

	next : function(){
		this.move(this.directions[this.pacState]);
	},

	nextPosition : function(direction){
		var pacX = this.pac_x;
		var pacY = this.pac_y;
		pacX += direction.x;
		pacY += direction.y;

		if (pacY < 0){
			pacY = this.rows - 1;
		}
		if (pacX >= this.cols ){
			pacX = 0
		}
		if (pacX < 0){
			pacX = this.cols - 1;
		}
		if (pacY  >= this.rows){
			pacY = 0;
		}

		return {x: pacX, y: pacY}
	},

	move : function(direction){
		var probe = this.nextPosition(this.directions[this.pacState]);
		if(this.cell(probe.y, probe.x) !== '#'){
			this.eraseCurrentPosition();
			this.pac_x = probe.x;
			this.pac_y = probe.y;
			this.updateFace();
		}
	},

	changeDir : function(direction) {
		this.pacState = direction;
		this.updateFace();
	},

	eraseCurrentPosition : function(){
		this.board[this.pac_y][this.pac_x] = ' ';
		if (this.view)	this.view.updateCell(this.pac_y,this.pac_x);
	},

	updateFace : function(){
		this.board[this.pac_y][this.pac_x] = this.pacFace[this.pacState];
		if (this.view)	this.view.updateCell(this.pac_y,this.pac_x);
	},

	setView : function(view){
		this.view = view;
	},

	setWall : function(y,x){
		this.board[y][x]='#';
	},
}

function PacmanGameView(game, container) {
	 	this.init(game, container);
}

PacmanGameView.prototype = {
	init : function(game, container){
		this.container = container;
		this.game = game;
		this.createTable();
		var self = this;
		game.setView(this);

		this.keyCode = {
			37	: 'left',
			38	: 'up',
			39	: 'right',
			40	: 'down'
		};

		setInterval(function(){
	    	game.next();
		}, 200);

		$(window).keyup(function(e){
			if (self.keyCode[e.keyCode]){
				game.changeDir(self.keyCode[e.keyCode]);
			}
		});
	},

	createTable: function(){
		var table = $('<table>').appendTo(this.container);
		for (var r = 0 ; r < this.game.rows; r ++){
			var row = $('<tr>').appendTo(table);
			for (var c = 0 ; c < this.game.cols; c ++){
				var value = this.game.cell(r, c);
				if (value == '.') value = '•';
				
				row.append($('<td>').html(value));	
			}
		}
		
	},

	updateCell: function(y,x){
		var div = this.container;
		var position = y * this.game.cols + x;
		div.find('td').eq(position).html(this.game.cell(y,x));
	}

}