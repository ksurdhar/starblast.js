(function (root){
  var Starblast = root.Starblast = (root.Starblast || {});

  var Asteroid = Starblast.Asteroid = function(options){
    options.color = Asteroid.GRAY;
    options.radius = Asteroid.RADIUS;

    Starblast.MovingObject.call(this, options);
  };

  Asteroid.GRAY = "#ecf0f1";
  Asteroid.RADIUS = 40;
  Asteroid.SPEED = 5;

  Asteroid.randomAsteroid = function(game) {
    return new Asteroid({
      pos: game.randomPosition(),
      vel: Starblast.Util.randomVec(Asteroid.SPEED),
      game: game
    });
  };

  Starblast.Util.inherits(Asteroid, Starblast.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject.constructor !== Starblast.Ship) {
      return;
    }
    
    otherObject.relocate();
  }
  return root;
})(this);