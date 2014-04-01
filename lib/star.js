(function (root){
  var Starblast = root.Starblast = (root.Starblast || {});

  var Star = Starblast.Star = function(options){
    options.color = Star.COLOR;
    options.radius = Star.RADIUS;

    Starblast.MovingObject.call(this, options);
  };

  Star.COLOR = "#3498db";
  Star.RADIUS = 3;
  Star.SPEED = 1;

  Star.randomStar = function(game) {
    return new Star({
      pos: game.randomPosition(),
      vel: Starblast.Util.randomVec(Star.SPEED),
      game: game
    });
  };

  Starblast.Util.inherits(Star, Starblast.MovingObject);

  Star.prototype.collideWith = function (otherObject) {
    if (otherObject.constructor !== Starblast.Ship) {
      return;
    }
  }
  return root;
})(this);