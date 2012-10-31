describe("Pacman", function() {
  
  beforeEach(function(){
    this.game = new PacmanGame(3,3);
  });

  it("starts at the center", function() {
    var game = new PacmanGame(1,1);
    expect(game.cell(0,0)).toBe('V');

    var game = new PacmanGame(1,3);
    expect(game.cell(0,1)).toBe('V');

    var game = new PacmanGame(3,3);
    expect(game.cell(1,1)).toBe('V');
  });

  it("lives on a dotted grid and starts in the center", function() {
    for (var i = 0; i< 3; i++)
      for (var j = 0; j< 3; j++){
        if (i == 1 && j == 1){
          expect(this.game.cell(1,1)).toBe('V');
        }else{
          expect(this.game.cell(i,j)).toBe('.');
        }
      }
    
  });

  it('works with levels',function(){
    levels = [
      [
        ['.','.','.',], 
        ['.',' ','.',],
        ['.','.','.',]
      ]
    ]
    this.game = new PacmanGame(levels);
        
    for (var i = 0; i< 3; i++)
      for (var j = 0; j< 3; j++){
        if (i == 1 && j == 1){
          expect(this.game.cell(1,1)).toBe('V');
        }else{
          expect(this.game.cell(i,j)).toBe('.');
        }
      }
  });

  it("starts with zero points", function(){
    expect(this.game.points).toBe(0);   
  });

  it("walks upwards at each turn", function() {
    this.game.next();
    expect(this.game.cell(0,1)).toBe('V');

  });

  it("walks upwards and wraps when hits the edge", function() {
    this.game.next();
    this.game.next();
    expect(this.game.cell(2,1)).toBe('V');
  });


  it("changes the direction", function(){
    this.game.changeDir("left");
    expect(this.game.cell(1,1)).toBe('>');

    this.game.changeDir("right");
    expect(this.game.cell(1,1)).toBe('<');

    this.game.changeDir("up");
    expect(this.game.cell(1,1)).toBe('V');

    this.game.changeDir("down");
    expect(this.game.cell(1,1)).toBe('A');    

  });

  it("walks left at each turn", function() {
    this.game.changeDir('left');
    this.game.next();
    expect(this.game.cell(1,0)).toBe('>');

  });

  it("walks left and wraps when hits the edge", function() {
    this.game.changeDir('left')
    this.game.next();
    this.game.next();
    expect(this.game.cell(1,2)).toBe('>');

  });

  it("walks right at each turn", function() {
    this.game.changeDir('right');
    this.game.next();
    expect(this.game.cell(1,2)).toBe('<');

  });

  it("walks right and wraps when hits the edge", function() {
    this.game.changeDir('right')
    this.game.next();
    this.game.next();
    expect(this.game.cell(1,0)).toBe('<');

  });

  it("walks down at each turn", function() {
    this.game.changeDir('down');
    this.game.next();
    expect(this.game.cell(2,1)).toBe('A');

  });

  it("walks downwards and wraps when hits the edge", function() {
    this.game.changeDir('down')
    this.game.next();
    this.game.next();
    expect(this.game.cell(0,1)).toBe('A');

  });

  it("eats dot when moves", function() {
      this.game.changeDir('down');
      this.game.next();
      expect(this.game.cell(1,1)).toBe(' '); 
  });

  it("eats dots when moves", function() {
      this.game.changeDir('down');
      this.game.next();
      this.game.next();
      expect(this.game.cell(1,1)).toBe(' ');
      expect(this.game.cell(2,1)).toBe(' ');
  });

  it("counts one point per dot eaten", function(){
      this.game.next(); // dot
      expect(this.game.points).toBe(1);  
      this.game.next(); // dot
      this.game.next(); // blank
      expect(this.game.points).toBe(2);  
  });

  it("changes level when all dots are eaten", function(){
      this.game = new PacmanGame([
          // level 1
          [
            ['.',' ', ' ']
          ],
          //level 2
          [
            ['#',' ', '.']
          ]
        ]);

      this.game.changeDir('left');
      this.game.next();

      //returns to center
      expect(this.game.cell(0, 1)).toBe('V');

      //in level 2 board
      expect(this.game.cell(0, 0)).toBe('#');
  });

  it("changes level every time all dots are eaten", function(){
      this.game = new PacmanGame([
          // level 1
          [
            ['.',' ', ' ']
          ],
          //level 2
          [
            ['#',' ', '.']
          ]
        ]);

      this.game.changeDir('left');
      this.game.next();

      this.game.changeDir('right');
      this.game.next();

      //returns to center
      expect(this.game.cell(0, 1)).toBe('V');

      //returns to level 1
      expect(this.game.cell(0, 0)).toBe('.');
  });

  it("notify observer when change direction", function(){
    var observer = new Object();
    var calledUpdate = false;
    var self = this;
    observer.updateCell = function(y,x){
      calledUpdate = true;
      expect(x).toBe(1);
      expect(y).toBe(1);
      expect(self.game.cell(y,x)).toBe('>');
    }
    this.game.setView(observer);
    this.game.changeDir("left");
    expect(calledUpdate).toBe(true);
  });

  it("notify observer when moves", function(){
    var observer = new Object();
    var countEvents = 0;
    var calledUnexpectedPosition = false;

    var self = this;
    observer.updateCell = function(y,x){
      countEvents++;
      if( x == 1 && y == 0){
        expect(self.game.cell(y,x)).toBe('V');
      }else if( x == 1 && y == 1){
        expect(self.game.cell(y,x)).toBe(' ');
      }else{
        console.log(x+','+y)
        calledUnexpectedPosition = true;
      }
    }

    this.game.setView(observer);
    this.game.next();

    expect(countEvents).toBe(2);
    expect(calledUnexpectedPosition).toBe(false);
  });

  it("stops at a wall", function() {
    this.game.setWall(0,1);
    this.game.next();
    expect(this.game.cell(1,1)).toBe('V');

  });

});


describe("PacmanView", function() {
  
  beforeEach(function(){
    jasmine.Clock.useMock();
    this.game = new PacmanGame(3,3);
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
    var div = $('<div>');
    var gameView = new PacmanGameView(this.game,div);

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
    var div = $('<div>');

    var gameView = new PacmanGameView(this.game,div);

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
    var div = $('<div>');
    var gameView = new PacmanGameView(this.game,div);

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
    var div = $('<div>');
    var gameView = new PacmanGameView(this.game,div);

    $(window).trigger(jQuery.Event("keyup", { keyCode: 2 }));

    jasmine.Clock.tick(201);

    expect(div.find('td').eq(1).text()).toBe('V');

  });

});