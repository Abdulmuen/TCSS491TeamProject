class Startscreen {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.game.starting = true;
        this.x = 0;
        this.a = true;
        this.Zero = new Zero(this.game, PARAMS.CANVAS_WIDTH / 2, 445);
        this.game.addEntity(this.Zero);
        gameEngine.addEntity(new gr1(gameEngine, 0, 545, 100));
        this.title = new Animator(ASSET_MANAGER.getAsset("./Sprites/t.png"), 0, 0, 340, 134, 1, 1, false, true, false);
    };



    update() {
        if (this.game.keys["Enter"]) {
            this.game.starting = false;
            this.game.addEntity(new SceneManager(this.game, 1))
        }
        if (this.Zero.x >= 1200) {
            this.Zero.x = 1200;
        }
    };

    draw(ctx) {
        this.title.drawFrame(this.game.clockTick, ctx, 300, 150, 2);
        if (this.game.starting == true) {
            ctx.font = "50px Arial";
            ctx.fillStyle = 'White';
            ctx.textAlign = 'center';
            ctx.fillText("Press Enter to Start", PARAMS.CANVAS_WIDTH / 2, 650);
        }
        if (this.a) {
            gameEngine.addEntity(new bg0(gameEngine, -180, 0));
            this.a = false;
        }
    };
}
