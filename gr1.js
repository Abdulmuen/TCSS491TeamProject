class gr1 {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.BB = new BoundingBox(this.x, this.y, 500, 40);
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/gr2.png"), this.x - this.game.camera.x, this.y);
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class gr2 {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.BB = new BoundingBox(this.x, this.y - 10, 40, 50);
    }

    update() {

    }

    draw(ctx) {
        ctx.strokeStyle = "blue";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }
}