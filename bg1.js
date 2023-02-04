class bg1 {
    constructor(game){
        this.game = game;
    }

    update() {

    }

    draw(ctx) {

        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/bg1.png"), 0 - this.game.camera.x, 0);
    }
}