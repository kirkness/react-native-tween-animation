var tweenFunctions = require('tween-functions');

class RNTAnimation {

  constructor(config){
    this.frameLoop = this.frameLoop.bind(this);
    this.terminate = this.terminate.bind(this);
    this._config = config;
    this.start();
  }

  start() {
    this.startTime = Date.now();
    this.frameLoop();
  }

  reverse(callback) {
    var start = this._config.start;
    this._config.start = this._config.end;
    this._config.end = start;
    this._config.done = callback;
    this.start();
  }

  frameLoop() {
    if(this._break) return;

    var tweenVals = {};
    var elapsed = (Date.now() - this.startTime);
    var {
      duration,
      start,
      end,
      tween
    } = this._config;

    if(elapsed >= duration){
      this._config.frame(end);
      if(typeof this._config.done === 'function') {
        this._config.done();
      }
      return;
    }

    for (var prop in start) {
      tweenVals[prop] = tweenFunctions[tween](
        elapsed, start[prop], end[prop], duration
      );
    }

    this._config.frame(tweenVals);
    window.requestAnimationFrame(this.frameLoop);
  }

  terminate(){
    this._break = true;
  }
}

module.exports = RNTAnimation;
