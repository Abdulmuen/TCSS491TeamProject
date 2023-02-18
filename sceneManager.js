class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.Zero = new Zero(this.game, 1 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
        this.loadlevel(1 * PARAMS.BLOCKWIDTH, 2.45 * PARAMS.BLOCKWIDTH);
        this.starting = true;
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loadlevel(x, y) {
        this.clearEntities();
        this.x = 0;
        this.Zero.x = x;
        this.Zero.y = y;

        this.game.addEntity(this.Zero);
        gameEngine.addEntity(new gr1(gameEngine, this.x));
        gameEngine.addEntity(new trap(gameEngine, 50, 50));
        gameEngine.addEntity(new gangster(gameEngine, 1000, 255));
        gameEngine.addEntity(new shooter(gameEngine, 1545, 255));
        gameEngine.addEntity(new shooter(gameEngine, 2545, 255));
        gameEngine.addEntity(new boss(gameEngine,1300,177.5));
        gameEngine.addEntity(new bg1(gameEngine, this.x));
    }
    update() {

        let midpoint = PARAMS.CANVAS_WIDTH / 2 - 300;
        
        if (this.x < this.Zero.x - midpoint) this.x = this.Zero.x - midpoint;
    }

    draw(ctx) {
        

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

