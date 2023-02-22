class gangster {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 0;

        this.scale = 2;
        this.width = 25;
        this.height = 36;

        this.states = { idle: 0, run: 1, attack: 2, dead: 3 };
        this.state = this.states.idle;
        this.facings = { right: 0, left: 1 };
        this.facing = this.facings.left;

        this.canAttack = true;
        this.attackCD = 0;

        this.dead = false;

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
        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset("./gangster/idle.png"), 0, 0, 55, 42, 2, 0.5, false, true, false);
        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset("./gangster/idle.png"), 0, 0, 55, 42, 2, 0.5, true, true, false);
        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./gangster/run.png"), 0, 0, 40, 42, 10, 0.2, false, true, false);
        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./gangster/run.png"), 0, 0, 40, 42, 10, 0.2, true, true, false);
        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset("./gangster/attack.png"), 0, 0, 55, 42, 8, 0.15, false, false, false);
        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset("./gangster/attack.png"), 0, 0, 55, 42, 8, 0.15, true, false, false);
        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./gangster/dead.png"), 0, 0, 57, 42, 9, 0.15, false, false, false);
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./gangster/dead.png"), 0, 0, 57, 42, 9, 0.15, true, false, false);
    };

    update() {
        if (this.dead) {
            this.state = this.states.dead;
        } else {
            const TICK = this.game.clockTick;
            this.x -= this.speed * TICK * params.NPCSpeed;
            this.updateBB();

            this.playerInSight = false;

            let self = this;
            this.game.entities.forEach(function (entity) {
                if (entity instanceof Zero) {
                    // if player in sight
                    self.playerInSight = self.DB.collide(entity.BB);
                    if (self.playerInSight) {
                        if (!self.AR.collide(entity.BB) && self.state != self.states.attack && self.state != self.states.cast) {
                            // move towards the knightd
                            self.state = self.states.run;
                            self.facing = entity.BB.right < self.BB.left ? self.facings.left : self.facings.right;
                            self.speed = self.facing == self.facings.right ? self.speed = -100 * params.NPCSpeed : self.speed = 100 * params.NPCSpeed;
                        }
                    }

                    // if player in attack range
                    if (self.canAttack && !self.isCasting && entity.BB && self.AR.collide(entity.BB)) {
                        self.speed = 0;
                        self.state = self.states.attack;
                        self.canAttack = false;
                    }

                    // if collide with player hitbox
                    if (entity.AB && self.BB.collide(entity.AB)) {
                        self.dead = true;
                    }
                }
            });

            if (this.state == this.states.attack) {
                this.attackFrame = this.animations[this.state][this.facing].currentFrame();
                if (this.attackFrame == 6 || this.attackFrame == 7) {
                    this.updateAB();
                } else {
                    this.AB = null;
                }
            } else {
                this.AB = null;
            }

            // reset to idle state
            if (this.animations[this.state][this.facing].isDone()) {
                this.speed = 0;
                this.state = this.states.idle;
            }
            this.checkCD(TICK);
        }
    };

    updateAB() {
        if (this.facing == 1) {
            this.AB = new BoundingBox(this.BB.left - (18 * this.scale), this.BB.top, this.BB.width, this.BB.height);
        } else {
            this.AB = new BoundingBox(this.BB.left + this.BB.width + (12 * this.scale), this.BB.top, this.BB.width, this.BB.height);
        }
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x - (((this.width * this.scale) - 22) / 2), this.y + (6 * this.scale), (this.width * this.scale), (this.height * this.scale));
        this.DB = new BoundingBox(this.BB.left - 400, this.BB.top - (200 - this.BB.height), 800, 200);
        if (this.facing == 1) {
            this.AR = new BoundingBox(this.BB.left - (18 * this.scale), this.BB.top, this.BB.width, this.BB.height);
        } else {
            this.AR = new BoundingBox(this.BB.left + this.BB.width + (12 * this.scale), this.BB.top, this.BB.width, this.BB.height);
        }
    };

    checkCD(TICK) {
        if (!this.canAttack) {
            this.attackCD += TICK * params.NPCSpeed;
            if (this.attackCD >= 1.5) {
                this.animations[this.states.attack][this.facings.left].elapsedTime = 0;
                this.animations[this.states.attack][this.facings.right].elapsedTime = 0;
                this.attackCD = 0;
                this.canAttack = true;
            }
        }
    };

    draw(ctx) {
        /*
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.AR.x - this.game.camera.x, this.AR.y, this.AR.width, this.AR.height);
        ctx.strokeStyle = 'green';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.DB.x - this.game.camera.x, this.DB.y, this.DB.width, this.DB.height);
        */
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
    };
}
