PacmanGame = function(rows, cols){

	var center = Math.round(rows/2) -1;

	var pac_x = center;
	var pac_y = center;
	var pacFace = new Array();
	pacFace['left'] = '>';
	pacFace['right'] = '<';
	pacFace['down'] = 'A';
	pacFace['up'] = 'V';

	var pacState = "up";



	this.cell =  function(row, col){ 
		if( row == pac_y && col == pac_x) {
			return pacFace[pacState];
		} else {
			return '.'
		}
	}

	this.next = function(){
		if (pacState == "up"){
			if (-- pac_y < 0){
				pac_y = rows - 1;
			}
		} else{
			-- pac_x;
		}
	}

	this.changeDir = function(direction) {
		pacState = direction;	
	}
}