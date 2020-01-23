// boot state:
// 1.preload the menu/loading assets
// 2.load custom fonts
// 3.start loadState
var bootState = {

    preload: function()
    {
        
        game.load.image('loading_hint_image_1', 
        'assets/load/loading_hint_image_1.png');
        game.load.image('spinning_dot', 'assets/load/spinning_dot.png');
        game.load.image('level_one' , './assets/load/level_one.png');
        game.load.image('level_two' , './assets/load/level_two.png');
        game.load.image('background' , 'assets/load/background.jpg');
        game.load.image('square' , 'assets/load/square.png');
        game.load.image('upKey' , 'assets/load/up_key.png');
        game.load.image('rightKey' , 'assets/load/right_key.png');
        game.load.image('leftKey' , 'assets/load/left_key.png');
        game.load.image('xKey' , 'assets/load/X.png');
        game.load.audio('bossMusic' , 'assets/load/Come and Get Me.mp3');
        game.load.audio('leveloneMusic' , 'assets/load/Flying with dragons.mp3');
        game.load.audio('leveltwoMusic' , 'assets/load/World+6+Stage+4.mp3');
        game.load.audio('die' ,'assets/load/hurt.mp3' );
        game.load.audio('monsterdie' ,'assets/load/monsterdie.mp3' );
        // force loading fonts
        game.add.text(0, 0, "Hello, world", { 
            font: '1px Eras_Demi',
            fill: '#000000'
        });

        game.add.text(0, 0, "Hello, world", { 
            font: '1px Sim_Sun',
            fill: '#000000'
        });

    },

    create: function()
    {
        game.state.start('menu');

    }

};