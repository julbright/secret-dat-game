
BasicGame.Preloader = function () {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		//this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
	    this.load.tilemap('map', 'data/background_layer.csv', null, Phaser.Tilemap.CSV);
	    this.load.image('tiles', "images/tiles.png");
	    this.load.spritesheet('dude_tiles', 'images/tiles.png', 32, 32);
	    this.load.spritesheet('aaron', 'images/townfolk1_m.png', 32, 36, 12)


	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		//this.preloadBar.cropEnabled = false;

		this.state.start('MainMenu');

	}

};
