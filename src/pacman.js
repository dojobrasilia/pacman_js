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

	move : function(direction){
		this.eraseCurrentPosition();

		this.pac_x += direction.x;
		this.pac_y += direction.y;

		if (this.pac_y < 0){
			this.pac_y = this.rows - 1;
		}
		if (this.pac_x >= this.cols ){
			this.pac_x = 0
		}
		if (this.pac_x < 0){
			this.pac_x = this.cols - 1;
		}
		if (this.pac_y  >= this.rows){
			this.pac_y = 0;
		}

		this.updateFace();
		
	},

	changeDir : function(direction) {
		this.pacState = direction;
		this.updateFace();
	},

	eraseCurrentPosition : function(){
		this.board[this.pac_y][this.pac_x] = ' ';
	},

	updateFace : function(){
		this.board[this.pac_y][this.pac_x] = this.pacFace[this.pacState];
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

		setInterval(function(){
			console.log(this);
	    	game.next();
	        self.container.html('');
		    self.createTable();
		}, 200); 
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
		
	}
}