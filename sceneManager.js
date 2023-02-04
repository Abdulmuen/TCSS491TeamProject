class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.Zero = new Zero(this.game,1 * PARAMS.BLOCKWIDTH, 2.45 * PARAMS.BLOCKWIDTH);
        this.Zero1 = new Zero(this.game,1 * PARAMS.BLOCKWIDTH, 2.45 * PARAMS.BLOCKWIDTH);
        this.shooter = new shooter(this.game,1160,255);
        this.boss = new boss(this.game,1400,177.5 );
        //this.addMain(1 * PARAMS.BLOCKWIDTH, 2.45 * PARAMS.BLOCKWIDTH);
        this.starting = true;
        this.loadStartScreen();
        
    };

    clearEntities() {
        this.game.entities.forEach(function d(entity) {
            entity.removeFromWorld = true;
        });
    }

    addMain(x, y) {
        this.clearEntities();
        this.x = 0;
        this.Zero.x = x;
        this.Zero.y = y;
        this.game.addEntity(this.Zero);
    }
    loadGame(){
        this.clearEntities();
        this.game.addEntity(this.Zero1);
        this.game.addEntity(this.shooter);
        this.game.addEntity(this.boss); 
        this.game.addEntity(new bg1(gameEngine));
        this.game.addEntity(new Hud(gameEngine));

    }
    update() {
        if (this.game.keys["Enter"] ) {
            this.starting = false;
            this.loadGame();
        } 
    }

    draw(ctx) {
        

    }


    loadStartScreen() {
        this.clearEntities();
        this.game.addEntity(this.Zero);
        gameEngine.addEntity(new Startscreen(gameEngine));
    }
}

class Hud{
    constructor(game) {
        this.game = game;

        };

    update() {
        
        }
    draw(ctx) {
        console.log("check");
        ctx.font = "50px Arial";
        ctx.fillStyle = 'Red';
        ctx.textAlign = 'center';
        ctx.fillText("Score", 100, 50);
        }
}

class Startscreen {
        constructor(game) {
            this.game = game;
            this.game.starting = true;
    };

    update() {
        if (this.game.keys["Enter"]) {
            this.game.starting = false;
        }
    };

    draw(ctx) {
        if (this.game.starting == true) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 9999, 9999);
            ctx.font = "50px Arial";
            ctx.fillStyle = 'White';
            ctx.textAlign = 'center';
            ctx.fillText("Press Enter to Start", 948, 374);
        }
    };
}