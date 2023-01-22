class Camera {
    constructor(game){
        this.x = 0;
        this.game = game;
        //this.animator = new Animator(ASSET_MANAGER.getAsset("./Sprites/bg1.png"), 0, 0,675,300,4,0.1);
    }

    update() {
        let midpoint = PARAMS.CANVAS_WIDTH/2 - PARAMS.BLOCKWIDTH / 2;

        this.x = Zero.x - midpoint;

    }

    draw(ctx) {

        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/bg1.png"), 0, 0);
    }
}