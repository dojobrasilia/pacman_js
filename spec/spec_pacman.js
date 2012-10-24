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

  it("notify observer when change direction", function(){
    var game = new PacmanGame(3,3);
    var observer = new Object();
    var calledUpdate = false;
    observer.updateCell = function(y,x){
      calledUpdate = true;
      expect(x).toBe(1);
      expect(y).toBe(1);
      expect(game.cell(y,x)).toBe('>');
    }
    game.setObserver(observer);
    game.changeDir("left");
    expect(calledUpdate).toBe(true);
  });

  it("notify observer when moves", function(){
    var game = new PacmanGame(3,3);
    var observer = new Object();
    var countEvents = 0;
    var calledUnexpectedPosition = false;

    observer.updateCell = function(y,x){
      countEvents++;
      if( x == 1 && y == 0){
        expect(game.cell(y,x)).toBe('V');
      }else if( x == 1 && y == 1){
        expect(game.cell(y,x)).toBe(' ');
      }else{
        console.log(x+','+y)
        calledUnexpectedPosition = true;
      }
    }

    game.setObserver(observer);
    game.next();

    expect(countEvents).toBe(2);
    expect(calledUnexpectedPosition).toBe(false);
  });

});


describe("PacmanView", function() {
  
  beforeEach(function(){
    jasmine.Clock.useMock();
  });

  it("renders table with 1 cell", function() {
    var game = new PacmanGame(1,1);
    var div = $('<div>');
    var gameView = new PacmanGameView(game,div);

    expect(div).toContain('table');

    expect(div.find('tr').length).toBe(1);
    expect(div.find('td').length).toBe(1);
    expect(div.find('td').text()).toBe('V')
  });

  it("renders table with 3x3 cells", function() {
    var game = new PacmanGame(3,3);
    var div = $('<div>');
    var gameView = new PacmanGameView(game,div);

    expect(div).toContain('table');

    expect(div.find('tr').length).toBe(3);
    expect(div.find('td').length).toBe(9);

    expect(div.find('td').eq(0).text()).toBe('•');
    expect(div.find('td').eq(1).text()).toBe('•');
    expect(div.find('td').eq(2).text()).toBe('•');
    expect(div.find('td').eq(3).text()).toBe('•');
    expect(div.find('td').eq(4).text()).toBe('V');
    expect(div.find('td').eq(5).text()).toBe('•');
    expect(div.find('td').eq(6).text()).toBe('•');
    expect(div.find('td').eq(7).text()).toBe('•');
    expect(div.find('td').eq(8).text()).toBe('•');
  });  

  it("updates the position every 200ms", function() {
    var game = new PacmanGame(3,3);
    
    var div = $('<div>');

    var gameView = new PacmanGameView(game,div);

    jasmine.Clock.tick(201);
    expect(div.find('td').eq(0).text()).toBe('•');
    expect(div.find('td').eq(1).text()).toBe('V');
    expect(div.find('td').eq(2).text()).toBe('•');
    expect(div.find('td').eq(3).text()).toBe('•');
    expect(div.find('td').eq(4).text()).toBe(' ');
    expect(div.find('td').eq(5).text()).toBe('•');
    expect(div.find('td').eq(6).text()).toBe('•');
    expect(div.find('td').eq(7).text()).toBe('•');
    expect(div.find('td').eq(8).text()).toBe('•');

  });

  it("changes direction to left when presses on left arrow", function() {
    var game = new PacmanGame(3,3);
    var div = $('<div>');
    var gameView = new PacmanGameView(game,div);

    $(window).trigger(jQuery.Event("keyup", { keyCode: 37 }));

    jasmine.Clock.tick(201);

    expect(div.find('td').eq(3).text()).toBe('>');

    $(window).trigger(jQuery.Event("keyup", { keyCode: 39 }));
  
    jasmine.Clock.tick(201);

    expect(div.find('td').eq(4).text()).toBe('<');
  
    $(window).trigger(jQuery.Event("keyup", { keyCode: 38 }));

    jasmine.Clock.tick(201);

    expect(div.find('td').eq(1).text()).toBe('V');

    $(window).trigger(jQuery.Event("keyup", { keyCode: 40 }));

    jasmine.Clock.tick(201);

    expect(div.find('td').eq(4).text()).toBe('A');
  });

  it("does nothing for any other key", function() {
    var game = new PacmanGame(3,3);
    var div = $('<div>');
    var gameView = new PacmanGameView(game,div);

    $(window).trigger(jQuery.Event("keyup", { keyCode: 2 }));

    jasmine.Clock.tick(201);

    expect(div.find('td').eq(1).text()).toBe('V');

  });

});