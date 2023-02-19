class boss {
    constructor(game, x, y) {

        this.game = game;
        this.states = { idle: 0, walk: 1, run: 2, attack_1: 3, attack_2: 4, cast: 5, jump: 6, hurt: 7, eat: 8, dead: 9 };
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
        this.spineSpeed = 350;
        this.castCD = 0;
        this.canCast = true;
        this.isAttacking = false;
        this.isCasting = false;
        this.spineGen = true;

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

        this.animations[3][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Attack_1.png"), 3, 0, 128, 128, 6, 0.11, false, false, false);
        this.animations[3][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Attack_1.png"), 3, 0, 128, 128, 6, 0.11, true, false, false);

        this.animations[4][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Attack_2.png"), 0, 0, 128, 128, 8, 0.09, false, false, false);
        this.animations[4][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Attack_2.png"), 0, 0, 128, 128, 8, 0.09, true, false, false);

        this.animations[5][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Cast.png"), 0, 0, 128, 128, 6, 0.125, false, false, false);
        this.animations[5][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Cast.png"), 0, 0, 128, 128, 6, 0.125, true, false, false);

        this.animations[6][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Jump.png"), 0, 0, 128, 128, 10, 0.15, false, false, false);
        this.animations[6][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Jump.png"), 0, 0, 128, 128, 10, 0.15, true, false, false);

        this.animations[7][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Hurt.png"), 0, 0, 128, 128, 2, 0.2, false, false, false);
        this.animations[7][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Hurt.png"), 0, 0, 128, 128, 2, 0.2, true, false, false);

        this.animations[8][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Eating.png"), 0, 0, 128, 128, 9, 0.25, false, false, false);
        this.animations[8][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Eating.png"), 0, 0, 128, 128, 9, 0.25, true, false, false);

        this.animations[9][0] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Dead.png"), 0, 0, 128, 128, 5, 0.3, false, false, false);
        this.animations[9][1] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Dead.png"), 0, 0, 128, 128, 5, 0.3, true, false, false);
    };

    update() {

        if (this.hitCount >= 10) {
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
                        if (!self.AR.collide(entity.BB) && self.state != self.states.attack_1 && self.state != self.states.attack_2
                            && self.state != self.states.cast && self.state != self.states.jump && self.state != self.states.eat) {
                            // move towards the knightd
                            self.state = self.states.run;
                            self.facing = entity.BB.right < self.BB.left ? self.facings.left : self.facings.right;
                            self.speed = self.facing == self.facings.right ? self.speed = -100 * params.NPCSpeed : self.speed = 100 * params.NPCSpeed;
                        }
                    }

                    // if player in attack range
                    if (entity.BB && self.AR.collide(entity.BB)) {
                        self.speed = 0;
                        if (self.canAttack && !self.isCasting) {
                            console.log(self.attackCount);
                            self.state = self.states.attack_1;
                            self.attackCount += 1;
                            self.canAttack = false;
                            self.isAttacking = true;
                        }
                    }

                    // if boss collide with player hitbox
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

            // cast after 2 attack
            if (this.canCast && this.attackCount >= 2 && !this.isAttacking) {
                this.speed = 0;
                this.state = this.states.cast;
                this.isCasting = true;
                if (this.spineGen && this.animations[this.states.cast][this.facing].currentFrame() == 5) {
                    if (this.facing == this.facings.left) {
                        this.game.addEntityToFrontOfList(new bullet(gameEngine, this.x - 20, this.y + 85, 2, this.spineSpeed, 2));
                    } else {
                        this.game.addEntityToFrontOfList(new bullet(gameEngine, this.x + 20, this.y + 85, 3, this.spineSpeed, 2));
                    }
                    this.spineGen = false;
                }
                if (this.animations[this.states.cast][this.facing].isDone()) {
                    this.attackCount = 0.5;
                    this.isCasting = false;
                    this.canCast = false;
                }
            }

            // second half of attack
            if (this.animations[this.states.attack_1][this.facing].isDone()) {
                this.speed = 0;
                this.state = this.states.attack_2;
            }

            // update attack box during attack animation
            if (this.state == this.states.attack_1 || this.state == this.states.attack_2) {
                this.attackFrame = this.animations[this.state][this.facing].currentFrame();
                if (this.attackFrame == 3 || this.attackFrame == 4) {
                    this.updateAB();
                } else {
                    this.AB = null;
                }
            } else {
                this.AB = null;
            }

            // eat phase
            if (this.hitCount > 5 && this.canJump) {
                this.state = this.states.jump;
                this.jumpFrame = this.animations[this.states.jump][this.facing].currentFrame();
                if (this.jumpFrame >= 3 && this.jumpFrame < 9) {
                    if (this.facing == this.facings.left) {
                        this.speed = -300;
                    } else {
                        this.speed = 300;
                    }
                } else {
                    this.speed = 0;
                }
                if (this.animations[this.states.jump][this.facing].isDone()) {
                    this.canJump = false;
                    this.canEat = true;
                }
            }
            if (this.canEat) {
                this.speed = 0;
                this.canEat = false;
                this.state = this.states.eat;
                this.isEating = true;
                this.hitCount = 0;
            }
            if (this.isEating && this.animations[this.states.eat][this.facing].isDone()) {
                this.isEating = false;
            }

            // reset to idle state
            if (this.animations[this.state][this.facing].isDone()) {
                if (this.state == this.states.attack_2) {
                    this.isAttacking = false;
                }
                this.speed = 0;
                this.state = this.states.idle;
            }

            this.checkCD(TICK);
        }
    };

    updateAB() {
        if (this.facing == 1) {
            this.AB = new BoundingBox(this.BB.left - (this.BB.width * 2) - 10, this.BB.top - 10, (this.BB.width * 4) + 10, this.BB.height + 10);
        } else {
            this.AB = new BoundingBox(this.BB.left - 10, this.BB.top - 10, (this.BB.width * 4) + 10, this.BB.height + 10);
        }
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 37, this.y + 79, this.BBW, this.BBH);
        this.DB = new BoundingBox(this.BB.left - 650, this.BB.top - (this.BB.height * 1.5), 1300, this.BB.height * 2.5);
        if (this.facing == 1) {
            this.AR = new BoundingBox(this.BB.left - (this.BB.width * 2) - 10, this.BB.top - 10, (this.BB.width * 3) + 10, this.BB.height + 10);
        } else {
            this.AR = new BoundingBox(this.BB.left + this.BB.width - 10, this.BB.top - 10, (this.BB.width * 3) + 10, this.BB.height + 10);
        }
    };

    checkCD(TICK) {

        if (!this.canAttack) {
            this.attackCD += TICK * params.NPCSpeed;
            if (this.attackCD >= 2.25) {
                this.animations[this.states.attack_1][this.facings.left].elapsedTime = 0;
                this.animations[this.states.attack_1][this.facings.right].elapsedTime = 0;
                this.animations[this.states.attack_2][this.facings.left].elapsedTime = 0;
                this.animations[this.states.attack_2][this.facings.right].elapsedTime = 0;
                this.attackCD = 0;
                this.canAttack = true;
            }
        }

        if (!this.canCast) {
            this.castCD += TICK * params.NPCSpeed;
            if (this.castCD >= 3) {
                console.log(this.animations[this.states.cast][this.facings.left].elapsedTime);
                this.animations[this.states.cast][this.facings.left].elapsedTime = 0;
                this.animations[this.states.cast][this.facings.right].elapsedTime = 0;
                this.castCD = 0;
                this.canCast = true;
                this.spineGen = true;
            }
        }

        if (!this.canDamage) {
            this.damagedCD += TICK * params.NPCSpeed;
            if (this.damagedCD >= 3) {
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
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.AR.x - this.game.camera.x, this.AR.y, this.AR.width, this.AR.height);
        ctx.strokeStyle = 'green';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.DB.x - this.game.camera.x, this.DB.y, this.DB.width, this.DB.height);
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
    };
}