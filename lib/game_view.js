(function (root){
  var Starblast = root.Starblast = (root.Starblast || {});

  var GameView = Starblast.GameView = function(game, canvas){
    this.canvas = canvas.getContext("2d");
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.prototype.start = function() {
    var gameView = this;
    this.timerId = setInterval(
      function() {
        gameView.game.step();
        gameView.game.draw(gameView.canvas);
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
    var game = this.game;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    key("k", function () { game.freeze(); });
    key("l", function () { game.unfreeze(); });

    key("space", function () { ship.fireBullet() });
  };

  return root;
})(this);