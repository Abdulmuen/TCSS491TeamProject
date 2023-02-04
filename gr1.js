class gr1 {
    constructor(game){
        this.game = game;
        this.bb = new BoundingBox(0,350,2700,400);
    }

    update() {

    }

    draw(ctx) {

        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/gr1.png"), 0 - this.game.camera.x, 350);
    }
}