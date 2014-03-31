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
  };


})(this);