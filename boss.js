class boss {
    constructor(game, x, y) {

        this.game = game;
        this.state = 0; // 0 = idle, 1 = walk, 2 = run, 3 = attack_1, 4 = attack_2, 5=  cast, 6 = jump, 7 = hurt, 8 = eat, 9 = dead
        this.facing = 1; // 0 = right, 1 = left
        this.hitCount = 0; // take up to 10 hits
        this.dead = false;

        this.x = 1400;
        this.y = 177.5;

        this.scale = 1.25;
        this.BBW = 25 * this.scale;
        this.BBH = 65 * this.scale;

        this.speed = 0;



        this.updateBB();

        this.animations = []; // [state][facing]
        this.loadAnimations();
    };

    loadAnimations() {

        let numFacing = 2;
        let numState = 10;
        for (var i = 0; i < numState; i++) {
            this.animations.push([]);
            for (var j = 0; j < numFacing; j++) {
                this.animations[i].push([]);
            }
        }

        this.animations[0][0] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Idle.png"), 0, 0, 128, 128, 9, 0.15, false, true);
        this.animations[0][1] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Idle.png"), 0, 0, 128, 128, 9, 0.15, true, true);

        this.animations[1][0] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Walk.png"), 0, 0, 128, 128, 8, 0.15, false, true);
        this.animations[1][1] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Walk.png"), 0, 0, 128, 128, 8, 0.15, true, true);

        this.animations[2][0] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Run.png"), 0, 0, 128, 128, 8, 0.15, false, true);
        this.animations[2][1] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Run.png"), 0, 0, 128, 128, 8, 0.15, true, true);

        this.animations[3][0] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Attack_1.png"), 3, 0, 128, 128, 6, 0.15, false, false);
        this.animations[3][1] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Attack_1.png"), 3, 0, 128, 128, 6, 0.15, true, false);

        this.animations[4][0] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Attack_2.png"), 0, 0, 128, 128, 6, 0.15, false, false);
        this.animations[4][1] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Attack_2.png"), 0, 0, 128, 128, 6, 0.15, true, false);

        this.animations[5][0] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Cast.png"), 0, 0, 128, 128, 6, 0.15, false, false);
        this.animations[5][1] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Cast.png"), 0, 0, 128, 128, 6, 0.15, true, false);

        this.animations[6][0] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Jump.png"), 0, 0, 128, 128, 10, 0.15, false, false);
        this.animations[6][1] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Jump.png"), 0, 0, 128, 128, 10, 0.15, true, false);

        this.animations[7][0] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Hurt.png"), 0, 0, 128, 128, 2, 0.2, false, false);
        this.animations[7][1] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Hurt.png"), 0, 0, 128, 128, 2, 0.2, true, false);

        this.animations[8][0] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Eating.png"), 0, 0, 128, 128, 5, 0.3, false, false);
        this.animations[8][1] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Eating.png"), 0, 0, 128, 128, 5, 0.3, true, false);

        this.animations[9][0] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Dead.png"), 0, 0, 128, 128, 5, 0.3, false, false);
        this.animations[9][1] = new animator(ASSET_MANAGER.getAsset("./Kunoichi/Dead.png"), 0, 0, 128, 128, 5, 0.3, true, false);
    };

    update() {
        const TICK = this.game.clockTick;

        this.x -= this.speed * TICK;
        this.updateBB();

        let self = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Zero) {
                if (entity.BB && self.AR.collide(entity.BB)) {
                    self.speed = 0;
                    self.state = 3;
                }
            }
            if (self.animations[self.state][self.facing].isDone()) {
                self.animations[self.state][self.facing].reset();
                self.state = 4;
                if (self.animations[self.state][self.facing].isDone()) {
                    self.state = 0;
                    console.log("test");
                }
            }
        });
    };

    updateAB() {
        if (this.facing == 1) {
            this.AB = new boundingBox(this.BB.left - (this.BB.width * 2) - 10, this.BB.top - 30, (this.BB.width * 4) + 10, this.BB.height + 30);
        } else {
            this.AB = new boundingBox(this.BB.left - 10, this.BB.top - 30, (this.BB.width * 4) + 10, this.BB.height + 30);
        }
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new boundingBox(this.x + 37, this.y + 79, this.BBW, this.BBH);
        if (this.facing == 1) {
            this.AR = new boundingBox(this.BB.left - (this.BB.width * 2) - 10, this.BB.top - 30, (this.BB.width * 3) + 10, this.BB.height + 30);
        } else {
            this.AR = new boundingBox(this.BB.left + this.BB.width - 10, this.BB.top - 30, (this.BB.width * 3) + 10, this.BB.height + 30);
        }
    };

    draw(ctx) {
        if (this.dead) {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        } else {
            ctx.strokeStyle = "Green";
            ctx.strokeRect(this.x + 37, this.y + 79, this.BBW, this.BBH);
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        }
    };
}