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

class background_1 {
    constructor(game) {
        this.game = game;
        this.animations = [];

        this.loadAnimattion();
    }

    loadAnimattion() {
        let num = 10
        for (var i = 0; i < num; i++) {
            this.animations.push([]);
        }
        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./background/back_1.png"), 0, 0, 256, 192, 1, 1, false, true, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./background/mid_2.png"), 0, 0, 256, 272, 1, 1, false, true, false);
        this.animations[2] = new Animator(ASSET_MANAGER.getAsset("./background/first_1.png"), 0, 0, 688, 272, 1, 1, false, true, false);
    }

    update() {

    }

    draw(ctx) {
        for (let i = 0; i < 10; i++) {
            this.animations[0].drawFrame(this.game.clockTick, ctx, (256 * 2.15 * i) - this.game.camera.x, 0, 2.15);     
        }
        for (let i = 0; i < 10; i++) {
            this.animations[1].drawFrame(this.game.clockTick, ctx, (256 * 2.15 * i) - this.game.camera.x, 100, 2.15);    
        }
        for (let i = 0; i < 10; i++) {
            this.animations[2].drawFrame(this.game.clockTick, ctx, (688 * 2.15 * i) - this.game.camera.x, 100, 2.15);     
        }
    }
}

class background_2 {
    constructor(game) {
        this.game = game;
        this.animations = [];

        this.loadAnimattion();
    }

    loadAnimattion() {
        let num = 10
        for (var i = 0; i < num; i++) {
            this.animations.push([]);
        }
        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./background/back_3.png"), 0, 0, 128, 240, 1, 1, false, true, false);
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./background/mid_3.png"), 0, 0, 144, 124, 1, 1, false, true, false);
        this.animations[2] = new Animator(ASSET_MANAGER.getAsset("./background/first_3.png"), 0, 0, 493, 209, 1, 1, false, true, false);
    }

    update() {

    }

    draw(ctx) {
        for (let i = 0; i < 13; i++) {
            this.animations[0].drawFrame(this.game.clockTick, ctx, (128 * 3.1 * i) - this.game.camera.x, 0, 3.1);     
        }
        for (let i = 0; i < 13; i++) {
            this.animations[1].drawFrame(this.game.clockTick, ctx, (144 * 3 * i) - this.game.camera.x, 400, 3);    
        }
        for (let i = 0; i < 10; i++) {
            this.animations[2].drawFrame(this.game.clockTick, ctx, (493 * 3 * i) - this.game.camera.x, 150, 3);     
        }
    }
}