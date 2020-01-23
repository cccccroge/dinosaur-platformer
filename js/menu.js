
var choice = "start";
var startLabel;
var levelLabel;
var operateLabel;
var menuState =
{
    create:function()
    {
        //add background
        //game.add.image(0 , 0  , 'background');
        game.stage.backgroundColor = "rgb(0,0,0)";
        var gameName = game.add.text(game.width/2 , 200 , 'SUPER JURRASIC' , { font: '40px Eras_Demi', fill: '#bdbdbd' });
        gameName.anchor.setTo(0.5 , 0.5);
        //create some option
        startLabel = game.add.text(game.width/2 , 400 , 'start' , { font: '40px Eras_Demi', fill: '#bdbdbd' });
        startLabel.anchor.setTo(0.5 , 0.5);
        levelLabel = game.add.text(game.width/2 , 450 , 'level' , { font: '25px Eras_Demi', fill: '#bdbdbd' });
        levelLabel.anchor.setTo(0.5 , 0.5);
        operateLabel = game.add.text(game.width/2 , 500 , 'operate' , { font: '25px Eras_Demi', fill: '#bdbdbd' });
        operateLabel.anchor.setTo(0.5 , 0.5);
        
    },
    update:function()
    {
        this.choose();
    },

    
    
    
    
    
    
    
    //choose one option
    choose:function()
    {
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        switch(choice)
        {
            
            case "start":
                if(upKey.isDown)
                {
                    startLabel.fontSize = 25;
                    levelLabel.fontSize = 25;
                    operateLabel.fontSize = 40;
                    choice = "operate";
                    upKey.isDown = false;
                }    
                else if(downKey.isDown)
                {
                    startLabel.fontSize = 25;
                    levelLabel.fontSize = 40;
                    operateLabel.fontSize = 25;
                    choice = "level";
                    downKey.isDown= false;
                }
                break;
            case "level":
                if(upKey.isDown)
                {
                    startLabel.fontSize = 40;
                    levelLabel.fontSize = 25;
                    operateLabel.fontSize = 25;
                    choice = "start";
                    upKey.isDown = false;
                }    
                else if(downKey.isDown)
                {
                    startLabel.fontSize = 25;
                    levelLabel.fontSize = 25;
                    operateLabel.fontSize = 40;
                    choice = "operate";
                    downKey.isDown= false;
                }
                break;
            case "operate":
                if(upKey.isDown)
                {
                    startLabel.fontSize = 25;
                    levelLabel.fontSize = 40;
                    operateLabel.fontSize = 25;
                    choice = "level";
                    upKey.isDown = false;
                }
                else if(downKey.isDown)
                {
                    startLabel.fontSize = 40;
                    levelLabel.fontSize = 25;
                    operateLabel.fontSize = 25;
                    choice = "start";
                    downKey.isDown= false;
                }
        }
        if(enterKey.isDown)
        {
            first = 1;
            firstin = 1;
            nextState = 1;
            bulletTime = 0;
            save = 0;
            if(choice == "start")
            game.state.start('load', true, false, 1);    // 1 specify which level
            else if(choice == "level")
            game.state.start('levelMenu');
            else
            game.state.start('optionState');
        }
    },
};