class bg1 {
    constructor(game, x) {
        this.game = game;
        this.x = x;
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/bg1.png"), this.x - this.game.camera.x, 355);
    }
}
class bg2 {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.sky = new Animator(ASSET_MANAGER.getAsset("./Sprites/bg2.png"), 0, 0, 741, 190, 1, 0.2, false, true, false);
    }

    update() {

    }

    draw(ctx) {
        this.sky.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.2);
    }
}

class bg3 {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.sky = new Animator(ASSET_MANAGER.getAsset("./Sprites/bg3.png"), 0, 0, 980, 350, 1, 0.2, false, true, false);
    }

    update() {

    }

    draw(ctx) {
        this.sky.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1.85);
    }
}

class bg0 {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.BG = new Animator(ASSET_MANAGER.getAsset("./Sprites/bg0.png"), 0, 0, 670, 360, 1, 0.2, false, true, false);
    }

    update() {

    }

    draw(ctx) {
        //ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/bg2.png"), this.x - this.game.camera.x, 0);
        this.BG.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2.27);
    }
}