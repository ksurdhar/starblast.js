(function (root){
  var Starblast = root.Starblast = (root.Starblast || {});

  var MovingObject = Starblast.MovingObject = function (options){
    this._id = options._id || Math.random();
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    ; // default do nothing
  };

  MovingObject.prototype.isWrappable = true;

  function wrap (coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  };

  MovingObject.prototype.wrap = function () {
    this.pos[0] = wrap(this.pos[0], this.game.dim_x);
    this.pos[1] = wrap(this.pos[1], this.game.dim_y);
  };

  MovingObject.prototype.move = function(numTicks) {
    this.pos = [
      this.pos[0] + numTicks * this.vel[0],
      this.pos[1] + numTicks * this.vel[1]
    ];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.wrap();
      } else {
        this.remove();
      }
    }
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.shadowColor = '#999';
    ctx.shadowBlur = 20;
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function(otherObj) {
    var centerDist = Starblast.Util.dist(this.pos, otherObj.pos)
    return centerDist < (this.radius + otherObj.radius)
  };

  return root;
})(this);