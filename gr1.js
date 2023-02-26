class gr1 {
    constructor(game, x, y, length) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.length = length
        this.BB = new BoundingBox(this.x, this.y, this.length * 50, 32);
        
    }

    update() {

    }

    draw(ctx) {
        for (let i = 0; i < this.length; i++) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/gr2.png"), (this.x + (50 * i)) - this.game.camera.x, this.y, 50, 32);
        }
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }
}

class gr2 {
    constructor(game, x, y, width) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width
        this.BB = new BoundingBox(this.x, this.y, this.width, 40);
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/gr2.png"), this.x - this.game.camera.x, this.y);
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    }
}