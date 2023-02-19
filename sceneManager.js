class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.Zero = new Zero(this.game, 1 * PARAMS.BLOCKWIDTH, 560);
        this.starting = true;
        this.loadAnimation();
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loadAnimation() {
        this.clearEntities();

        this.game.addEntity(this.Zero);
        gameEngine.addEntity(new door(gameEngine, 3350));
        gameEngine.addEntity(new gr1(gameEngine, 0, 650));
        gameEngine.addEntity(new gr1(gameEngine, 500 * 1, 650));
        gameEngine.addEntity(new gr1(gameEngine, 500 * 2, 650));
        gameEngine.addEntity(new gr1(gameEngine, 500 * 3, 650));
        gameEngine.addEntity(new gr1(gameEngine, 500 * 4, 650));
        gameEngine.addEntity(new gr1(gameEngine, 500 * 5, 650));
        gameEngine.addEntity(new gr1(gameEngine, 500 * 6, 650));
        gameEngine.addEntity(new gr1(gameEngine, 500 * 7, 650));
        gameEngine.addEntity(new shooter(gameEngine, 750, 570));

        gameEngine.addEntity(new trap(gameEngine, 550, 345));
        gameEngine.addEntity(new trap(gameEngine, 1150, 345));
        gameEngine.addEntity(new trap(gameEngine, 2150, 345));
        //floor 2
        gameEngine.addEntity(new gr1(gameEngine, 700, 490));
        gameEngine.addEntity(new gr1(gameEngine, 1800, 490));
        gameEngine.addEntity(new gr1(gameEngine, 2800, 490));
        setTimeout(() => {
            gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 960, 410));
        }, 700);
        setTimeout(() => {
            gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 3160, 410));
        }, 1500);
        gameEngine.addEntity(new gr1(gameEngine, 0, 490));
        gameEngine.addEntity(new Sniper(gameEngine, 0, 425, 0));
        gameEngine.addEntity(new bg1(gameEngine, 0));
        gameEngine.addEntity(new bg1(gameEngine, 2600 * 1));
        gameEngine.addEntity(new bg2(gameEngine, 0, 0));
        gameEngine.addEntity(new bg2(gameEngine, 1620, 0));
        gameEngine.addEntity(new bg2(gameEngine, 3240, 0));

    }

    update() {
        let midpoint = PARAMS.CANVAS_WIDTH / 2;
        if (this.x < this.Zero.x - midpoint) this.x = this.Zero.x - midpoint;
    }

    draw(ctx) {
        
    }

}

class Hud {
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


