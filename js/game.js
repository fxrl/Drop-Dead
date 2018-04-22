//global variables
var player, platfroms, ground,background,cursors, ledge,MaxCameraY;

MaxCameraY = 0;
var Game = {
    
    
    preload: function(){
        game.load.image('background', './assets/images/bg.jpg');
        game.load.spritesheet('player', './assets/images/player.png', 32,48);
        game.load.image('ground', './assets/images/ground.png');
    },

    create: function(){
      
       // var minPlatformY = 99999;

        //adding bg 
        background =  game.add.sprite(game.world.centerX,game.world.centerY,'background');
        background.anchor.setTo(0.5);
        background.scale.setTo(3);


        
        //scaling options
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.maxWidth = this.game.width;
        game.scale.maxHeight = this.game.height;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

          //physic enabled
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.generatePlatforms();

        this.createPlayer();
     
         //  Our controls.
         cursors = game.input.keyboard.createCursorKeys();
        },



    update: function(){
         //setBounds(x, y, width, height)
            //Updates the size of this world and sets World.x/y to the given values The Camera bounds and Physics bounds (if set) are also updated to match the new World bounds.
            // the y offset and the height of the world are adjusted
            // to match the highest point the hero has reached
    game.world.setBounds(0 ,-player.changingYPos,game.world.width , game.world.height + player.changingYpos);
        

    game.camera.y = player.y - 440;

    
    if (game.camera.y < MaxCameraY)
    {
        MaxCameraY = game.camera.y;

    }
    
//console.log("current camera " + game.camera.y + " the max position " + MaxCameraY);

    if(Math.abs(player.y - MaxCameraY) > 0){
        game.camera.y = MaxCameraY;
      
    }



    //platform Collision
    var hitPlatform = game.physics.arcade.collide(player, platforms);

     //movement
     if (cursors.left.isDown)
     {
         //  Move to the left
        player.body.velocity.x = -150;
 
     }
     else if (cursors.right.isDown)
     {
         //  Move to the right
         player.body.velocity.x = 150;
     }
     else
     {
         
         player.body.velocity.x = 0;
         
     }
     
      //Allow the player to jump if they are touching the ground.
     if ( player.body.touching.down && hitPlatform)
     {
         player.body.velocity.y = -300;
          player.body.gravity.y = 300;
         
     }
      

         // wrap world coordinated so that you can warp from left to right and right to left
        game.world.wrap( player,0,true,true,false );

    // track the maximum amount that the player has travelled
        player.changingYPos = Math.max( player.changingYPos, Math.abs( player.y - player.startYPos) );

       

    },

    createPlayer: function(){
        player = game.add.sprite(game.world.centerX, game.world.height - 100, 'player');
         //  We need to enable physics on the player
         game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.body.checkCollision.up = false;
        player.body.checkCollision.left = false;
        player.body.checkCollision.right = false;
        player.body.
        player.startYPos = player.y ;
        player.changingYPos = 0;
    },

    generatePlatforms: function(){
        //grouping the platforms
     platforms = game.add.group();

     //  We will enable physics for any object that is created in this group
     platforms.enableBody = true;
     //platforms.createMultiple('10', 'ground');

     var ground = platforms.create(0, game.world.height -32 ,'ground' );
     ground.scale.setTo(3,2);
     ground.body.immovable = true;
     this.createLedge();
     

    
    },
    
    
    createLedge: function(){
        for (var i= 0; i < 9; i++){
            var randomX =game.rnd.integerInRange(0, game.world.width -50);
            var randomY = game.world.height -100 -100 *i; 
            ledge =  platforms.create(randomX,randomY,'ground');
            ledge.scale.setTo(0.3,0.3);
            ledge.body.immovable =true;
           /* if (ledge.y  > MaxCameraY){
                ledge.kill();
                
            }*/
        }
    }


    /* for (var i=0; i < 9; i++){
        var randomX =Math.floor(Math.random()* 300 - 50); 
        var randomY =Math.floor(Math.random()* 500 - 100-100 * i); 
       this.createLedge(randomX, randomY, 50) ;  }
  },

  createLedge: function(x,y,width){
    var platform = platform.getFirstDead();
    platform.reset(x,y);
    platform.scale.x = width;
    platform.scale.y = 10;
    platform.body.immovable =true;
    return platform;*/



};







