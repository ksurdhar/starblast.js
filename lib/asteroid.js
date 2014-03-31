(function (root){
  var Starblast;
  if (typeof(window) === 'undefined'){
    Starblast = global.Starblast = (global.Starblast || {});
  } else {
    Starblast = window.Starblast = (window.Starblast || {});
  }

  var Asteroid = Starblast.Asteroid = function(options){
    options.color = Asteroid.GRAY;
    options.radius = Asteroid.RADIUS;

    Starblast.MovingObject.call(this, options);
  };

  Asteroid.GRAY = "#FFFFFF";
  Asteroid.RADIUS = 25;
  Asteroid.SPEED = 4;

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


  



})();