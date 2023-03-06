class door {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.door = new Animator(ASSET_MANAGER.getAsset("./Sprites/portal.png"), 0, 0, 250, 500, 4, 0.2, false, true, false);
        this.BB = new BoundingBox(this.x, this.y, 50, 100);
    }

    update() {

    }

    draw(ctx) {
        this.door.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 0.20);
        /*
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        */
    }
}