class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.Zero1 = new Zero(this.game, 100, 500);
        this.levelOne = false;
        this.levelTwo = false;
        this.billboard = false;
        this.loadLevelOne();
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loadStartScreen() {
        gameEngine.addEntity(new Startscreen(gameEngine));
    }

    loadLevelOne() {
        this.billboard = true;
        this.clearEntities();
        this.levelOne = true;
        gameEngine.addEntity(this.Zero1);
        ASSET_MANAGER.playAsset("./sound/2.mp3");

        //floor 1
        gameEngine.addEntity(new gr1(gameEngine, 0, 720, 10));
        gameEngine.addEntity(new gr1(gameEngine, 900, 720, 10));
        gameEngine.addEntity(new gr1(gameEngine, 1750, 720, 40));
        gameEngine.addEntity(new gangster(gameEngine, 1100, 638));
        gameEngine.addEntity(new gangster(gameEngine, 1750, 638));
        setTimeout(() => {
            gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 3250, 638));
        }, 700);

        //midground
        gameEngine.addEntity(new gr1(gameEngine, 2000, 640, 15));
        gameEngine.addEntity(new Sniper(gameEngine, 3500, 490, 1));

        //floor 2
        gameEngine.addEntity(new gr1(gameEngine, 625, 570, 3));
        gameEngine.addEntity(new gr1(gameEngine, 1475, 570, 3));
        gameEngine.addEntity(new gr1(gameEngine, 3300, 550, 9));
        

        //midground 2
        gameEngine.addEntity(new gr1(gameEngine, 3100, 430, 3));


        //floor 3
        gameEngine.addEntity(new gr1(gameEngine, 0, 250, 14));
        gameEngine.addEntity(new gr1(gameEngine, 2600, 250, 10));
        gameEngine.addEntity(new gr1(gameEngine, 1750, 250, 14));
        gameEngine.addEntity(new gr1(gameEngine, 900, 250, 13));
        gameEngine.addEntity(new door(gameEngine, 10, 140));
        gameEngine.addEntity(new gangster(gameEngine, 1750, 178));
        gameEngine.addEntity(new gangster(gameEngine, 200, 178));
        setTimeout(() => {
            gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 2900, 168));
        }, 700);
        setTimeout(() => {
            gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 1300, 168));
        }, 700);
        


        //gangsters
        //gameEngine.addEntity(new gangster(gameEngine, 1100, 635));


        //shooters
        // setTimeout(() => {
        //     gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 3000, 407));
        // }, 700);

        //trap
        let xxx = 2030;
        for (let i = 0; i < 14; i++) {
            gameEngine.addEntity(new trap(gameEngine, xxx, 340));
            xxx += 50;
        }

        //sniper
        //gameEngine.addEntity(new Sniper(gameEngine, 0, 425, 0));

        //background
        gameEngine.addEntity(new background_2(gameEngine));
        
    };

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

    bossF() {
        this.clearEntities();
        this.Zero1 = new Zero(this.game, 330, 550);
        this.game.addEntity(this.Zero1);
        gameEngine.addEntity(new gr1(gameEngine, -310, 510));
        gameEngine.addEntity(new gr1(gameEngine, 810, 510));
        gameEngine.addEntity(new gr1(gameEngine, 0, 650));
        gameEngine.addEntity(new gr1(gameEngine, 500 * 1, 650));
        gameEngine.addEntity(new gr1(gameEngine, 500 * 2, 650));
        gameEngine.addEntity(new boss(gameEngine, 800, 490));
        gameEngine.addEntity(new trap(gameEngine, 490, 350));
        gameEngine.addEntity(new trap(gameEngine, 990, 350));
        gameEngine.addEntity(new bg3(gameEngine, 0, 0));
    };

    update() {
        this.updateAudio();
        if (this.Zero1.BossFight == true && this.levelOne == true) {
            this.clearEntities();
            ASSET_MANAGER.pauseBackgroundMusic();
            this.Zero1.BossFight = false;
            this.billboard = false;
            this.game.addEntity(new Ltwo(this.game));
        }
        else if (this.Zero1.BossFight == true && this.levelTwo == true) {

            this.bossF();
        }

        let midpoint = PARAMS.CANVAS_WIDTH / 2;
        if (this.x < this.Zero1.x - midpoint) this.x = this.Zero1.x - midpoint;
        if (this.x > this.Zero1.x - midpoint / 2 && this.Zero1.x - midpoint / 2 > 0) this.x = this.Zero1.x - midpoint / 2;
    };

    draw(ctx) {

    };

}

