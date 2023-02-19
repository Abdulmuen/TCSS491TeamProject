class Replay {
    constructor(game, check) {
        Object.assign(this, { game });
        this.check = check;
        this.game = game;
        this.x = 0;
        this.game.camera = this;
        this.Zero1 = new Zero(this.game, 1 * PARAMS.BLOCKWIDTH, 560);
        this.loadEnd();
    };
    
    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loadEnd() {
        this.gameOver = new Animator(ASSET_MANAGER.getAsset("./Sprites/go1.png"), 0, 0, 1200, 1200, 1, 1, false, true, false);
    }

    update() {
        if (this.game.keys["r"]) {
            this.removeFromWorld = true;
            this.game.addEntity(new SceneManager(this.game));
        }
    };

    draw(ctx) {
        if (this.check == 0) {
            this.gameOver.drawFrame(this.game.clockTick, ctx, 0, 0, 1);
            ctx.font = "50px Arial";
            ctx.fillStyle = 'Red';
            ctx.textAlign = 'center';
            ctx.fillText("Press R to Restart", 448, 274);
        }
        else if (this.check == 1) {
            ctx.font = "50px Arial";
            ctx.fillStyle = 'Red';
            ctx.textAlign = 'center';
            ctx.fillText("You Win! Press R to play again", 448, 274);
        }
        else if (this.check == 2) {
            this.boss();
        }
    };

    boss() {
        this.clearEntities();
        this.game.addEntity(this.Zero1);
        gameEngine.addEntity(new gr1(gameEngine, 0, 650));
        gameEngine.addEntity(new gr1(gameEngine, -310, 510));
        gameEngine.addEntity(new gr1(gameEngine, 810, 510));
        gameEngine.addEntity(new gr1(gameEngine, 500 * 1, 650));
        gameEngine.addEntity(new boss(gameEngine, 800, 490));
        gameEngine.addEntity(new bg3(gameEngine, 0, 0));
    }
}
