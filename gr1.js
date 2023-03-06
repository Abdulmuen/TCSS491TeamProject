class gr1 {
    constructor(game, x, y, length) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.length = length;
        this.BB = new BoundingBox(this.x, this.y, this.length * 50, 32);
        this.start = new BoundingBox(this.x - 90, this.y - 20, 20, 30);
        this.end = new BoundingBox(this.x + (this.length * 50) + 70, this.y - 20, 20, 30);
        
    }

    update() {
    }

    draw(ctx) {
        
        for (let i = 0; i < this.length; i++) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/gr2.png"), (this.x + (50 * i)) - this.game.camera.x, this.y, 50, 32);
        }
        /*
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.start.x - this.game.camera.x, this.start.y, this.start.width, this.start.height);
        ctx.strokeRect(this.end.x - this.game.camera.x, this.end.y, this.end.width, this.end.height);
        */
        
    }
}