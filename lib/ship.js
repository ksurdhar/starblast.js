(function (root){
  var Starblast = root.Starblast = (root.Starblast || {});

  var Ship = Starblast.Ship = function (options) {
    options.color = Ship.COLOR;
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];

    Starblast.MovingObject.call(this, options);
  };

  Ship.COLOR = "#f1c40f";
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

  return root;
})(this);