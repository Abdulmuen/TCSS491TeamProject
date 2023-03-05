class Replay {
    constructor(game, check) {
        Object.assign(this, { game });
        this.check = check;
        this.game = game;
        this.x = 0;
        this.game.camera = this;
        this.Zero1 = new Zero(this.game, 1 * PARAMS.BLOCKWIDTH, 550);
        this.loadEnd();
        ASSET_MANAGER.pauseBackgroundMusic();
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loadEnd() {
        this.gameOver = new Animator(ASSET_MANAGER.getAsset("./Sprites/go1.png"), 0, 0, 1200, 1200, 1, 1, false, true, false);
        this.gameWin = new Animator(ASSET_MANAGER.getAsset("./Sprites/win.png"), 0, 0, 280, 200, 1, 1, false, true, false);
    }

    update() {
        if (this.game.keys["r"]) {
            this.removeFromWorld = true;
            this.clearEntities();
            this.game.addEntity(new SceneManager(this.game));
        }
        if (this.game.keys["x"]) {
            this.removeFromWorld = true;
            this.clearEntities();
            this.game.addEntity(new SceneManager(this.game));
        }
    };

    draw(ctx) {
        if (this.check == 0) {
            this.gameOver.drawFrame(this.game.clockTick, ctx, 315, 25, 0.5);
            //ctx.font = "50px Arial";
            //ctx.fillStyle = 'Red';
            //ctx.textAlign = 'center';
            //ctx.fillText("Press X to Restart", 448, 274);
        }
        else if (this.check == 1) {
            this.gameWin.drawFrame(this.game.clockTick, ctx, 315, 25, 2);
            ctx.font = "50px Arial";
            ctx.fillStyle = 'Red';
            ctx.textAlign = 'center';
            ctx.fillText("You Win! Press R to play again", 568, 514);
        }
    };
}
