PacmanGame = function(rows, cols){

	var center = Math.round(rows/2) -1;

	var pac_x = center;
	var pac_y = center;

	this.cell =  function(row, col){ 
		if( row == pac_y && col == pac_x) {
			return 'V'
		} else {
			return '.'
		}
	}

	this.next = function(){
		pac_y--;
	}
}