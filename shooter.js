class shooter {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.leftRange = this.x - 100;
        this.rightRange = this.x + 100;
        this.speed = 55;
        this.fireRate = 2.1;
        this.elapsedTime = 4;
        this.bulletSpeed = 350;
        this.shot = false;
        this.die = false;
        this.hitCount = 0;
        this.inAR = false;

        this.scale = 1.25;
        this.BBW = 25 * this.scale;
        this.BBH = 65 * this.scale;
        this.newy = y;
        this.newx = x;
        this.directions = { left: 0, right: 1 };
        this.direction = this.directions.right;
        this.state = 0;
        this.removeFromWorld = false;
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    };

    loadAnimations() {

        let numFacing = 2;
        let numState = 4;
        for (var i = 0; i < numState; i++) {
            this.animations.push([]);
            for (var j = 0; j < numFacing; j++) {
                this.animations[i].push([]);
            }
        }
        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset("./shooter/WR.png"), 0, 0, 34, 40, 8, 0.1, false, true, false);//walk right
        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset("./shooter/WR.png"), 0, 0, 34, 40, 8, 0.1, true, true, false);//walk left

        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./shooter/shooting.png"), 0, 0, 45, 41, 1, 0.1, false, true, false);//shoot right
        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./shooter/shooting.png"), 0, 0, 45, 41, 1, 0.1, true, true, false);//shoot left

        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset("./shooter/dead.png"), 0, 0, 44, 32, 12, 0.1, false, false, false);//dead right
        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset("./shooter/dead.png"), 0, 0, 44, 32, 12, 0.1, true, false, false);//dead left

        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./shooter/turn.png"), 0, 0, 48, 42, 6, 0.1, true, false, false);//dead right
        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./shooter/turn.png"), 0, 0, 48, 42, 6, 0.1, false, false, false);//dead left
    };

    turn(direction) {
        if (direction != this.direction) {
            this.state = 3;
            this.shot = false;
        }
    }

    update() {

        const TICK = this.game.clockTick;
        this.elapsedTime += TICK;

        if (this.x <= this.leftRange) {
            this.state = 0
            this.direction = 1;
            this.speed = 65;
        } else if (this.x > this.rightRange) {
            this.state = 0;
            this.direction = 0;
            this.speed = -65;
        }

        if (this.animations[3][this.direction].isDone()) {
            if (this.direction == 1) {
                this.direction = 0;
            } else {
                this.direction = 1;
            }
            this.animations[3][1].elapsedTime = 0;
            this.animations[3][0].elapsedTime = 0;
            this.state = 1;
            this.shot = true;
        }

        this.x += this.speed * TICK * params.NPCSpeed;
        this.updateBB();

        let self = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof Zero) {
                self.playerInSight = self.DB.collide(entity.BB);
                if (self.playerInSight) {
                    if (!self.AR.collide(entity.BB) && self.inAR) {
                        self.turn(entity.BB.right < self.BB.left ? 0 : 1);
                    }
                }

                // if player in attack range
                if (entity.BB && self.AR.collide(entity.BB)) {
                    self.inAR = true;
                    if (self.direction == 0) {
                        self.speed = 0;
                        self.state = 1;
                        self.y = self.newy + 6;

                        setTimeout(() => {
                            self.shot = true;
                        }, 1500);
                    }
                    else {
                        self.speed = 0;
                        self.state = 1;
                        self.y = self.newy + 6;
                        setTimeout(() => {
                            self.shot = true;
                        }, 1500);
                    }
                }

                if (entity.AB && self.HB.collide(entity.AB)) {
                    self.shot = false;
                    self.die = true;
                }
            }
        });

        if (this.shot && this.direction == 1) {
            if (this.elapsedTime >= this.fireRate) {
                //ASSET_MANAGER.playAsset("./sound/shoot.wav")
                this.game.addEntityToFrontOfList(new bullet(gameEngine, this.x + 5, this.y, 0, this.bulletSpeed, 0.4));
                this.elapsedTime = 0;
            }
        }
        else if (this.shot && this.direction == 0) {
            if (this.elapsedTime >= this.fireRate) {
                //ASSET_MANAGER.playAsset("./sound/shoot.wav")
                this.game.addEntityToFrontOfList(new bullet(gameEngine, this.x - 200, this.y + 5, 1, this.bulletSpeed, 0.4));
                this.elapsedTime = 0;
            }
        }

        if (this.die) {
            this.shot = false;
            this.state = 2;
            //this.direction = 0;
            if (this.animations[this.state][this.direction].isDone()) {
                this.removeFromWorld = true;
            }
        }
    };

    draw(ctx) {
        const TICK = this.game.clockTick;
        this.offset = this.direction == 0 ? 48:0;
        this.offset_1 = this.direction == 0 ? 0:45;
        if (this.state == 3) {
            this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.offset, this.y - 13, 2.2);
        } else {
            this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - this.offset_1, this.y, 2.2);
        }
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.AR.x - this.game.camera.x, this.AR.y, this.AR.width, this.AR.height);
        ctx.strokeStyle = "White";
        ctx.strokeRect(this.DB.x - this.game.camera.x, this.DB.y, this.DB.width, this.DB.height);
        ctx.strokeStyle = "Grenn";
        ctx.strokeRect(this.HB.x - this.game.camera.x, this.HB.y, this.HB.width, this.HB.height);

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 10, this.y, this.BBW, this.BBH);
        if (this.direction == 1) {
            this.HB = new BoundingBox(this.BB.x - 35, this.BB.y, (this.BB.width * 1.6), this.BB.height);
            this.DB = new BoundingBox(this.BB.x - 355, this.BB.y - this.BB.height, (this.BB.width * 23.5), (this.BB.height * 2));
            this.AR = new BoundingBox(this.BB.x - 35, this.BB.y, (this.BB.width * 13.2), this.BB.height);
        } else {
            this.HB = new BoundingBox(this.BB.x - 30, this.BB.y, (this.BB.width * 1.6), this.BB.height);
            this.DB = new BoundingBox(this.BB.x - 395, this.BB.y - this.BB.height, (this.BB.width * 23.5), (this.BB.height * 2));
            this.AR = new BoundingBox(this.BB.x - 395, this.BB.y, (this.BB.width * 13.2), this.BB.height);
        }
    };
}