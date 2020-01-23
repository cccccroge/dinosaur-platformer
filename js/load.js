// load state:
// 1.load all assets for provided level
// 2.show hint and loading progress
var loadState = {

    // Level num 
    level: 0, 
    
    // Assets directory
    dir: '',        

    // Hints text array
    hint: ['連擊傷害更高，經驗值也越多。'],



    init: function(level)
    {
        if (level === 1) {

            this.level = 1;
            this.dir = 'assets/levelOne/';
        
        } else if (level === 2) {

            this.level = 2;
            this.dir = 'assets/levelTwo/';

        } else {

            console.log('unknown level number: ' + level);
        }

    },

    preload: function()
    {
        // set background color
        game.stage.setBackgroundColor('#131313');

        // set hint image
        var img = game.add.image(game.width / 2, 260, 'loading_hint_image_1');
        img.anchor.set(0.5);

        // set hint text
        var hint = game.add.text(game.width / 2, 364, '{Hint}', 
        { font: '30px Eras_Demi', fill: '#bdbdbd' });
        hint.anchor.set(0.5);
        hint.x = Math.floor(hint.x) + 0.5;
        hint.y = Math.floor(hint.y) + 0.5;

        var txt = game.add.text(game.width / 2, 400, this.hint[0], 
        { font: '18px Sim_Sun', fill: '#bdbdbd', fontWeight: 'bold'});
        txt.anchor.set(0.5);
        txt.x = Math.floor(txt.x) + 0.5;
        txt.y = Math.floor(txt.y) + 0.5;

        // set progress text
        this.progress = game.add.text(game.width / 2, game.height - 100, 
            'loading...0%', { font: '18px Eras_Demi', fill: '#bdbdbd' });
        this.progress.anchor.set(0.5);
        this.progress.x = Math.floor(this.progress.x) + 0.5;
        this.progress.y = Math.floor(this.progress.y) + 0.5;

        // listen to file loaded event
        game.load.onFileComplete.add(this.updateProgress, this);
        game.load.onLoadComplete.add(this.completeLoading, this);

        // set spinning dots
        this.dots = game.add.image(game.width / 2, game.height - 60, 
            'spinning_dot');
        this.dots.anchor.set(0.5);  

        // load character
        game.load.spritesheet('Romeo', 
            'assets/character/romeo.png', 800, 1000);

        // load character UI
        game.load.image('sta_bg', 'assets/UI/sta_bg.png');
        game.load.image('sta_bar', 'assets/UI/sta_bar.png');
        game.load.image('bar_bg', 'assets/UI/bar_bg.png');
        game.load.image('health_slice', 'assets/UI/health_slice.png');
        game.load.image('Romeo_icon', 'assets/UI/Romeo_icon.png');

        // load monster
        game.load.spritesheet('batman', 
            'assets/monster/batman.png', 200, 500/3);
        game.load.spritesheet('bomber', 
            'assets/monster/bomber.png', 2500/15, 500/3);
        game.load.spritesheet('exploEffect', 
            'assets/monster/explode.png', 192, 192);

        // load rocks
        game.load.image('cracked_rock', 'assets/monster/cracked_rock.png', 46, 45);
        game.load.image('boss_rock', 'assets/monster/boss_rock.png', 76, 75)

        // load all assets for given level
        var dir = this.dir;
        //if (this.level === 1) {

            game.load.image('level_1_bg', dir + 'level1bg.png');
            game.load.image('ship_enter', dir + 'ship_enter.png');
            game.load.tilemap('level_1', dir + 'level_1.json', null, 
                Phaser.Tilemap.TILED_JSON);
            game.load.image('forest_tileset', dir + 'forest_tileset.png');

        //} else if (this.level === 2) {

            dir = 'assets/levelTwo/';
            game.load.image('level_2_bg', dir + 'level2bg.png');
            game.load.tilemap('level_2', dir + 'level_2.json', null, 
                Phaser.Tilemap.TILED_JSON);
            game.load.image('spacecraft_tileset', dir + 'spacecraft_tileset.png');
            game.load.spritesheet('boss', 'assets/monster/boss.png', 750, 600);
        //}
        
    },


    create:function()
    {
        if (this.level === 1) {

            game.state.start('levelOne');

        } else if (this.level === 2) {

            game.state.start('levelTwo');

        } else {

            console.log('specified an invalid level number');
        }
        
    },
    /*update: function()
    {
        if (this.dots) {

            this.dots.angle += 2;

        }

        if (this.enterKey.isDown) {

            first = 1;
            firstin = 1;
            game.state.start('levelTwo', 2);

        }
        
    },*/

    updateProgress: function(progress, fileKey, success, loadedFiles, files)
    {

        this.progress.setText('loading...' + progress + '%');

    },

    completeLoading: function()
    {
        // show continue
        var continueText = game.add.text(this.dots.x, this.dots.y,
             'press Enter to continue.', 
             { font: '18px Eras_Demi', fill: '#bdbdbd' });
        continueText.anchor.set(0.5);
        continueText.x = Math.floor(continueText.x) + 0.5;
        continueText.y = Math.floor(continueText.y) + 0.5;
        this.dots.destroy();

        // continue blink
        var tween = game.add.tween(continueText);
        tween.to({alpha: 0}, 500, null, true, 500, -1, true);

        // add key input
        this.enterKey = game.input.keyboard.addKey(Phaser.KeyCode.ENTER);

    }

};