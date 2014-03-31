(function (root){
  var Starblast;
  if (typeof(window) === 'undefined'){
    Starblast = global.Starblast = (global.Starblast || {});
  } else {
    Starblast = window.Starblast = (window.Starblast || {});
  }

  var GameView = Starblast.GameView = function(game, ctx){
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.prototype.start = function() {
    var gameView = this;
    this.timerId = setInterval(
      function() {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
    }, 1000 / Starblast.Game.FPS)

    this.bindKeyHandlers();
  };

  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    key("space", function () { ship.fireBullet() });
  };


})(this);