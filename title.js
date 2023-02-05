class Startscreen {
    constructor(game) {
        this.game = game;
        this.game.starting = true;
       
};

update() {
    if (this.game.keys["Enter"]) {
        this.game.starting = false;
        this.game.addEntity(new SceneManager(this.game))
    }
};

draw(ctx) {
    if (this.game.starting == true) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 9999, 9999);
        ctx.font = "50px Arial";
        ctx.fillStyle = 'White';
        ctx.textAlign = 'center';
        ctx.fillText("Press Enter to Start", PARAMS.CANVAS_WIDTH/2, PARAMS.CANVAS_WIDTH/2);
    }
};
}
