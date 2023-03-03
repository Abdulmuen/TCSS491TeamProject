class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.Zero1 = new Zero(this.game, 1 * PARAMS.BLOCKWIDTH, 550);
        this.levelOne = false;
        this.levelTwo = false;   
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
        
            this.clearEntities();
            this.levelOne = true;
            gameEngine.addEntity(this.Zero1);
            gameEngine.addEntity(new door(gameEngine, 3550));

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
            //shooters
            setTimeout(() => {
                gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 3000, 407));
            }, 700);
            gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 3000, 567));
            setTimeout(() => {
                gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 2300, 247));
            }, 700);
                gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 555, 247));
            //trap
            //gameEngine.addEntity(new trap(gameEngine, 600, 350));
            gameEngine.addEntity(new trap(gameEngine, 1500, 350));
            gameEngine.addEntity(new trap(gameEngine, 2300, 350));
            gameEngine.addEntity(new trap(gameEngine, 3300, 350));

            //sniper
            gameEngine.addEntity(new Sniper(gameEngine, 0, 425, 0));

            //background
            gameEngine.addEntity(new background_2(gameEngine, 0));
    }

    bossF() {
        this.clearEntities();
        this.Zero1 = new Zero(this.game, 330, 550);
        this.game.addEntity(this.Zero1);
        gameEngine.addEntity(new gr1(gameEngine, -310,510));
        gameEngine.addEntity(new gr1(gameEngine, 810,510));
        gameEngine.addEntity(new gr1(gameEngine, 0, 650));
        gameEngine.addEntity(new gr1(gameEngine, 500 * 1, 650));
        gameEngine.addEntity(new gr1(gameEngine, 500 * 2, 650));
        gameEngine.addEntity(new boss(gameEngine, 800, 490));
        gameEngine.addEntity(new trap(gameEngine, 490, 350));
        gameEngine.addEntity(new trap(gameEngine, 990, 350));
        gameEngine.addEntity(new bg3(gameEngine, 0, 0));
    } 

    update() {
        
        if(this.Zero1.BossFight == true && this.levelOne == true){
            this.clearEntities();
            this.Zero1.BossFight = false;
            this.game.addEntity(new Ltwo(this.game));      
        }
        else if(this.Zero1.BossFight == true && this.levelTwo == true){

            this.bossF();
        }
        let midpoint = PARAMS.CANVAS_WIDTH / 2;
        if (this.x < this.Zero1.x - midpoint) this.x = this.Zero1.x - midpoint;
        if (this.x > this.Zero1.x - midpoint/2 && this.Zero1.x - midpoint/2 > 0) this.x = this.Zero1.x - midpoint/2;
        
}
    draw(ctx) {

    }

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

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loadLevelTwo() {
            this.clearEntities();
            this.levelTwo =true;
            gameEngine.addEntity(this.Zero1);
            gameEngine.addEntity(new door(gameEngine, 3550));

            //floor 1
            gameEngine.addEntity(new gr1(gameEngine, 0, 650,80));


            //floor 2
            gameEngine.addEntity(new gr1(gameEngine, 700, 490,10));
            gameEngine.addEntity(new gr1(gameEngine, 1800, 490,10));
            gameEngine.addEntity(new gr1(gameEngine, 2800, 490,10));
            gameEngine.addEntity(new gr1(gameEngine, 0, 490,10));
            
            //gangsters
            gameEngine.addEntity(new gangster(gameEngine, 800, 570));
            gameEngine.addEntity(new gangster(gameEngine, 1300, 570));
            gameEngine.addEntity(new gangster(gameEngine, 1800, 570));
            gameEngine.addEntity(new gangster(gameEngine, 2500, 570));
            gameEngine.addEntity(new gangster(gameEngine, 2700, 570));

            //shooters
            setTimeout(() => {
                gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 3000, 407));
            }, 700);
            gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 3000, 567));

            //trap
            gameEngine.addEntity(new trap(gameEngine, 600, 350));
            gameEngine.addEntity(new trap(gameEngine, 1500, 350));
            gameEngine.addEntity(new trap(gameEngine, 2300, 350));
            gameEngine.addEntity(new trap(gameEngine, 3300, 350));

            //sniper
            gameEngine.addEntity(new Sniper(gameEngine, 0, 425, 0));

            //background
            gameEngine.addEntity(new bg1(gameEngine, 0));
            gameEngine.addEntity(new bg1(gameEngine, 2600 * 1));
            gameEngine.addEntity(new bg2(gameEngine, 0, 0));
            gameEngine.addEntity(new bg2(gameEngine, 1620, 0));
            gameEngine.addEntity(new bg2(gameEngine, 3240, 0));

    }
    bossF() {
        this.clearEntities();
        this.Zero1 = new Zero(this.game, 330, 550);
        this.game.addEntity(this.Zero1);
        gameEngine.addEntity(new gr1(gameEngine, -310,510,10));
        gameEngine.addEntity(new gr1(gameEngine, 810,510,10));
        gameEngine.addEntity(new gr1(gameEngine, 0, 650,30));
        gameEngine.addEntity(new boss(gameEngine, 800, 490));
        gameEngine.addEntity(new trap(gameEngine, 490, 350));
        gameEngine.addEntity(new trap(gameEngine, 990, 350));
        gameEngine.addEntity(new bg3(gameEngine, 0, 0));
    } 

    update() {
        
        if(this.Zero1.BossFight == true && this.levelTwo == true){
            this.bossF();
        }
        let midpoint = PARAMS.CANVAS_WIDTH / 2;
        if (this.x < this.Zero1.x - midpoint) this.x = this.Zero1.x - midpoint;
        if (this.x > this.Zero1.x - midpoint/2 && this.Zero1.x - midpoint/2 > 0) this.x = this.Zero1.x - midpoint/2;
        
}
    draw(ctx) {

    }

}
