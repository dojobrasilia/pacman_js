describe("Pacman", function() {
  
  it("starts at the center", function() {
    var game = new PacmanGame(1,1);
        
    expect(game.cell(0,0)).toBe('V');
  });

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

  it("walks upwards at each turn", function() {
    var game = new PacmanGame(3,3);
    
    game.next();
    expect(game.cell(0,1)).toBe('V');

  });

  it("walks upwards and wraps when hits the edge", function() {
    var game = new PacmanGame(3,3);
    
    game.next();
    game.next();
    expect(game.cell(2,1)).toBe('V');

  });


  it("changes the direction", function(){
    var game = new PacmanGame(3,3);
    game.changeDir("left");
    expect(game.cell(1,1)).toBe('>');

    game.changeDir("right");
    expect(game.cell(1,1)).toBe('<');

    game.changeDir("up");
    expect(game.cell(1,1)).toBe('V');

    game.changeDir("down");
    expect(game.cell(1,1)).toBe('A');    

  });

  it("walks left at each turn", function() {
    var game = new PacmanGame(3,3);
    
    game.changeDir('left');
    game.next();
    expect(game.cell(1,0)).toBe('>');

  });

  it("walks left and wraps when hits the edge", function() {
    var game = new PacmanGame(3,3);
    
    game.changeDir('left')
    game.next();
    game.next();
    expect(game.cell(1,2)).toBe('>');

  });

  it("walks right at each turn", function() {
    var game = new PacmanGame(3,3);
    
    game.changeDir('right');
    game.next();
    expect(game.cell(1,2)).toBe('<');

  });

  it("walks right and wraps when hits the edge", function() {
    var game = new PacmanGame(3,3);
    
    game.changeDir('right')
    game.next();
    game.next();
    expect(game.cell(1,0)).toBe('<');

  });

  it("walks down at each turn", function() {
    var game = new PacmanGame(3,3);
    
    game.changeDir('down');
    game.next();
    expect(game.cell(2,1)).toBe('A');

  });

  it("walks downwards and wraps when hits the edge", function() {
    var game = new PacmanGame(3,3);
    
    game.changeDir('down')
    game.next();
    game.next();
    expect(game.cell(0,1)).toBe('A');

  });

  it("eats dot when moves", function() {
     var game = new PacmanGame(3,3);
    
      game.changeDir('down');
      game.next();
      expect(game.cell(1,1)).toBe(' '); 
  });

  it("eats dots when moves", function() {
     var game = new PacmanGame(3,3);
    
      game.changeDir('down');
      game.next();
      game.next();
      expect(game.cell(1,1)).toBe(' ');
      expect(game.cell(2,1)).toBe(' ');
  });



});