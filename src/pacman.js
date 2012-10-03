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

	this.cell =  function(row, col){ 
		if( row == pac_y && col == pac_x) {
			return pacFace[pacState];
		} else {
			return '.'
		}
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
		
	}

	this.changeDir = function(direction) {
		pacState = direction;	
	}
}