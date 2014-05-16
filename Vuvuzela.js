(function(window) {
  'use strict';

  function VuvuzelaPlayer(audioContext) {
    this.audioCtx = audioContext;
    this.isPlaying = false;

    var oscillator = this.audioCtx.createOscillator();
    var filter = this.audioCtx.createBiquadFilter();
    var gainNode = this.audioCtx.createGainNode();
    var now = this.audioCtx.currentTime;

    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 230;
    oscillator.start(0);

    filter.type = 'lowpass';
    filter.frequency.value = 440;
    filter.Q.value = 6;

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    gainNode.gain.setValueAtTime(0, now);

    this.gainNode = gainNode;
  }

  VuvuzelaPlayer.prototype.play = function() {
    var now = this.audioCtx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.linearRampToValueAtTime(1, now + 0.5);
  };

  VuvuzelaPlayer.prototype.stop = function() {
    var now = this.audioCtx.currentTime;
    this.gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
  };

  VuvuzelaPlayer.prototype.playToggle = function() {
    var now = this.audioCtx.currentTime;

    if(this.isPlaying) {
      this.isPlaying = false;
      this.gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
    } else {
      this.isPlaying = true;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.linearRampToValueAtTime(1, now + 0.5);
    }
  };

  function vuvuzela(elements, audioContext) {
    for(var i = 0; i < elements.length; i++) {
      attachVuvuzela(elements[i], audioContext);
    }
  }

  function attachVuvuzela(element, audioContext) {
    var player = new VuvuzelaPlayer(audioContext);

    element.addEventListener('click', function() {
      player.playToggle();
    });
  }

  window.vuvuzela = vuvuzela;
})(window);