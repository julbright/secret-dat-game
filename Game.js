
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    this.height = 1080;
    this.width = 1920;


    this.cursors;
    this.player;
    this.cursor;

    this.counter = 60;
    this.text = 0;

    this.timer;
    
    this.menu;
    
    
};

BasicGame.Game.prototype = {


quitGame: function (pointer) {

    //  Here you should destroy anything you no longer need.
    //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

    //  Then let's go back to the main menu.
    this.state.start('MainMenu');

},


updateCounter: function () {

    this.counter--;

    text.setText('Counter: ' + this.counter);

},


render: function() {

    this.game.debug.text("Time until event: " + this.game.time.events.duration.toFixed(0), 32, 32);
    this.game.debug.text("Next tick: " + this.game.time.events.next.toFixed(0), 32, 64);

},

preload: function () {

  //game.load.image('sky', 'assets/sky.png');
   // game.load.image('ground', 'assets/platform.png');
    //game.load.image('star', 'assets/star.png');
    //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);


    this.game.load.tilemap('map', 'data/background_layer.csv', null, Phaser.Tilemap.CSV);
    this.game.load.image('tiles', "images/tiles.png");
    this.game.load.spritesheet('dude_tiles', 'images/tiles.png', 32, 32);
    this.game.load.spritesheet('aaron', 'images/townfolk1_m.png', 32, 36, 12);
},

//spritesheet(key, url, frameWidth, frameHeight, frameMax, margin, spacing) → {Phaser.Loader}

 createMenu: function() {
        // When the pause button is pressed, we pause the game
        this.game.paused = true;

        // Then add the menu
        var menu = this.add.sprite(this.width/2, this.height/2, 'tiles');
        menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (game is not necessary)
        this.choiceLabel = this.add.text(this.width/2, this.height-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        this.choiceLabel.anchor.setTo(0.5, 0.5);
    },

   

// And finally the method that handles the pause menu
 unpause: function(event){
    // Only act if paused
    if(this.game.paused){
        // Calculate the corners of the menu
        var x1 = this.width/2 - 270/2, x2 = this.width/2 + 270/2,
            y1 = this.height/2 - 180/2, y2 = this.height/2 + 180/2;

        // Check if the click was inside the menu
        if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
            // The choicemap is an array that will help us see which item was clicked
            var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

            // Get menu local coordinates for the click
            var x = event.x - x1,
                y = event.y - y1;

            // Calculate the choice 
            var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

            // Display the choice
            this.choiceLabel.text = 'You chose menu item: ' + choisemap[choise];
        }
        else{
            // Remove the menu and the label
            this.menu.destroy();
            this.choiceLabel.destroy();

            // Unpause the game
            this.game.paused = false;
        }
    }
},

create: function () {

  this.physics.startSystem(Phaser.Physics.ARCADE);

  //create the sprites and tiles

  var map = this.add.tilemap('map', 32, 32);
  map.addTilesetImage('tiles');

  var layer = map.createLayer(0);
  layer.resizeWorld(); //TODO - what is game

  var chairs = this.add.group();
  chairs.enableBody = true;
  chairs.physicsBodyType = Phaser.Physics.ARCADE;

  var chair = chairs.create(32,64, 'dude_tiles', 2);
  chair.body.immovable = true;
  chair.lifespan = 10000;
  chair.time_taught = this.counter; //TODO: Time taught shouldn't start at 60?

    /*
        Code for the pause menu
    */

    // Create a label to use as a button
    var pause_label = this.add.text(this.width-100, 20, 'Pause', { font: '24px Arial', fill: '#000' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(this.createMenu, self);

     // Add a input listener that can help us return from being paused
    this.game.input.onDown.add(this.unpause, self);

  text = this.add.text(this.world.centerX, 500, 'Counter: 60', { font: "24px Arial", fill: "#ffffff", align: "center" });
  text.anchor.setTo(0.5, 0.5);

  //create the timer
  timer = this.time.create(autodestroy=false);
  timer.loop(Phaser.Timer.SECOND, this.updateCounter, this.game);
  timer.add(2000, this.endRound, this.game, this.createMenu)
  timer.start()

  //createthis.player
  this.player = this.add.sprite(64, 96, 'aaron', 7);

  this.physics.arcade.enable(this.player);
  this.player.body.gravity.y = 0;
  this.player.body.collideWorldBounds = true;

  this.player.health = 10000;

  this.player.animations.add('left', [9, 10, 11], 10, true);
  this.player.animations.add('right', [3,4,5], 10, true);
  this.player.animations.add('up', [0,1,2], 10, true);
  this.player.animations.add('down', [6,7,8], 10, true);

  

  this.cursors = this.game.input.keyboard.createCursorKeys();

  chair.events.onKilled.add(function(chair){
    console.log(this);
    console.log(this.health);
    this.damage(10);
    console.log(this.health);
  },this.player);
},

endRound: function(createMenu){
  console.log("suppppp");
  createMenu();
},

// function mourn(player){
//     console.log(player);
//     console.log(player.health);
//    this.player.damage(10);
//     console.log(player.health);
//   };

update: function() {

  function collideCallback(player, chair){
    // lose points
    if (check_for_teach(player, chair)){
        chair.lifespan = chair.lifespan + 100;
        chair.time_taught = this.counter;
      }
  }

  function check_for_teach(player, chair){
    // check to see if student was recently instructed
    // if the student was taught at counter 50
    // and 10 seconds have passed and the counter is now 40
    // 50 > 45 is true, return true
    // if the student was taught at counter 50
    // and 2 seconds have passed and the counter is now 48
    // 50 > 53 is false, return false

    if (chair.time_taught > this.counter + 5){
      return true
    }
    else {
      return false
    }
  };
 //collision masks

  this.physics.arcade.collide(this.player, chairs, collideCallback);
  
 // movement controls
  if (cursors.left.isDown)
    {
        //  Move to the left
       this.player.body.velocity.x = -150;

       this.player.animations.play('left');

        this.cursor = "left";
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
       this.player.body.velocity.x = 150;

       this.player.animations.play('right');

        this.cursor = "right";
    }
    else if (cursors.down.isDown)
    {
        //  Move to the right
       this.player.body.velocity.y = 150;

       this.player.animations.play('down');

        this.cursor = "down";
    }
    else if (cursors.up.isDown)
    {
        //  Move to the right
       this.player.body.velocity.y = -150;

       this.player.animations.play('up');

        this.cursor = "up";
    }
    else
    {
        //  Stand still
       this.player.animations.stop();

       this.player.body.velocity.x = 0;
       this.player.body.velocity.y = 0;
        
        if (this.cursor == "up"){
         this.player.frame = 1;
        }
        else if (this.cursor == "left"){
         this.player.frame = 10;
        }
        else if (this.cursor == "right"){
         this.player.frame = 4;
        }
        else {
         this.player.frame = 7;
        } 
    }
}

};