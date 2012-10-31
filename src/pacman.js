function type(o){
    return !!o && Object.prototype.toString.call(o).match(/(\w+)\]/)[1];
}

function PacmanGame(param1, param2){
	this.init(param1, param2);
}
PacmanGame.prototype = {
	pacFace : {
			left:  '>',
			right: '<',
			down:  'A',
			up:    'V'	
		},
	directions : {
			up:     {y:-1,x:+0},
			down:   {y:+1,x:+0},
			right:  {y:+0,x:+1},
			left:   {y:+0,x:-1}	
		},

	init: function(param1, param2){
		if(type(param1) === "Array"){
			this.rows = param1[0].length;
			this.cols = param1[0][0].length;
			this.levels = param1;
			this.board = this.levels[0];
		} else {
			this.rows = param1;
			this.cols = param2;
			this.board = [];
			this.initBoard();
		}

		this.points = 0;

		var center = Math.floor(this.rows/2);
		this.pacState = "up";

		this.currentPosition = {x: center, y: center};

		this.updateFace();
	},

	initBoard : function(){
		for(var y = 0; y < this.rows; y ++){
			row = [];
			this.board.push(row);
			for(var x = 0; x < this.cols; x ++){
				row.push('.');
			}
		}
	},

	cell :  function(row, col){ 
		return this.board[row][col];
	},

	next : function(){
		this.move(this.directions[this.pacState]);
	},

	nextPosition : function(direction){
		var pacX = this.currentPosition.x;
		var pacY = this.currentPosition.y;
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
		if(this.isDot(probe)){
			this.points ++;
		}
		if(! this.isWall(probe)){
			this.eraseCurrentPosition();
			this.currentPosition = probe;
			this.updateFace();
		}
	},

	isDot : function(position){
		return this.cell(position.y, position.x) === '.';
	},

	isWall : function(position){
		return this.cell(position.y, position.x) === '#';
	},

	changeDir : function(direction) {
		this.pacState = direction;
		this.updateFace();
	},

	eraseCurrentPosition : function(){
		this.updateCell(this.currentPosition,' ');
	},

	updateFace : function(){
		this.updateCell(this.currentPosition,this.pacFace[this.pacState]);
	},

	updateCell : function(position, value){
		this.board[position.y][position.x] = value;
		if (this.view)	this.view.updateCell(position.y,position.x);	
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