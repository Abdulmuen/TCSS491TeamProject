class SceneManager {
    constructor(game, level) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.Zero = new Zero(this.game, 1 * PARAMS.BLOCKWIDTH, 550);
        this.starting = true;
        this.level = level;
        this.loadLevel(this.level);
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loadLevel(level) {
        if (level == 1) {
            this.clearEntities();

            this.game.addEntity(this.Zero);
            gameEngine.addEntity(new door(gameEngine, 3350));

            //floor 1
            gameEngine.addEntity(new gr1(gameEngine, 0, 650, 80));

            //floor 2
            gameEngine.addEntity(new gr1(gameEngine, 700, 490, 10));
            gameEngine.addEntity(new gr1(gameEngine, 1800, 490, 10));
            gameEngine.addEntity(new gr1(gameEngine, 2800, 490, 10));
            gameEngine.addEntity(new gr1(gameEngine, 0, 490, 10));

            //gangsters
            gameEngine.addEntity(new gangster(gameEngine, 800, 570));
            gameEngine.addEntity(new gangster(gameEngine, 1300, 570));
            gameEngine.addEntity(new gangster(gameEngine, 1800, 570));
            gameEngine.addEntity(new gangster(gameEngine, 2500, 570));
            gameEngine.addEntity(new gangster(gameEngine, 2700, 570));

            //shooters
            setTimeout(() => {
                gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 3000, 410));
            }, 700);
            gameEngine.addEntityToFrontOfList(new shooter(gameEngine, 3000, 570));

            //trap
            gameEngine.addEntity(new trap(gameEngine, 600, 350));
            gameEngine.addEntity(new trap(gameEngine, 1500, 350));
            gameEngine.addEntity(new trap(gameEngine, 2300, 350));

            //sniper
            gameEngine.addEntity(new Sniper(gameEngine, 0, 425, 0));

            //background
            gameEngine.addEntity(new bg1(gameEngine, 0));
            gameEngine.addEntity(new bg1(gameEngine, 2600 * 1));
            gameEngine.addEntity(new bg2(gameEngine, 0, 0));
            gameEngine.addEntity(new bg2(gameEngine, 1620, 0));
            gameEngine.addEntity(new bg2(gameEngine, 3240, 0));
        } else if (level == 2) {

        }

    }

    update() {
        let midpoint = PARAMS.CANVAS_WIDTH / 2;
        if (this.x < this.Zero.x - midpoint) this.x = this.Zero.x - midpoint;
        if (this.x > this.Zero.x - midpoint/2 && this.Zero.x - midpoint/2 > 0) this.x = this.Zero.x - midpoint/2;
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


