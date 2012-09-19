PacmanGame = function(rows, cols){

	var center = Math.round(rows/2) -1;

	var pac_x = center;
	var pac_y = center;
	var pacFace = new Array();
	pacFace['left'] = '>';
	pacFace['right'] = '<';
	pacFace['down'] = 'A';
	pacFace['up'] = 'V';

	var pacState = pacFace['up'];



	this.cell =  function(row, col){ 
		if( row == pac_y && col == pac_x) {
			return pacState;
		} else {
			return '.'
		}
	}

	this.next = function(){
		if (-- pac_y < 0){
			pac_y = rows - 1;
		}
	}

	this.changeDir = function(direction) {
		pacState = pacFace[direction];	
	}
}