(function (root){
  var Starblast;
  if (typeof(window) === 'undefined'){
    Starblast = global.Starblast = (global.Starblast || {});
  } else {
    Starblast = window.Starblast = (window.Starblast || {});
  }

  var MovingObject = Starblast.MovingObject = function (options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
  };

  MovingObject.prototype.move = function(numTicks) {
    this.pos = [
      this.pos[0] + numTicks * this.vel[0],
      this.pos[1] + numTicks * this.vel[1]
    ];
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function(otherObj) {
    var centerDist = Starblast.Util.dist(this.pos, otherObj.pos)
    return centerDist < (this.radius + otherObj.radius)
  };



})(this);