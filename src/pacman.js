function Pacman(state,board,position){
	this.init(state,board,position);
}
Pacman.prototype = {
	directions : {
			up:     {y:-1,x:+0},
			down:   {y:+1,x:+0},
			right:  {y:+0,x:+1},
			left:   {y:+0,x:-1}	
		},
	
	pacFace : {
		    left:  '>',
			right: '<',
			down:  'A',
			up:    'V'	
		},

	init : function(state,board,position){
		this.state = state;
		this.position = position;
		this.board = board;
	},

	nextPosition : function(){
		var direction = this.directions[this.state];
		var pacX = this.position.x + direction.x;
		var pacY = this.position.y + direction.y;

		if (pacY < 0){
			pacY = this.board.rows - 1;
		}
		if (pacX >= this.board.cols ){
			pacX = 0
		}
		if (pacX < 0){
			pacX = this.board.cols - 1;
		}
		if (pacY  >= this.board.rows){
			pacY = 0;
		}

		return {x: pacX, y: pacY}
	},

	move : function(probe){
		this.board.erasePosition(this.position);
		this.position = probe;
		this.updateFace();
	},

	updateFace : function(){
		this.board.updateCell(this.position, this.face());
	},

	face : function () {
		return this.pacFace[this.state];
	},

	changeDirection : function(direction){
		this.state = direction;
		this.updateFace();
	}

}