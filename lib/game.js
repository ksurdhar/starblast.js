(function (root){
  var Starblast;
  if (typeof(window) === 'undefined'){
    Starblast = global.Starblast = (global.Starblast || {});
  } else {
    Starblast = window.Starblast = (window.Starblast || {});
  }

  var Game = Starblast.Game = function(){
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    this.lastTickTime = null;
  }

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.FPS = 32;
  Game.NUM_ASTEROIDS = 10;
  Game.BLACK = "#000";

  Game.prototype.randomPosition = function() {
    return [

    ];
  };

})();