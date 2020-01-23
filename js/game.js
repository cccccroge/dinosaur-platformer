// Game setting obj
var config = {

    parent: 'testgame',
    width: 1280,
    height: 720,
    renderer: Phaser.CANVAS,
    scaleMode: Phaser.ScaleManager.USER_SCALE,
    fullScreenScaleMode: Phaser.ScaleManager.USER_SCALE,
    antialias: true

};

// Create game instance
var game = new Phaser.Game(config);

// Other global variables
/* nothing here now */

// Add all states, run boot
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('levelMenu', levelMenuState);
game.state.add('menu', menuState);
game.state.add('optionState' ,optionMenuState );
game.state.add('levelOne', levelOneState);
game.state.add('levelTwo', levelTwoState);
game.state.start('boot');