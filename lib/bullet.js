(function (root){
  var Starblast = root.Starblast = (root.Starblast || {});

  var Bullet = Starblast.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    options.color = options.color;

    Starblast.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 2;
  Bullet.SPEED = 15;

  Starblast.Util.inherits(Bullet, Starblast.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject.constructor !== Starblast.Asteroid) {
      return;
    }

    this.remove();
    otherObject.remove();
  };

  Bullet.prototype.isWrappable = false;
})(this);
