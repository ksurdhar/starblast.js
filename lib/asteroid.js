(function (root){
  var Starblast;
  if (typeof(window) === 'undefined'){
    Starblast = global.Starblast = (global.Starblast || {});
  } else {
    Starblast = window.Starblast = (window.Starblast || {});
  }

  var Asteroid = Starblast.Asteroid = function(options){
    options.color = ASTEROID.GRAY;
    options.radius = ASTEROID.RADIUS;

    Starblast.MovingObject.call(this, options);
  };

  ASTEROID.GRAY = "#555";
  ASTEROID.RADIUS = 25;
  ASTEROID.SPEED 4;

  Asteroid.prototype.randomAsteroid = function(game) {
    return new Asteroid({
      pos: game.randomPosition(),
      vel: Starblast.Util.randomVec(ASTEROID.SPEED),
      game: game
    });
  };



})();