
var level = 1;
var square
var levelMenuState = 
{
    create:function()
    {
        game.stage.backgroundColor = "rgb(238,221,130)";
        var chooseGame = game.add.text(game.width/2 , 100 , 'CHOOSE LEVEL' , { font: '70px Eras_Demi', fill: 'rgb(0 , 0 , 0)' });
        chooseGame.anchor.setTo(0.5 , 0.5);
        var levelOneImg = game.add.image(game.width/2-200 , game.height/2  , 'level_one');
        levelOneImg.anchor.setTo(0.5 , 0.5);
        var levelTwoImg = game.add.image(game.width/2+200 , game.height/2  , 'level_two');
        levelTwoImg.anchor.setTo(0.5 , 0.5);
        square = game.add.sprite( game.width/2-200, game.height/2 , 'square');
        square.anchor.setTo(0.5 , 0.5);
    },
    update:function()
    {
        var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        if(rightKey.isDown)
        {
            square.x = game.width/2+200;
            rightKey.isDown = false;
            level = 2;
        }
        else if(leftKey.isDown)
        {
            square.x = game.width/2-200;
            leftKey.isDown = false;
            level = 1;
        }
            
        if(enterKey.isDown)
        {
            first = 1;
            firstin = 1;
            game.state.start('load', true, false, level);
        }
    },
};