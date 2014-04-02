(function (root){
  var Starblast = root.Starblast = (root.Starblast || {});

  var Ship = Starblast.Ship = function (options) {
    options.color = Ship.COLOR;
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];

    Starblast.MovingObject.call(this, options);
  };

  Ship.COLOR = "#f1c40f";
  // Ship.COLOR = "#1abc9c";
  Ship.RADIUS = 15;

  Starblast.Util.inherits(Ship, Starblast.MovingObject);

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.fireBullet = function () {
    var norm = Starblast.Util.norm(this.vel);

    if (norm == 0) {
      // can't fire moving still
      return;
    } else {
      var relVel = Starblast.Util.scale(
        Starblast.Util.dir(this.vel),
        Starblast.Bullet.SPEED
      );

      var bulletVel = [
        relVel[0] + this.vel[0], relVel[1] + this.vel[1]
      ];

      var bullet = new Starblast.Bullet({
        pos: this.pos,
        vel: bulletVel,
        color: this.color,
        game: this.game
      });
      this.game.add(bullet);
    }
  };

  return root;
})(this);