class Ltwo {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.Zero1 = new Zero(this.game, 1 * PARAMS.BLOCKWIDTH, 550);
        this.levelTwo = false;
        this.loadLevelTwo();
    };

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loadLevelTwo() {

        this.clearEntities();
        this.levelTwo = true;
        gameEngine.addEntity(this.Zero1);
        ASSET_MANAGER.playAsset("./sound/portal.mp3");
        ASSET_MANAGER.playAsset("./sound/1.wav");

        //floor 1
        gameEngine.addEntity(new gr1(gameEngine, 0, 650,80));


        //floor 2
        gameEngine.addEntity(new gr1(gameEngine, 700, 490,10));
        gameEngine.addEntity(new gr1(gameEngine, 1800, 490,10));
        gameEngine.addEntity(new gr1(gameEngine, 2800, 490,10));
        gameEngine.addEntity(new gr1(gameEngine, 0, 490,10));

        //floor 3
        gameEngine.addEntity(new gr1(gameEngine, 450, 330,10));
        gameEngine.addEntity(new gr1(gameEngine, 1150, 330,10));
        gameEngine.addEntity(new gr1(gameEngine, 1950, 330,10));
        gameEngine.addEntity(new gr1(gameEngine, 2650, 330,10));


        //gangsters
        gameEngine.addEntity(new gangster(gameEngine, 800, 570));
        gameEngine.addEntity(new gangster(gameEngine, 1300, 570));
        gameEngine.addEntity(new gangster(gameEngine, 1800, 570));
        gameEngine.addEntity(new gangster(gameEngine, 2500, 570));
        gameEngine.addEntity(new gangster(gameEngine, 2700, 570));
        gameEngine.addEntity(new gangster(gameEngine, 3700, 570));
        //shooters
        setTimeout(() => {
            gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 3000, 407));
        }, 700);
        gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 3000, 567));
        setTimeout(() => {
            gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 2300, 247));
        }, 1100);
            gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 600, 247));
        //trap
        //gameEngine.addEntity(new trap(gameEngine, 600, 350));
        gameEngine.addEntity(new trap(gameEngine, 1500, 350));
        gameEngine.addEntity(new trap(gameEngine, 2300, 350));
        gameEngine.addEntity(new trap(gameEngine, 3300, 350));


        gameEngine.addEntity(new door(gameEngine, 3900, 540));
        //sniper
        gameEngine.addEntity(new Sniper(gameEngine, 0, 425, 0));
        //background
        gameEngine.addEntity(new background_1(gameEngine));
    }

    bossF() {
        this.clearEntities();
        this.Zero1 = new Zero(this.game, 330, 550);
        this.game.addEntity(this.Zero1);
        ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset("./sound/portal.mp3");
        ASSET_MANAGER.playAsset("./sound/boss1.wav");

        gameEngine.addEntity(new gr1(gameEngine, 0, 650, 30));
        gameEngine.addEntity(new boss(gameEngine, 800, 490));
        gameEngine.addEntity(new trap(gameEngine, 490, 350));
        gameEngine.addEntity(new trap(gameEngine, 990, 350));
        gameEngine.addEntity(new bg3(gameEngine, 0, 0));
    }

    update() {
        this.updateAudio();
        if (this.Zero1.BossFight == true && this.levelTwo == true) {
            this.bossF();
        }
        let midpoint = PARAMS.CANVAS_WIDTH / 2;
        if (this.x < this.Zero1.x - midpoint) this.x = this.Zero1.x - midpoint;
        if (this.x > this.Zero1.x - midpoint / 2 && this.Zero1.x - midpoint / 2 > 0) this.x = this.Zero1.x - midpoint / 2;

    }

    draw(ctx) {

    }
}
