
var game = new Phaser.Game(320, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var cursors;
var player;
var cursor;

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

  var map = game.add.tilemap('map', 32, 32);
  map.addTilesetImage('tiles');

  var layer = map.createLayer(0);
  layer.resizeWorld(); //TODO - what is this

  chairs = game.add.group();

  var chair = chairs.create(0,0, 'dude_tiles', 1);

  var desk = game.add.sprite(32, 64, 'dude_tiles', 2);

  player = game.add.sprite(64, 96, 'aaron', 7);

  game.physics.arcade.enable(player);
  player.body.gravity.y = 0;

  player.animations.add('left', [9, 10, 11], 10, true);
  player.animations.add('right', [3,4,5], 10, true);
  player.animations.add('up', [0,1,2], 10, true);
  player.animations.add('down', [6,7,8], 10, true);

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {

  

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