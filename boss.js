class boss {
    constructor(game, x, y) {

        this.game = game;
        this.states = { idle: 0, walk: 1, run: 2, attack: 3, cast: 5, jump: 6, hurt: 7, eat: 8, dead: 9};
        this.facings = { right: 0, left: 1 };
        this.state = this.states.idle;
        this.facing = this.facings.left;
        this.hitCount = 0; // take up to 10 hits
        this.dead = false;
        this.canAttack = false;
        this.attackCD = 0;
        this.canDamage = true;
        this.damagedCD = 0;
        this.canJump = true;
        this.jumpCD = 0;
        this.canEat = false;
        this.isEating = false;
        this.attackCount = 0;
        this.bulletSpeed = 350;

        this.x = x;
        this.y = y;

        this.scale = 1.25;
        this.BBW = 25 * this.scale;
        this.BBH = 65 * this.scale;

        this.speed = 0;

        this.playerInSight = false;

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

        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Idle.png"), 0, 0, 128, 128, 9, 0.15, false, true, false);
        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Idle.png"), 0, 0, 128, 128, 9, 0.15, true, true, false);

        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Walk.png"), 0, 0, 128, 128, 8, 0.15, false, true, false);
        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Walk.png"), 0, 0, 128, 128, 8, 0.15, true, true, false);

        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Run.png"), 0, 0, 128, 128, 8, 0.15, false, true, false);
        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Run.png"), 0, 0, 128, 128, 8, 0.15, true, true, false);

        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Attack_1.png"), 3, 0, 128, 128, 6, 0.15, false, false, false);
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Attack_1.png"), 3, 0, 128, 128, 6, 0.15, true, false, false);

        this.animations[4][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Attack_2.png"), 0, 0, 128, 128, 6, 0.15, false, false, false);
        this.animations[4][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Attack_2.png"), 0, 0, 128, 128, 6, 0.15, true, false, false);

        this.animations[5][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Cast.png"), 0, 0, 128, 128, 6, 0.125, false, false, false);
        this.animations[5][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Cast.png"), 0, 0, 128, 128, 6, 0.125, true, false, false);

        this.animations[6][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Jump.png"), 0, 0, 128, 128, 10, 0.15, false, false, false);
        this.animations[6][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Jump.png"), 0, 0, 128, 128, 10, 0.15, true, false, false);

        this.animations[7][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Hurt.png"), 0, 0, 128, 128, 2, 0.2, false, false, false);
        this.animations[7][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Hurt.png"), 0, 0, 128, 128, 2, 0.2, true, false, false);

        this.animations[8][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Eating.png"), 0, 0, 128, 128, 5, 0.3, false, false, false);
        this.animations[8][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Eating.png"), 0, 0, 128, 128, 5, 0.3, true, false, false);

        this.animations[9][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Dead.png"), 0, 0, 128, 128, 5, 0.3, false, false, false);
        this.animations[9][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Dead.png"), 0, 0, 128, 128, 5, 0.3, true, false, false);
    };

    update() {

        if (this.hitCount == 10) {
            this.dead = true;
            this.state = 9;
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
                        if (!self.AR.collide(entity.BB) && self.state != self.states.attack) {
                            // move towards the knightd
                            self.state = self.states.run;
                            self.facing = entity.BB.right < self.BB.left ? self.facings.left : self.facings.right;
                            self.speed = self.facing == self.facings.right ? self.speed = -100 * params.NPCSpeed : self.speed = 100 * params.NPCSpeed;
                        }
                    }

                    // if player in attack range
                    if (self.canAttack && entity.BB && self.AR.collide(entity.BB)) {
                        self.speed = 0;
                        self.canAttack = false;
                        self.state = self.states.attack;
                        self.attackCount += 1;
                    }
                    if (self.canDamage && entity.BB && self.BB.collide(entity.BB)) {
                        if (self.isEating) {
                            self.speed = 0;
                            self.state = self.states.hurt;
                            self.canDamage = false
                            self.hitCount = 5;
                        } else {
                            self.speed = 0;
                            self.state = self.states.hurt;
                            self.canDamage = false;
                            self.hitCount += 1;
                        }
                    }
                }
            });

            // cast a spine after 2 attack
            if (this.attackCount == 3) {
                this.speed = 0;
                this.state = this.states.cast;
                if (this.animations[this.states.cast][this.facing].isDone()) {
                    if (this.facing == this.facings.left) {
                        console.log("left");
                        this.game.addEntityToFrontOfList(new bullet(gameEngine, this.x, this.y + 85, 2, this.bulletSpeed, 3));
                        this.attackCount = 0;
                    } else {
                        console.log("right");
                        this.game.addEntityToFrontOfList(new bullet(gameEngine, this.x, this.y + 85, 3, this.bulletSpeed, 3));
                        this.attackCount = 0;
                    }
                }
                
            }

            // eat phase
            if (this.hitCount > 5 && this.canJump) {
                this.state = this.states.jump;
                if (this.facing == this.facings.left) {
                    this.speed = 200;
                } else {
                    this.speed = -200;
                }
                this.canJump = false;
                this.canEat = true;
            }
            if (this.canEat && this.animations[this.states.jump][this.facing].isDone()) {
                this.canEat = false;
                this.state = this.states.eat;
                this.isEating = true;
                this.hitCount = 10;
            }
            if (this.isEating && this.animations[this.states.eat][this.facing].isDone()) {
                this.isEating = false;
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
            this.AB = new BoundingBox(this.BB.left - (this.BB.width * 2) - 10, this.BB.top - 30, (this.BB.width * 4) + 10, this.BB.height + 30);
        } else {
            this.AB = new BoundingBox(this.BB.left - 10, this.BB.top - 30, (this.BB.width * 4) + 10, this.BB.height + 30);
        }
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 37, this.y + 79, this.BBW, this.BBH);
        this.DB = new BoundingBox(this.BB.left - 1000, this.BB.top - (this.BB.height * 1.5), 2000, this.BB.height * 2.5);
        if (this.facing == 1) {
            this.AR = new BoundingBox(this.BB.left - (this.BB.width * 2) - 10, this.BB.top - 30, (this.BB.width * 3) + 10, this.BB.height + 30);
        } else {
            this.AR = new BoundingBox(this.BB.left + this.BB.width - 10, this.BB.top - 30, (this.BB.width * 3) + 10, this.BB.height + 30);
        }
    };

    checkCD(TICK) {

        if (!this.canAttack) {
            this.attackCD += TICK * params.NPCSpeed;
            if (this.attackCD >= 1.5) {
                this.animations[this.states.attack][this.facings.left].elapsedTime = 0;
                this.animations[this.states.attack][this.facings.right].elapsedTime = 0;
                this.animations[this.states.cast][this.facings.left].elapsedTime = 0;
                this.animations[this.states.cast][this.facings.right].elapsedTime = 0;
                this.attackCD = 0;
                this.canAttack = true;
            }
        }

        if (!this.canDamage) {
            this.damagedCD += TICK * params.NPCSpeed;
            if (this.damagedCD >= 1.5) {
                this.animations[this.states.hurt][this.facings.left].elapsedTime = 0;
                this.animations[this.states.hurt][this.facings.right].elapsedTime = 0;
                this.canDamage = true;
            }
        }
        
        if (!this.canJump) {
            this.jumpCD += TICK * params.NPCSpeed;
            if (this.jumpCD >= 30) {
                this.animations[this.states.jump][this.facings.left].elapsedTime = 0;
                this.animations[this.states.jump][this.facings.right].elapsedTime = 0;
                this.animations[this.states.eat][this.facings.left].elapsedTime = 0;
                this.animations[this.states.eat][this.facings.right].elapsedTime = 0;
                this.canJump = true;
            }
        }
    };

    draw(ctx) {
        ctx.strokeStyle = "Green";
        ctx.strokeRect(this.BB.left - 1000 - this.game.camera.x, this.BB.top - (this.BB.height * 1.5), 2000, this.BB.height * 2.5);
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
    };
}