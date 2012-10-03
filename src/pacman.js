PacmanGame = function(rows, cols){

	var center = Math.round(rows/2) -1,
		pac_x = center,
		pac_y = center,
		pacState = "up";

	var pacFace = {
		left:  '>',
		right: '<',
		down:  'A',
		up:    'V'	
	}	

	var directions = {
		up:     {y:-1,x:+0},
		down:   {y:+1,x:+0},
		right:  {y:+0,x:+1},
		left:   {y:+0,x:-1}	
	}
	var board = [];

	for(var y = 0; y < rows; y ++){
		row = [];
		board.push(row);
		for(var x = 0; x < cols; x ++){
			row.push('.');
		}
	}

	board[center][center] = pacFace[pacState];
	

	this.cell =  function(row, col){ 
		return board[row][col];
	}

	this.next = function(){

		this.move(directions[pacState]);
	}

	this.move = function(direction){

		pac_x += direction.x;
		pac_y += direction.y;

		if (pac_y < 0){
			pac_y = rows - 1;
		}
		if (pac_x >= cols ){
			pac_x = 0
		}
		if (pac_x < 0){
			pac_x = cols - 1;
		}
		if (pac_y  >= rows){
			pac_y = 0;
		}

		board[pac_y][pac_x] = pacFace[pacState];
		
	}

	this.changeDir = function(direction) {
		pacState = direction;
		board[pac_y][pac_x] = pacFace[pacState];
	}
}