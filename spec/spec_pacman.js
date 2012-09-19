describe("Pacman", function() {
  
  it("lives on a dotted grid and starts in the center", function() {
    var game = new PacmanGame(3,3);

    for (var i = 0; i< 3; i++)
      for (var j = 0; j< 3; j++){
        if (i == 1 && j == 1){
          expect(game.cell(1,1)).toBe('V');
        }else{
          expect(game.cell(i,j)).toBe('.');
        }
      }
    
  });

  it("verify the center", function() {
    var game = new PacmanGame(1,1);
        
    expect(game.cell(0,0)).toBe('V');
  });

  it("walks at each turn", function() {
    var game = new PacmanGame(3,3);
    
    game.next();
    expect(game.cell(0,1)).toBe('V');

  });

});