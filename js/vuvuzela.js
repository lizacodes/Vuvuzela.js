(function(window) {
  'use strict';
  
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  function VuvuzelaPlayer(audioContext) {
    this.audioCtx = audioContext;

    // Flag indicating if the sound is playing
    this.isPlaying = false;

    // Audio nodes
    this.gainNode = this.audioCtx.createGain();

    var oscillator = this.audioCtx.createOscillator();
    var filter = this.audioCtx.createBiquadFilter();
    var gainNode = this.audioCtx.createGain();
    var now = this.audioCtx.currentTime;

    // Configure the oscillator so that it sounds like a vuvuzela
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 230;
    oscillator.start(0);

    filter.type = 'lowpass';
    filter.frequency.value = 440;
    filter.Q.value = 6;

    // Connect the audio nodes to the context destination
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    // Mute the volume to begin with
    gainNode.gain.setValueAtTime(0, now);
  }

  Vuvuzela.prototype.play = function() {
    var now = this.audioCtx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.linearRampToValueAtTime(1, now + 0.5);
    this.isPlaying = true;
  };

  Vuvuzela.prototype.stop = function() {
    var now = this.audioCtx.currentTime;
    this.gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
    this.isPlaying = false;
  };

  // Convience method utilising play and stop
  Vuvuzela.prototype.toggle = function() {
    var now = this.audioCtx.currentTime;

    if(this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  };

  window.Vuvuzela = Vuvuzela;
})(window);