(function (root){
  var Starblast = root.Starblast = (root.Starblast || {});

  var Star = Starblast.Star = function(options){
    options.color = Star.COLOR;
    options.radius = Star.RADIUS;
    this.powerup = false;


    Starblast.MovingObject.call(this, options);
  };

  Star.COLOR = "#3498db"; 
  // Star.COLOR = "#e74c3c";
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

  Star.prototype.draw = function(ctx) {
    if (this.powerup === true){
      this.color = "#f1c40f"
    }

    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );

    ctx.shadowColor = '#999';
    ctx.shadowBlur = 20;
    
    ctx.fill();
  };

  Star.prototype.empower = function(){
    this.powerup = true;
    var star = this;
    setTimeout(function(){ 
      star.powerup = false;
      star.color = "#3498db"
    }, 5000);
  }

  return root;
})(this);