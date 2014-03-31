(function (root){
  var Starblast;
  if (typeof(window) === 'undefined'){
    Starblast = global.Starblast = (global.Starblast || {});
  } else {
    Starblast = window.Starblast = (window.Starblast || {});
  }

  var Game = Starblast.Game = function(){
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.lastTickTime = null;
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 15;
  Game.BLACK = "#000";


  Game.prototype.add = function (object) {
    if (object.constructor == Starblast.Asteroid) {
      this.asteroids.push(object);
    } else if (object.constructor == Starblast.Bullet) {
      this.bullets.push(object);
    } else if (object.constructor == Starblast.Ship) {
      this.ships.push(object);
    } else {
      throw "wtf?";
    }
  }

  Game.prototype.randomPosition = function() {
    return [
      Game.DIM_X * Starblast.Util.random(),
      Game.DIM_Y * Starblast.Util.random()
    ];
  };

  Game.prototype.addShip = function() {
    var ship = new Starblast.Ship({
      pos: this.randomPosition(), game: this
    });

    this.add(ship);
    return ship;
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BLACK;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.allObjects = function() {
    return []
      .concat(this.asteroids)
      .concat(this.ships)
      .concat(this.bullets);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.new = function () {
    var game = new this();
    game.addAsteroids(this.NUM_ASTEROIDS);

    return game;
  }

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.add(Starblast.Asteroid.randomAsteroid(this));
    }
  };

  Game.prototype.moveObjects = function() {
    if (!this.lastTickTime) {
      this.lastTickTime = (new Date()).getTime();
    }

    var timeNow = (new Date()).getTime();
    var numTicks = Game.FPS * ((timeNow - this.lastTickTime) / 1000);
    this.lastTickTime = timeNow;

    this.allObjects().forEach(function (object) {
      object.move(numTicks);
    });
  }

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

})(this);

















