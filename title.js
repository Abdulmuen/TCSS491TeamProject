class Startscreen {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.game.starting = true;
        this.x = 0;
        this.Zero = new Zero(this.game, PARAMS.CANVAS_WIDTH / 2, 400);
        this.game.addEntity(this.Zero);
        gameEngine.addEntity(new gr1(gameEngine, (PARAMS.CANVAS_WIDTH / 2) - 250, 545));
        this.a = true;
        //this.addTitle(1 * PARAMS.BLOCKWIDTH, 2.45 * PARAMS.BLOCKWIDTH);
    };

    addTitle(x, y) {
        this.x = 0;
        this.Zero.x = x;
        this.Zero.y = y;
        this.game.addEntity(this.Zero);
    }

    update() {
        if (this.game.keys["Enter"]) {
            this.game.starting = false;
            this.game.addEntity(new SceneManager(this.game, 1))
        }
    };

    draw(ctx) {
        if (this.game.starting == true) {
            ctx.font = "50px Arial";
            ctx.fillStyle = 'White';
            ctx.textAlign = 'center';
            ctx.fillText("Press Enter to Start", PARAMS.CANVAS_WIDTH / 2, 250);
        }
        if (this.a) {
            gameEngine.addEntity(new bg0(gameEngine, -180, 0));
            this.a = false
        }
    };
}
