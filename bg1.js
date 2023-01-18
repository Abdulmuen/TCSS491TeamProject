class bg1 {
    constructor(game){
        this.animator = new Animator(ASSET_MANAGER.getAsset("./Sprites/bg1.png"), 0, 0,675,300,4,0.1);
    }

    update() {

    }

    draw(ctx) {

        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/bg1.png"), 0, 0);
    }
}