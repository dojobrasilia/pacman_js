describe("PacmanView", function() {
  
  beforeEach(function(){
    jasmine.Clock.useMock();
    this.game = new PacmanGame(3,3);


    this.hitKey = function(container, direction){
      this.keyCode = {
          'left' :37 ,
          'up'   :38 ,
          'right':39 ,
          'down' :40  
        };
      $(container).trigger(jQuery.Event("keyup", { keyCode: this.keyCode[direction]}));
    }

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

  it("renders score board div", function() {
    var game = new PacmanGame(1,1);
    var div = $('<div>');
    var gameView = new PacmanGameView(game,div);

    expect(div).toContain('div#score');

    expect(div.find('div#score').text()).toBe('0')
  });

 it("maintains the score in the next level", function() {
    var game = new PacmanGame(
      [
        [
          ['.',' ',' ']
        ],
        [
          ['.',' ','.'],
          ['.',' ','.'],
        ],
      ]
      );
    var div = $('<div>');
    var gameView = new PacmanGameView(game,div);

    this.hitKey(window,'left');

    jasmine.Clock.tick(201);

    expect(div.find('div#score').text()).toBe('1');

  });

 it("shows the current level", function() {
    var game = new PacmanGame(
      [
        [
          ['.',' ',' ']
        ],
        [
          ['.',' ','.'],
          ['.',' ','.'],
        ],
      ]
      );
    var div = $('<div>');
    var gameView = new PacmanGameView(game,div);

    this.hitKey(window,'left');

    expect(div.find('div#level').text()).toBe('level 1');

    jasmine.Clock.tick(201);

    expect(div.find('div#level').text()).toBe('level 2');

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

  it("updates ScoreBoard at each new point", function() {
    var div = $('<div>');

    var gameView = new PacmanGameView(this.game,div);

    jasmine.Clock.tick(201);
    expect(div.find('div#score').text()).toBe('1');

  });



  it("changes direction to left when presses on left arrow", function() {
    var div = $('<div>');
    var gameView = new PacmanGameView(this.game,div);

    this.hitKey(window,'left');

    jasmine.Clock.tick(201);

    expect(div.find('td').eq(3).text()).toBe('>');

    this.hitKey(window,'right');
  
    jasmine.Clock.tick(201);

    expect(div.find('td').eq(4).text()).toBe('<');
    
    this.hitKey(window,'up');

    jasmine.Clock.tick(201);

    expect(div.find('td').eq(1).text()).toBe('V');

    this.hitKey(window,'down');

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

  it("Renders new table on a new level ", function() {
    var game = new PacmanGame(
      [
        [
          ['.',' ',' ']
        ],
        [
          ['.',' ','.'],
          ['.',' ','.'],
        ],
      ]
      );
    var div = $('<div>');
    var gameView = new PacmanGameView(game,div);

    this.hitKey(window,'left');

    jasmine.Clock.tick(201);

    expect(div).toContain('table');

    expect(div.find('tr').length).toBe(2);
    expect(div.find('td').length).toBe(6);
  });

});