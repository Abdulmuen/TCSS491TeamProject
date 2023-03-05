class door {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.door = new Animator(ASSET_MANAGER.getAsset("./Sprites/door.png"), 0, 0, 36, 51, 1, 0.3, false, true, false);
        this.BB = new BoundingBox(this.x, this.y, 50, 73);
    }

    update() {

    }

    draw(ctx) {
        this.door.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.5);
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }
}