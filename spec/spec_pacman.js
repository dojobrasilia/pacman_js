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
            ['#','.','#'],
            ['#',' ','#'],
            ['#','.','#']
          ],
          //level 2
          [
            [' ','.','#'],
            ['.',' ','#'],
            [' ','.','#']
          ]
        ]);

      expect(this.game.cell(1, 1)).toBe('V');

      this.game.next();
      this.game.next();

      //returns to center
      expect(this.game.cell(1, 1)).toBe('V');

      //in level 2 board
      expect(this.game.cell(0, 0)).toBe(' ');
  });

  it("ignores dot at the center", function(){
      this.game = new PacmanGame([
          // level 1
          [
            ['#','.','#'],
            ['#','.','#'],
            ['#','.','#']
          ],
          //level 2
          [
            [' ','.','#'],
            ['.',' ','#'],
            [' ','.','#']
          ]
        ]);

      expect(this.game.cell(1, 1)).toBe('V');

      this.game.next();
      this.game.next();

      //returns to center
      expect(this.game.cell(1, 1)).toBe('V');

      //in level 2 board
      expect(this.game.cell(0, 0)).toBe(' ');
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
          ],
          //level 3
          [
            ['.',' ', '.']
          ]
        ]);

      this.game.changeDir('left');
      this.game.next();

      this.game.changeDir('right');
      this.game.next();

      //returns to center
      expect(this.game.cell(0, 1)).toBe('V');

      //goest to level 3
      expect(this.game.cell(0, 0)).toBe('.');
      expect(this.game.cell(0, 2)).toBe('.');
  });

  it("changes return to first level when all is finished", function(){
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

      //goest to level 3
      expect(this.game.cell(0, 0)).toBe('.');
      expect(this.game.cell(0, 2)).toBe(' ');
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

  describe('ghost', function() {
    
    it("can be placed somewhere", function() {
      this.game.setGhost(0,0);
      expect(this.game.cell(0,0)).toBe('Ö');
    });

    it("moves ramdomly to the right", function() {
      this.game.setGhost(0,0);
      Math.random = function(){
        return 0.24;
      }

      this.game.changeDir('left');
      expect(this.game.cell(0,1)).toBe('.');

      this.game.next();
      expect(this.game.cell(0,0)).toBe('.');
      expect(this.game.cell(0,1)).toBe('Ö');

      this.game.next();
      expect(this.game.cell(0,2)).toBe('Ö');
      expect(this.game.cell(0,1)).toBe('.');
    });

  });

});

