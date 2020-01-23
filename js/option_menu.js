


var optionMenuState = 
{
    create:function()
    {
        game.stage.backgroundColor = "rgb(238,221,130)";
        var operate = game.add.text(game.width/2 , 100 , 'OPERATE' , { font: '70px Eras_Demi', fill: 'rgb(0 , 0 , 0)' });
        operate.anchor.setTo(0.5 , 0.5);
        var how = game.add.text(game.width/2-100 , game.height/2 , 'Jump：\n\nMove：\n\nAttack：' ,{ font: '40px Eras_Demi', fill: 'rgb(0 , 0 , 0)' });
        how.anchor.setTo(0.5 , 0.5);
        game.add.image(game.width/2+10 , game.height/2-135 , 'upKey');
        game.add.image(game.width/2-40 , game.height/2-40 , 'leftKey');
        game.add.image(game.width/2+70 , game.height/2-40 , 'rightKey');
        game.add.image(game.width/2+10 , game.height/2+60 , 'xKey');
    },
    update:function()
    {
        var escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        if(escKey.isDown)
        {
            game.state.start('menu');
        }
    }
}