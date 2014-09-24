#Vuvuzela.js

A plugin that uses Web Audio to create a vuvuzela.

Demo: http://noogn.github.io/Vuvuzela.js

##Usage

###Create a vuvuzela

	var audioContext = new AudioContext();
    
	// Create a vuvuzela, passing the Audio Context through
	var vuvuzela = new Vuvuzela(audioContext);

You can create multiple vuvuzelas within the same audio context :)

###Play the vuvuzela

	vuvuzela.play();

###Make it stop!!

	vuvuzela.stop();

###Toggle it off and on

Conveniently works best for click events but feel free to get creative.

	vuvuzela.toggle();