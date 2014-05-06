(function (root){
  var Starblast = root.Starblast = (root.Starblast || {});

  var Asteroid = Starblast.Asteroid = function(options){
    options.color = Asteroid.GRAY;
    options.radius = Asteroid.RADIUS;
    this.cooldown = false;

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
    if (otherObject.constructor === Starblast.Ship && this.cooldown === false) {
      this.cooldown = true;
      var that = this;
      setTimeout(function(){ that.cooldown = false; }, 1000);
      var stroidVel = this.vel;
      var shipVel = otherObject.vel;

      this.vel = [(-stroidVel[0]*.5 + shipVel[0]*.5)*.7, (-stroidVel[1] + shipVel[1]*.5)*.7];
      otherObject.vel = [(-shipVel[0]*.5 + stroidVel[0]*.5)*.7, (-shipVel[1] + stroidVel[1]*.5)*.7];

    }
    
    
  }
  return root;
})(this);