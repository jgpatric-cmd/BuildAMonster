class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Key class member
        this.aKey = null;
        this.dKey = null;

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        this.leftLegX = this.bodyX - 50;
        this.rightLegX = this.leftLegX + 100;
        this.legY = this.bodyY + 116;

        this.leftArmX = this.bodyX - 120;
        this.rightArmX = this.bodyX + 120;
        this.armY = this.bodyY + 25;

        this.eyeX = this.bodyX;
        this.eyeY = this.bodyY - 20;

        this.mouthX = this.bodyX;
        this.mouthY = this.bodyY + 40;

        this.leftHornX = this.bodyX - 70;
        this.rightHornX = this.bodyX + 70;
        this.hornY = this.bodyY - 50;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        //  Event input keys
        let fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        let sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);




        //  Event input: Fang Smile
        fKey.on('down', (key, event) => {
            my.sprite.fangSmile.visible = true;
            my.sprite.smile.visible = false;
        });

        sKey.on('down', (key, event) => {
            my.sprite.fangSmile.visible = false;
            my.sprite.smile.visible = true;
        });

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_blueD.png");

        //  Create the legs
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.legY, "monsterParts", "leg_blueC.png");
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.legY, "monsterParts", "leg_blueC.png");
        my.sprite.leftLeg.flipX = true; 
        //  Create the arms
        my.sprite.rightArm = this.add.sprite(this.rightArmX, this.armY, "monsterParts", "arm_blueE.png");
        my.sprite.leftArm = this.add.sprite(this.leftArmX, this.armY, "monsterParts", "arm_blueE.png");
        my.sprite.leftArm.flipX = true;
        my.sprite.rightArm.rotation = -0.9;
        my.sprite.leftArm.rotation = 0.9;
        //  Create the eyes
        my.sprite.eye = this.add.sprite(this.eyeX, this.eyeY, "monsterParts", "eye_human_blue.png");
        //  Create the smile
        my.sprite.smile = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouthA.png");
        my.sprite.fangSmile = this.add.sprite(this.mouthX, this.mouthY, "monsterParts", "mouthB.png");
        my.sprite.fangSmile.visible = false;
        //  Create the horns
        my.sprite.rightHorn = this.add.sprite(this.rightHornX, this.hornY, "monsterParts", "detail_white_horn_large.png");        
        my.sprite.leftHorn = this.add.sprite(this.leftHornX, this.hornY, "monsterParts", "detail_white_horn_large.png");
        my.sprite.leftHorn.flipX = true;


        
    }

    update() {
        let my = this.my;

        //  Polling input:
        //  Go Left
        if (this.aKey.isDown) {
            //  Iterate for every single monster body part
            for (let part in my.sprite) {
                my.sprite[part].x -= 2;
            }
        }
        //  Go Right
        if (this.dKey.isDown) {
            //  Iterate for every single monster body part
            for (let part in my.sprite) {
                my.sprite[part].x += 2;
            }
        }
    }

}