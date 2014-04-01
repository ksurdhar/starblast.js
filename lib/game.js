(function (root){
  var Starblast = root.Starblast = (root.Starblast || {});
  
  var Game = Starblast.Game = function(options){
    this.asteroids = [];
    this.stars = [];
    this.bullets = [];
    this.dim_x = options.width;
    this.dim_y = options.height;
    this.ships = [];
    this.lastTickTime = null;
    this.addAsteroids(15);
    this.addStars(20);
  };

  Game.FPS = 32;
  Game.BLACK = "#2c3e50";

  Game.prototype.freeze = function() {
    this.asteroids.forEach(function(asteroid){
      asteroid.color = "#34495e"
      asteroid.vel = [1,0];
    });
  };

  Game.prototype.unfreeze = function() {
    this.asteroids.forEach(function(asteroid){
      asteroid.color = "#ecf0f1"
      asteroid.vel = Starblast.Util.randomVec(5)
    });
  };

  Game.prototype.add = function (object) {
    if (object.constructor == Starblast.Asteroid) {
      this.asteroids.push(object);
    } else if (object.constructor == Starblast.Bullet) {
      this.bullets.push(object);
    } else if (object.constructor == Starblast.Ship) {
      this.ships.push(object);
    } else if (object.constructor == Starblast.Star) {
      this.stars.push(object);
    } else {
      throw "wtf?";
    }
  }

  Game.prototype.randomPosition = function() {
    return [
      this.dim_x * Starblast.Util.random(),
      this.dim_y * Starblast.Util.random()
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
    ctx.clearRect(0, 0, this.dim_x, this.dim_y);
    ctx.fillStyle = Game.BLACK;
    ctx.fillRect(0, 0, this.dim_x, this.dim_y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.allObjects = function() {
    return []
      .concat(this.asteroids)
      .concat(this.ships)
      .concat(this.bullets)
      .concat(this.stars);
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

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0)
      || (pos[0] > this.dim_x) || (pos[1] > this.dim_y);
  };

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.add(Starblast.Asteroid.randomAsteroid(this));
    }
  };

  Game.prototype.addStars = function (numStars) {
    for (var i = 0; i < numStars; i++) {
      this.add(Starblast.Star.randomStar(this));
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

  return root;
})(this);

















