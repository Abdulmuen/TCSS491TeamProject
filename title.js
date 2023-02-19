class Startscreen {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.game.starting = true;
        this.x = 0;
        this.Zero = new Zero(this.game, 1 * PARAMS.BLOCKWIDTH, 410);
        this.game.addEntity(this.Zero);
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
        this.game.addEntity(new SceneManager(this.game))
    }

};

draw(ctx) {
    if (this.game.starting == true) {
        //ctx.fillStyle = "black";
        //ctx.fillRect(0, 0, 9999, 9999);
        ctx.font = "50px Arial";
        ctx.fillStyle = 'White';
        ctx.textAlign = 'center';
        ctx.fillText("Press Enter to Start", PARAMS.CANVAS_WIDTH/2, 250);
        gameEngine.addEntity(new bg0(gameEngine, -180,50));
    }
};
}
