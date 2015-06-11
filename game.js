
var height = 1080;
var width = 1920;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });

if(game.device.desktop){
    console.log('desktop!');
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setMinMax(480, 260, 1024, 768);
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically   = true;
    
}
else{
    
    console.log(game.device);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setMinMax(480, 260, 1920, 1080);
}

var cursors;
var player;
var cursor;

var counter = 60;
var text = 0;

var timer;

function updateCounter() {

    counter--;

    text.setText('Counter: ' + counter);

}


function render() {

    game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
    game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

}

function preload() {

  //game.load.image('sky', 'assets/sky.png');
   // game.load.image('ground', 'assets/platform.png');
    //game.load.image('star', 'assets/star.png');
    //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);


    game.load.tilemap('map', 'data/background_layer.csv', null, Phaser.Tilemap.CSV);
    game.load.image('tiles', "images/tiles.png");
    game.load.spritesheet('dude_tiles', 'images/tiles.png', 32, 32);
    game.load.spritesheet('aaron', 'images/townfolk1_m.png', 32, 36, 12)
}

//spritesheet(key, url, frameWidth, frameHeight, frameMax, margin, spacing) → {Phaser.Loader}

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  //create the sprites and tiles

  var map = game.add.tilemap('map', 32, 32);
  map.addTilesetImage('tiles');

  var layer = map.createLayer(0);
  layer.resizeWorld(); //TODO - what is game

  chairs = game.add.group();
  chairs.enableBody = true;
  chairs.physicsBodyType = Phaser.Physics.ARCADE;

  var chair = chairs.create(32,64, 'dude_tiles', 2);
  chair.body.immovable = true;
  chair.lifespan = 10000;
  chair.time_taught = counter //TODO: Time taught shouldn't start at 60?

    /*
        Code for the pause menu
    */

    // Create a label to use as a button
    pause_label = game.add.text(width-100, 20, 'Pause', { font: '24px Arial', fill: '#000' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(createMenu, self);

    function createMenu() {
        // When the pause button is pressed, we pause the game
        game.paused = true;

        // Then add the menu
        menu = game.add.sprite(width/2, height/2, 'tiles');
        menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (game is not necessary)
        choiceLabel = game.add.text(width/2, height-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        choiceLabel.anchor.setTo(0.5, 0.5);
    }

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unpause, self);

    // And finally the method that handles the pause menu
    function unpause(event){
        // Only act if paused
        if(game.paused){
            // Calculate the corners of the menu
            var x1 = width/2 - 270/2, x2 = width/2 + 270/2,
                y1 = height/2 - 180/2, y2 = height/2 + 180/2;

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
                choiceLabel.text = 'You chose menu item: ' + choisemap[choise];
            }
            else{
                // Remove the menu and the label
                menu.destroy();
                choiceLabel.destroy();

                // Unpause the game
                game.paused = false;
            }
        }
    };

  text = game.add.text(game.world.centerX, 500, 'Counter: 60', { font: "24px Arial", fill: "#ffffff", align: "center" });
  text.anchor.setTo(0.5, 0.5);

  //create the timer
  timer = game.time.create(autodestroy=false);
  timer.loop(Phaser.Timer.SECOND, updateCounter, game);
  timer.add(2000, endRound, game, createMenu)
  timer.start()

  //create player
  player = game.add.sprite(64, 96, 'aaron', 7);

  game.physics.arcade.enable(player);
  player.body.gravity.y = 0;
  player.body.collideWorldBounds = true;

  player.health = 10000;

  player.animations.add('left', [9, 10, 11], 10, true);
  player.animations.add('right', [3,4,5], 10, true);
  player.animations.add('up', [0,1,2], 10, true);
  player.animations.add('down', [6,7,8], 10, true);

  

  cursors = game.input.keyboard.createCursorKeys();

  chair.events.onKilled.add(function(chair){
    console.log(game);
    console.log(game.health);
    game.damage(10);
    console.log(game.health);
  },player);
}
function endRound(createMenu){
  console.log("suppppp");
  createMenu();
};

// function mourn(player){
//     console.log(player);
//     console.log(player.health);
//     player.damage(10);
//     console.log(player.health);
//   };

function update() {

  function collideCallback(player, chair){
    // lose points
    if (check_for_teach(player, chair)){
        chair.lifespan = chair.lifespan + 100;
        chair.time_taught = counter;
      }
  };

  function check_for_teach(player, chair){
    // check to see if student was recently instructed
    // if the student was taught at counter 50
    // and 10 seconds have passed and the counter is now 40
    // 50 > 45 is true, return true
    // if the student was taught at counter 50
    // and 2 seconds have passed and the counter is now 48
    // 50 > 53 is false, return false

    if (chair.time_taught > counter + 5){
      return true
    }
    else {
      return false
    }
  };
 //collision masks

  game.physics.arcade.collide(player, chairs, collideCallback);
  
 // movement controls
  if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');

        cursor = "left";
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');

        cursor = "right";
    }
    else if (cursors.down.isDown)
    {
        //  Move to the right
        player.body.velocity.y = 150;

        player.animations.play('down');

        cursor = "down";
    }
    else if (cursors.up.isDown)
    {
        //  Move to the right
        player.body.velocity.y = -150;

        player.animations.play('up');

        cursor = "up";
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        
        if (cursor == "up"){
          player.frame = 1;
        }
        else if (cursor == "left"){
          player.frame = 10;
        }
        else if (cursor == "right"){
          player.frame = 4;
        }
        else {
          player.frame = 7;
        } 
    }
}