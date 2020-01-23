

var obj;
var first = 1;
var firstin = 1;
var nextState = 1;
var bulletTime = 0;
var save = 0;
var firstEnterBoss = 1;
var bossMusic;
var music;
var dieVoice;
var monsterdieVoice;
var levelTwoState = {

    create: function()
    {
        //add music
        dieVoice = game.add.audio('die');
        bossMusic = game.add.audio('bossMusic');
        music = game.add.audio('leveltwoMusic');
        monsterdieVoice = game.add.audio('monsterdie');
        music.play();
        obj = this;
        // create tilemap and world
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 2000;

        var bg = game.add.image(0, 0, 'level_2_bg');
        bg.fixedToCamera = true;
        this.map = game.add.tilemap('level_2');
        this.map.addTilesetImage('spacecraft_tileset','spacecraft_tileset');
        var layer = this.map.createLayer('layer_1');
        layer.resizeWorld();
        game.physics.p2.convertCollisionObjects(this.map, 'collision_layer');

        

        // add character
        if(save === 1) {this.player = game.add.sprite(271*72, 15*72, 'Romeo');}
        else            this.player = game.add.sprite(2*72, 23*72, 'Romeo');
        this.player.scale.setTo(0.25);

        this.player.animations.add('idle',
            Phaser.ArrayUtils.numberArray(0, 59), 30, true);
        this.player.animations.add('run',
            Phaser.ArrayUtils.numberArray(60, 89), 60, true);
        this.player.animations.add('jump_off',
            Phaser.ArrayUtils.numberArray(90, 95), 60, false);
        this.player.animations.add('fall',
            Phaser.ArrayUtils.numberArray(105, 110), 15, true);
        this.player.animations.add('jump_down',
            Phaser.ArrayUtils.numberArray(120, 134), 90, false);
        this.player.animations.add('jump_down_hard',
            Phaser.ArrayUtils.numberArray(135, 149), 90, false);

        game.physics.p2.enable(this.player, false);
        this.player.body.onBeginContact.add(this.hitplayer,this);
        this.player.body.damping = 0.8;
        this.player.body.mass = 100;
        this.player.body.fixedRotation = true;
        this.player.body.clearShapes();     // clear default rectangle shape
        this.player.body.addCapsule(55, 55, 0, 0,
            Phaser.Math.degToRad(90));
        this.player.body.collideWorldBounds = true;

        this.playerSpeed = 400;
        this.playerJumpSpeed = 1350;
        this.playerDownStregth = 1250;
        this.playerNeedDownHard = false;
        this.isPlayerBoost = false;
        this.playerHealthMAX = 900; // correspond to UI's 9 slices
        this.playerHealth = this.playerHealthMAX;
        this.playerStaminaMax = 100.0;
        this.playerStamina =  this.playerStaminaMax;

        this.PLAYERSTATE = {
            IDLE: 1,
            RUNNING: 2,
            JUMPING_OFF: 3,
            FALLING: 4,
            JUMPING_DOWN: 5,
            JUMPING_DOWN_HARD: 6
        };
        this.playerState = this.PLAYERSTATE.IDLE;

        // add character UI
        var staBg = game.add.image(120, 120, 'sta_bg');
        staBg.fixedToCamera = true;
        this.staBar = game.add.image(staBg.x, staBg.y+3, 'sta_bar');
        this.staBar.fixedToCamera = true;
        var barBg = game.add.image(staBg.x, staBg.y - 30, 'bar_bg');
        barBg.fixedToCamera = true;

        this.healthSlice = [];
        for (var i = 0; i < 9; i++) {

            this.healthSlice[i] = game.add.image(staBg.x + 15 + i * 17, 
                staBg.y - 23, 'health_slice');
            this.healthSlice[i].fixedToCamera = true;

        }
        
        var RomeoIcon = game.add.image(staBg.x - 50, staBg.y - 60, 'Romeo_icon');
        RomeoIcon.fixedToCamera = true; 

        var fontObj1 = {
            font: "24px Eras_Demi",
            fill: "#FFFFFF",
            stroke: "#000000",
            strokeThickness: 5,
            align: "center"
        };

        var textRomeo = game.add.text(staBg.x + 20, staBg.y - 55, 'Romeo', fontObj1);
        textRomeo.fixedToCamera = true;

        // record key input
        this.keyRecord = {
            'LEFT': false,
            'RIGHT': false,
            'UP': false,
            'DOWN': false,
            'X': false
        }

        // set camera
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        // the longest description artificial intelligence in levelone he min shu bu yao lian

        this.enemyCollisionGroup = game.physics.p2.createCollisionGroup();

        this.enemyGroup = game.add.group();
        this.enemyGroup.physicsBodyType = Phaser.Physics.P2JS;
        this.enemyGroup.enableBody = true;
        this.enemiesDeploy();

        this.boss = game.add.sprite(284*72, 18*72, 'boss');
        this.boss.scale.setTo(1.0);
        this.boss.anchor.setTo(0.5,0.5);

        this.boss.animations.add('idle',
            Phaser.ArrayUtils.numberArray(0, 14), 30, true);
        this.boss.animations.add('puz',
            Phaser.ArrayUtils.numberArray(15, 29), 30, false);
        this.boss.animations.add('puz_r',
            Phaser.ArrayUtils.numberArrayStep(29, 15, -1), 30, false);
        this.boss.animations.add('roll',
            Phaser.ArrayUtils.numberArray(30, 44), 30, true);
        this.boss.animations.add('roll_r',
            Phaser.ArrayUtils.numberArrayStep(44, 30, -1), 30, true);
        this.boss.animations.add('pui',
            Phaser.ArrayUtils.numberArray(45, 59), 30, true);
        this.boss.animations.add('call',
            Phaser.ArrayUtils.numberArray(60, 95), 30, false);
    


        game.physics.p2.enable(this.boss, false);
        this.boss.health = 30000;
        this.boss.body.mass = 300;
        this.boss.body.fixedRotation = true;
        this.boss.body.clearShapes();     // clear default rectangle shape
        this.boss.body.addCircle(160, 0, 15);
        this.boss.body.addRectangle(250, 75, 10, 175);
        this.boss.body.collideWorldBounds = true;

        this.BossSpeed = 1000;

        this.BOSSSTATE = {
            IDLE: 1,
            GUN_1: 2,
            GUN_2: 3,
            GUN_3: 4,
            TU: 5,
            CHUI: 6,
            Nothing: 7
        };

        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        game.physics.p2.enable(this.bullets, true);
        this.bullets.createMultiple(30, 'boss_rock');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
        this.tubullets = false;

        //this.bossChangeState(this.BOSSSTATE.IDLE);

    },

    update: function()
    {
        if(game.input.keyboard.isDown(Phaser.Keyboard.ESC))
        {
            bossMusic.stop();
            music.stop();
            game.state.start('menu');
            
        }
            
        // check input
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            this.keyRecord['LEFT'] = true;
        else
            this.keyRecord['LEFT'] = false;

        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            this.keyRecord['RIGHT'] = true;
        else
            this.keyRecord['RIGHT'] = false;

        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
            this.keyRecord['DOWN'] = true;
        else
            this.keyRecord['DOWN'] = false;

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
            this.keyRecord['UP'] = true;
        else
            this.keyRecord['UP'] = false;

        if (game.input.keyboard.isDown(Phaser.Keyboard.X)) {

            this.keyRecord['X'] = true;
            this.playerDown();

        } else {

            this.keyRecord['X'] = false;
        }
            

        // change state
        switch (this.playerState) {

            case this.PLAYERSTATE.IDLE:
                /*-- IDLE to RUNNING --*/
                if (this.keyRecord['LEFT'] && !this.keyRecord['RIGHT']) {

                    this.playerState = this.PLAYERSTATE.RUNNING;

                } else if (!this.keyRecord['LEFT'] && this.keyRecord['RIGHT']) {

                    this.playerState = this.PLAYERSTATE.RUNNING;

                }
                /*-- IDLE to JUMPING_OFF --*/
                else if (this.keyRecord['UP'] && this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.JUMPING_OFF;
                    this.playerJump();

                }

                /*-- IDLE to FALLING --*/
                if (!this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.FALLING;

                }
                break;

            case this.PLAYERSTATE.RUNNING:
                /*-- RUNNING to IDLE: not pressed --*/
                if (!this.keyRecord['LEFT'] && !this.keyRecord['RIGHT']) {

                    this.playerState = this.PLAYERSTATE.IDLE;

                }
                /*-- RUNNING to IDLE: presse both --*/
                else if (this.keyRecord['LEFT'] && this.keyRecord['RIGHT']) {

                    this.playerState = this.PLAYERSTATE.IDLE;

                }
                /*-- RUNNING to JUMPING_OFF --*/
                else if (this.keyRecord['UP'] && this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.JUMPING_OFF;
                    this.playerJump();

                }

                /*-- RUNNING to FALLING --*/
                if (!this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.FALLING;

                }
                break;

            case this.PLAYERSTATE.JUMPING_OFF:
                /*-- JUMING_OFF to FALLING --*/
                this.player.animations.currentAnim.onComplete.add(
                    function () {

                        this.playerState = this.PLAYERSTATE.FALLING;

                    }, this
                );
                break;

            case this.PLAYERSTATE.FALLING:
                /*-- FALLING to JUMPING_DOWN_HARD --*/
                if (this.isPlayerOnGround() && this.playerNeedDownHard) {
  
                    this.playerState = this.PLAYERSTATE.JUMPING_DOWN_HARD;
                    this.playerNeedDownHard = false;
                    this.isPlayerBoost = false;

                /*-- FALLING to JUMPING_DOWN --*/
                } else if (this.isPlayerOnGround() && !this.playerNeedDownHard) {
                    
                    this.playerState = this.PLAYERSTATE.JUMPING_DOWN;
                    this.playerNeedDownHard = false;
                    this.isPlayerBoost = false;
                }
                break;

            case this.PLAYERSTATE.JUMPING_DOWN:
                this.player.animations.currentAnim.onComplete.add(
                    function () {
                        /*-- JUMING_DOWN to RUNNING --*/
                        if (this.keyRecord['LEFT']
                            && !this.keyRecord['RIGHT']) {

                            this.playerState = this.PLAYERSTATE.RUNNING;

                        } else if (!this.keyRecord['LEFT']
                            && this.keyRecord['RIGHT']) {

                            this.playerState = this.PLAYERSTATE.RUNNING;

                        }
                        /*-- JUMING_DOWN to IDLE --*/
                        else {

                            this.playerState = this.PLAYERSTATE.IDLE;

                        }
                    }, this
                );
                /*-- JUMPING_DOWN to JUMPING_OFF --*/
                if (this.keyRecord['UP'] && this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.JUMPING_OFF;
                    this.playerJump();

                }
                /*-- JUMPING_DOWN to FALLING --*/
                if (!this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.FALLING;

                }
                break;

            case this.PLAYERSTATE.JUMPING_DOWN_HARD:
                this.player.animations.currentAnim.onComplete.add(
                    function () {
                        /*-- JUMING_DOWN_HARD to RUNNING --*/
                        if (this.keyRecord['LEFT']
                            && !this.keyRecord['RIGHT']) {

                            this.playerState = this.PLAYERSTATE.RUNNING;

                        } else if (!this.keyRecord['LEFT']
                            && this.keyRecord['RIGHT']) {

                            this.playerState = this.PLAYERSTATE.RUNNING;

                        }
                        /*-- JUMING_DOWN_HARD to IDLE --*/
                        else {

                            this.playerState = this.PLAYERSTATE.IDLE;

                        }
                    }, this
                );
                /*-- JUMPING_DOWN_HARD to JUMPING_OFF --*/
                if (this.keyRecord['UP'] && this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.JUMPING_OFF;
                    this.playerJump();

                }
                /*-- JUMPING_DOWN_HARD to FALLING --*/
                if (!this.isPlayerOnGround()) {

                    this.playerState = this.PLAYERSTATE.FALLING;

                }
                break;

        }

        // update player
        /*-- velocity: x --*/
        switch (this.playerState) {

            case this.PLAYERSTATE.IDLE:
                this.player.body.velocity.x = 0;
                break;

            case this.PLAYERSTATE.RUNNING:
            case this.PLAYERSTATE.JUMPING_OFF:
            case this.PLAYERSTATE.FALLING:
            case this.PLAYERSTATE.JUMPING_DOWN:
            case this.PLAYERSTATE.JUMPING_DOWN_HARD:
                if (this.keyRecord['LEFT'])
                    this.player.body.velocity.x = -this.playerSpeed;
                else if (this.keyRecord['RIGHT'])
                    this.player.body.velocity.x = this.playerSpeed;
                else
                    this.player.body.velocity.x = 0;
                break;

        }

        /*-- animation --*/
        switch (this.playerState) {

            case this.PLAYERSTATE.IDLE:
                this.player.animations.play('idle');
                break;

            case this.PLAYERSTATE.RUNNING:
                this.player.animations.play('run');
                break;

            case this.PLAYERSTATE.JUMPING_OFF:
                this.player.animations.play('jump_off');
                break;

            case this.PLAYERSTATE.FALLING:
                this.player.animations.play('fall');
                break;

            case this.PLAYERSTATE.JUMPING_DOWN:
                this.player.animations.play('jump_down');
                break;
            
            case this.PLAYERSTATE.JUMPING_DOWN_HARD:
                this.player.animations.play('jump_down_hard');
                break; 

            default:
            //this.player.animations.play('idle');

        }
        /*-- sprite direction --*/
        if (this.keyRecord['RIGHT'] && !this.keyRecord['LEFT']
            && this.player.scale.x < 0)
            this.player.scale.x *= -1;
        if (this.keyRecord['LEFT'] && !this.keyRecord['RIGHT']
            && this.player.scale.x > 0)
            this.player.scale.x *= -1;

        /*-- gain stamina if stand still --*/
        if (this.playerState === this.PLAYERSTATE.IDLE) {

            if (this.playerStamina !== this.playerStaminaMax) {

                this.playerChangeStamina(0.25);
            }
        }

        // the second longest description artificial intelligence in leveltwo he min shu bu yao lian
        this.enemyGroup.forEachAlive(function(child){
        if(child.y > 2086){
            child.kill();
        }
        if (child.enemyState == child.ENEMYSTATE.attack){
            }
        else if (Math.abs(child.x-this.player.x) < 120 && Math.abs(child.y-this.player.y) < 50) {

            var heminshuzhentamacaodan = 0;
            if(child.x < this.player.x && child.enemyfacingleft) {child.scale.x *= -1;}
            else if(child.x > this.player.x && !child.enemyfacingleft) {child.scale.x *= -1;}
            child.body.velocity.x = 0;
            child.enemyState == child.ENEMYSTATE.attack;
            var newshape;
            if(first){
                if(!child.type){
                    child.animations.play('attack');
                    game.time.events.add(300, function(){
                        if(!child.enemyfacingleft) heminshuzhentamacaodan = 15;
                        this.newshape = child.body.addCapsule(100, 15, heminshuzhentamacaodan, 0,
                            0);
                        console.log('1');
                    }, this);
                    game.time.events.add(500, function(){
                        //child.enemyState = child.ENEMYSTATE.patrol;
                        console.log('2');
                        child.body.removeShape(this.newshape);
                        first = 1;
                    }, this);
                    first = 0;
                }
                else{
                    child.animations.play('attack', 30);
                    game.time.events.add(450, function(){
                        this.newshape = child.body.addCapsule(0, 100, 0, 0,
                            0);
                    }, this);
                    game.time.events.add(500, function(){
                        child.kill();
                        var explo = game.add.sprite(child.x, child.y, 'exploEffect');
                        explo.anchor.setTo(0.5);
                        explo.animations.add('explode');
                        explo.animations.play('explode', 50, false, true);
                        first = 1;
                    }, this);
                    first = 0;
                }
            }
        }
        else if (child.enemyState == child.ENEMYSTATE.patrol && this.isEnemyaround(child) == 1) {
            child.animations.play('run');
            if(!child.enemyfacingleft){
                child.scale.x *= -1;
                child.enemyfacingleft = true;
            }
            child.enemyState == child.ENEMYSTATE.run_after;
            child.body.velocity.x = -250 - child.type*50;
        }
        else if (child.enemyState == child.ENEMYSTATE.patrol && this.isEnemyaround(child) == 2) {
            child.animations.play('run');
            if(child.enemyfacingleft){
                child.scale.x *= -1;
                child.enemyfacingleft = false;
            }
            child.enemyState == child.ENEMYSTATE.run_after;
            child.body.velocity.x = 250 + child.type*50;
        }
        else if (child.enemyState == child.ENEMYSTATE.patrol && child.x > child.enemyx - child.patrol_distance && child.enemyfacingleft) {
            child.animations.play('run');
            child.body.velocity.x = -100;
        }
        else if (child.enemyState == child.ENEMYSTATE.patrol && child.x <= child.enemyx - child.patrol_distance && child.enemyfacingleft) {
            child.animations.play('run');
            child.scale.x *= -1;
            child.enemyfacingleft = false;
            child.body.velocity.x = 100;
        }
        else if (child.enemyState == child.ENEMYSTATE.patrol && child.x < child.enemyx + child.patrol_distance && !child.enemyfacingleft) {
            child.animations.play('run');
            child.body.velocity.x = 100;
        }
        else if (child.enemyState == child.ENEMYSTATE.patrol && child.x >= child.enemyx + child.patrol_distance && !child.enemyfacingleft) {
            child.animations.play('run');
            child.scale.x *= -1;
            child.enemyfacingleft = true;
            child.body.velocity.x = 100;
        }
        else if (child.enemyState == child.ENEMYSTATE.run_after && this.isEnemyaround(child) == 1) {
            child.animations.play('run', 50);
            child.body.velocity.x = -250 - child.type*50;
        }
        else if (child.enemyState == child.ENEMYSTATE.run_after && this.isEnemyaround(child) == 2) {
            child.animations.play('run', 50);
            child.body.velocity.x = 250 + child.type*50;
        }
        else if (child.enemyState == child.ENEMYSTATE.run_after && this.isEnemyaround(child) == 0) {
            child.animations.play('run', 50);
            child.enemyState = child.ENEMYSTATE.go_back;
        }
        }, this);

        // the longest description boss artificial intelligence in leveltwo he min shu zhen tama bu yao lian
        this.bossChangeState(nextState);

        if(this.tubullets){
            if (game.time.now > bulletTime)
            {
                //  Grab the first bullet we can from the pool
                var bullet = this.bullets.getFirstExists(false);

                if (bullet)
                {
                    //  And fire it
                    bullet.type = 2;
                    bullet.scale.setTo(0.3);
                    bullet.anchor.setTo(0.5);
                    game.physics.p2.enable(bullet, false);
                    bullet.reset(this.boss.x, this.boss.y + 8);
                    bullet.body.velocity.y = 400 * (this.player.y - this.boss.y)/Math.sqrt((this.player.x - this.boss.x)*(this.player.x - this.boss.x)+(this.player.y - this.boss.y)*(this.player.y - this.boss.y));
                    bullet.body.velocity.x = 400 * (this.player.x - this.boss.x)/Math.sqrt((this.player.x - this.boss.x)*(this.player.x - this.boss.x)+(this.player.y - this.boss.y)*(this.player.y - this.boss.y));
                    var bulltime = 600;
                    if(this.boss.health <= 10000){bulltime = 400;}
                    bulletTime = game.time.now + bulltime;
                    bullet.name = 'bullet';
                    //bullet.body.onBeginContact.add(this.hitenemy, bullet);
                }
            }
        }
        this.bullets.forEachAlive(function(child){
            if(Math.abs(child.x - this.player.x)<=55 && Math.abs(child.y - this.player.y)<=82.5){
                if(this.boss.health>=10000){
                    this.playerChangeHealth(-50);
                }
                else{
                    this.playerChangeHealth(-100);
                }
                child.kill();
            }
        },this);

        if(this.player.y > 2050)  {console.log(this.player.y); this.playerChangeHealth(-900); }
        if(this.boss.health <= 10000) this.boss.tint = Phaser.Color.RED;
        if(this.boss.health <= 0) {this.boss.kill();alert("You win!");}

        // enter boss level...
        if(this.player.x >= 271*72 && firstEnterBoss) {
            firstEnterBoss = 0;
            music.stop();
            bossMusic.play();
            bossMusic.volume = 0.5;
            // limit camera
            game.camera.deadzone = new Phaser.Rectangle(480, 0, 320, 360);

            // set bound
            game.physics.p2.convertCollisionObjects(this.map, 'boss_bound_layer');
        }

        // boss gun bounds back
        console.log(this.boss.x);
        if (Math.abs(this.boss.body.velocity.x) > 50 ) {

            if (this.boss.x <= 19884 || this.boss.x >= 20998) {
                
                this.boss.body.velocity.x *= -1;

                this.boss.animations.play('roll_r');
            }

        }
        
    },

    isPlayerOnGround: function ()
    {
        var result = false;

        for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {

            var c = game.physics.p2.world.narrowphase.contactEquations[i];
            if (c.bodyA === this.player.body.data || c.bodyB === this.player.body.data) {

                var yAxis = p2.vec2.fromValues(0, 1);
                var d = p2.vec2.dot(c.normalA, yAxis);
                if (Math.abs(d) > 0.5) result = true;

            }

        }

        return result;

    },

    isEnemyaround: function (enemy) {
        if (Math.abs(this.player.y - enemy.y) <= 300 && this.player.x - enemy.x <= 400 && this.player.x - enemy.x >= 0) {
            return 2;
        }
        else if (Math.abs(this.player.y - enemy.y) <= 300 && this.player.x - enemy.x <= 0 && this.player.x - enemy.x >= -500) {
            return 1;
        }
        else{
            return 0;
        }
    },

    enemyinit: function (x, y, z, type) {
        var enemy =(type == 0)?this.enemyGroup.create(x, y, 'batman') : this.enemyGroup.create(x, y, 'bomber');
        //enemy.body.setCollisionGroup(this.enemyCollisionGroup);
        enemy.enemyx = x;
        enemy.enemyfacingleft = false;
        //enemy.scale.setTo(0.15);
        enemy.patrol_distance = z;
        enemy.body.onBeginContact.add(this.hitenemy, enemy);

        enemy.animations.add('idle',
            Phaser.ArrayUtils.numberArray(0, 14), 30, true);
        enemy.animations.add('run',
            Phaser.ArrayUtils.numberArray(15, 29), 30, true);
        enemy.animations.add('attack',
            Phaser.ArrayUtils.numberArray(30, 44), 50, true);
        game.physics.p2.enable(enemy, true);
        enemy.body.damping = 0.8;
        enemy.body.mass = 10;
        enemy.body.fixedRotation = true;
        enemy.type = type;
        enemy.body.clearShapes();     // clear default rectangle shape
        enemy.body.addCapsule(45, 35, 0, 15,
            Phaser.Math.degToRad(90));
        enemy.body.collideWorldBounds = true;
        enemy.ENEMYSTATE = {
            patrol: 1,
            run_after: 2,
            go_back: 3,
            attack: 4
        };
        enemy.enemyState = enemy.ENEMYSTATE.patrol;
    },

    hitenemy: function (body, bodyB, shapeA, shapeB, equation) {
        if (body)
        {
            if(body.sprite){
                if (body.sprite.key == "Romeo"){
                    //console.log(body.y);
                    //console.log(this.y);
                    if(body.y <= this.y - 90) {
                        monsterdieVoice.play();
                        this.kill();
                        obj.AfterEnemyDeath(this.x, this.y);
                    }
                    else{
                        if(!this.type) obj.playerChangeHealth(-150);
                        else{
                            obj.playerChangeHealth(-450);
                        }
                    }
                }
            }
        }
        else
        {
            console.log('lalala');
        }
    },

    hitplayer: function (body, bodyB, shapeA, shapeB, equation) {
        if (body)
        {
            if(body.sprite){
                if (body.sprite.key == "boss_rock"){
                    //console.log(body.y);
                    //console.log(this.y);
                    obj.playerChangeHealth(-50);
                }
                else if (body.sprite.key == "boss"){
                    var rnddamage = game.rnd.between(800,1200);
                    if(this.boss.y - this.player.y > 170) {

                        this.boss.health -= rnddamage;

                        var fontObj1 = {
                            font: "40px Eras_Demi",
                            fill: "#FF0000",
                            stroke: "#000000",
                            strokeThickness: 3,
                            align: "center"
                        };
                        var damageText =  game.add.text(this.player.x, this.player.y, 
                            rnddamage.toString(), fontObj1);
                        var tween = game.add.tween(damageText);
                        tween.onComplete.add(function(){ damageText.kill(); }, this);
                        tween.to({y: damageText.y - 50}, 750, Phaser.Easing.Bounce.Out,true);
                        
                    }
                    else obj.playerChangeHealth(-250);
                }
            }
        }
        else
        {
            console.log('lalala');
        }
    },

    AfterEnemyDeath: function (deathx, deathy) {

        // shake camera
        game.camera.shake(0.01, 300, false, Phaser.Camera.SHAKE_VERTICAL);

        // explode cracked rocks
        var emitter = game.add.emitter(deathx, deathy, 50);
            emitter.width = 100;
            emitter.height = 100;
            emitter.makeParticles('cracked_rock');
            emitter.gravity = 700;
            emitter.minParticleScale = 0.1;
            emitter.maxParticleScale = 0.75;
            emitter.explode(Phaser.Timer.SECOND * 5);

    },

    playerdie: function () {
        first = 1;
        firstin = 1;
        nextState = 1;
        save = 0;
        if(this.player.x >= 271*72) save = 1;
        game.state.restart();                        
    },

    playerJump: function()
    {
        this.player.body.velocity.y -= this.playerJumpSpeed;
    },

    playerDown: function()
    {
        // can jump down while in air
        if (!this.isPlayerOnGround()) {

            if (!this.isPlayerBoost && this.playerStamina >= 20) {  // only boost once

                this.isPlayerBoost = true;

                this.player.body.velocity.y += this.playerDownStregth;
                this.playerNeedDownHard = true; // make it play down_hard anim when hit ground
                this.playerChangeStamina(-10.0);
            }
        }
            
    },

    playerChangeHealth: function(change)
    {
        // change hp variable
        this.playerHealth += change;
        if (this.playerHealth < 0) {

            this.playerHealth = 0;

        } else if (this.playerHealth > this.playerHealthMAX) {

            this.playerHealth = this.playerHealthMAX;
        }

        // change UI
        var showNum = Math.ceil(this.playerHealth / 100);
        for (var i = 0; i < 9; i++, showNum--) {

            this.healthSlice[i].visible = showNum > 0 ? true : false;
        }

        // when player die...
        if (this.playerHealth === 0) {
            music.stop();
            bulletTime = 0;
            dieVoice.play();
            this.playerdie();

        }
    },

    playerChangeStamina: function(change)
    {
        // change sta
        this.playerStamina += change;
        if (this.playerStamina < 0) {

            this.playerStamina = 0;

        } else if (this.playerStamina > this.playerStaminaMax) {

            this.playerStamina = this.playerStaminaMax;
        }

        // change UI
        this.staBar.scale.x = this.playerStamina / this.playerStaminaMax;

    },

    bossChangeState: function(state)
    {
        //console.log('change to: ' + state);

        if (state === this.BOSSSTATE.IDLE) {

            this.boss.animations.play('idle');
            this.boss.body.velocity.x = 0;
            var a = 2.8;
            // next state
            if(this.boss.health <= 10000) {a = 1;}
            game.time.events.add(Phaser.Timer.SECOND * a, function() {

                var rndNum = game.rnd.between(1, 3);
                if (rndNum === 1) {
                    nextState = this.BOSSSTATE.GUN_1;
                }
                else if (rndNum === 2)
                    nextState = this.BOSSSTATE.TU;
                else
                    nextState = this.BOSSSTATE.CHUI;

                //obj.bossChangeState(nextState);

            }, this);
            nextState = this.BOSSSTATE.Nothing;

        } else if (state === this.BOSSSTATE.GUN_1) {

            this.boss.animations.play('puz');
            this.boss.body.velocity.x = 0;
            // next state
            this.boss.animations.currentAnim.onComplete.add(
                function() {
                    nextState = this.BOSSSTATE.GUN_2;
                }, this);
            nextState = this.BOSSSTATE.Nothing;

        } else if (state === this.BOSSSTATE.GUN_2) {

            this.boss.body.clearShapes();
            this.boss.body.addCircle(160, 0, 80);
            var dir = game.rnd.between(0, 1);
                var speed = dir ? this.BossSpeed : -this.BossSpeed;
                this.boss.body.velocity.x = speed;
            if (this.boss.body.velocity.x < 0) {

                this.boss.animations.play('roll');

            } else {

                this.boss.animations.play('roll_r');
            }

            // next state
            game.time.events.add(Phaser.Timer.SECOND * 3.5, function() {

                nextState = this.BOSSSTATE.GUN_3;

            }, this);
            nextState = this.BOSSSTATE.Nothing;
            
        } else if (state === this.BOSSSTATE.GUN_3) {

            this.boss.body.clearShapes();
            this.boss.body.addCircle(160, 0, 15);
            this.boss.body.addRectangle(250, 75, 10, 175);
            this.boss.animations.play('puz_r');
            this.boss.body.velocity.x = 0;

            // next state
            this.boss.animations.currentAnim.onComplete.add(
                function() {
                    nextState = this.BOSSSTATE.IDLE;
                }, this);
            nextState = this.BOSSSTATE.Nothing;

        } else if (state === this.BOSSSTATE.TU) {

            this.boss.animations.play('pui');
            this.boss.body.velocity.x = 0;
            this.tubullets = true;
            // next state
            game.time.events.add(Phaser.Timer.SECOND * 3, function() {

                nextState = this.BOSSSTATE.IDLE;
                this.tubullets = false;
            }, this);
            nextState = this.BOSSSTATE.Nothing;

        } else if (state === this.BOSSSTATE.CHUI) {

            this.boss.animations.play('call');
            this.boss.body.velocity.x = 0;
            var genTyp = game.rnd.between(0,1);
            if(this.player.x>271*72 && this.boss.health >= 1000){
                this.enemyinit(278*72, 18*72, 200, 1);
                this.enemyinit(289*72, 18*72, 200, 1);
            }
            if(this.boss.health <= 10000) {
                this.enemyinit(278*72, 8*72, 200, 1);
                this.enemyinit(289*72, 8*72, 200, 1);
            }
            // next state
            this.boss.animations.currentAnim.onComplete.add(
                function() {
                    nextState = this.BOSSSTATE.IDLE;
                }, this);
            nextState = this.BOSSSTATE.Nothing;
        } else{
            //alert('hei');
            //do nothing
        }

    },

    enemiesDeploy: function()
    {

        // specify x/y tile cordinate & detect range & monster type
        var monsterArr = [
            [16, 24, 70, 1],
            [25, 26, 70, 1],
            [32, 23, 70, 1],
            [46, 24, 0, 0],
            [42, 20, 0, 0],
            [51, 28, 200, 1],
            [56, 28, 200, 1],
            [61, 28, 200, 1],
            [66, 28, 200, 1],
            [71, 28, 200, 1],
            [76, 28, 200, 1],
            [97, 26, 50, 0],
            [94, 28, 50, 0],
            [100, 26, 50, 0],
            [122, 26, 50, 1],
            [130, 27, 300, 1],
            [137, 27, 200, 1],
            [144, 27, 200, 1],
        ];

        for (var i in monsterArr) {

            this.enemyinit(monsterArr[i][0] * 72, monsterArr[i][1] * 72, 
                monsterArr[i][2], monsterArr[i][3]);

        }
    }

};