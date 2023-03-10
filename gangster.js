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
                        if (!self.AR.collide(entity.BB) && self.state != self.states.attack) {
                            // move towards the player
                            if (!entity.BB.bottom < 500 && entity.BB.left < self.BB.right && entity.BB.right > self.BB.left) {
                                self.state = self.states.idle;
                                self.speed = 0;
                            } else {
                                self.state = self.states.run;
                                self.facing = entity.BB.right < self.BB.left ? self.facings.left : self.facings.right;
                                self.speed = self.facing == self.facings.right ? self.speed = -100 * params.NPCSpeed : self.speed = 100 * params.NPCSpeed;
                            }
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

                if (entity instanceof gr1) {
                    if (self.BB.collide(entity.BB) && entity.BB.top > self.BB.top) {
                        if ((entity.BB.right - self.BB.right) <= 5 && self.facing == self.facings.right) {
                            self.speed = 0;
                            self.state = self.states.idle;
                        } else if ((self.BB.left - entity.BB.left) <= 5 && self.facing == self.facings.left) {
                            self.speed = 0;
                            self.state = self.states.idle;
                        }
                    }
                }
            });

            if (this.state == this.states.attack) {
                this.attackFrame = this.animations[this.state][this.facing].currentFrame();
                if (this.attackFrame == 4) {
                    ASSET_MANAGER.playAsset("./sound/mainattack.wav");
                }
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
            this.AB = new BoundingBox(this.BB.left + (18 * this.scale), this.BB.top, this.BB.width, this.BB.height);
        }
    };

    updateBB() {
        this.lastBB = this.BB;
        if (this.facing == this.facings.left) {
            this.BB = new BoundingBox(this.x - (((this.width * this.scale) - 22) / 2), this.y + (6 * this.scale), (this.width * this.scale), (this.height * this.scale));
        } else {
            this.BB = new BoundingBox(this.x + (((this.width * this.scale) - 12 ) / 2), this.y + (6 * this.scale), (this.width * this.scale), (this.height * this.scale));
        }
        this.DB = new BoundingBox(this.BB.left - 400, this.BB.top - (200 - this.BB.height), 800, 200);
        if (this.facing == this.facings.left) {
            this.AR = new BoundingBox(this.BB.left - (18 * this.scale), this.BB.top, this.BB.width, this.BB.height);
        } else {
            this.AR = new BoundingBox(this.BB.left + (18 * this.scale), this.BB.top, this.BB.width, this.BB.height);
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
        
        if(this.game.camera.billboard){
            ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/bilb.png"), 300 - this.game.camera.x, 620);
            ctx.font = "13px Arial";
            ctx.textAlign = "left";
            ctx.fillText("Press 'w' to jump", 320 - this.game.camera.x, 642);
            ctx.fillText("Press ' J ' to attack", 320 - this.game.camera.x, 662);
            ctx.fillText("Press ' I ' to slide", 320 - this.game.camera.x, 682);
            
            ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/bilb.png"), 1770 - this.game.camera.x, 550);
            ctx.font = "13px Arial";
            ctx.textAlign = "left";
            ctx.fillText("Press 's' to duck", 1790 - this.game.camera.x, 572);
            ctx.fillText("Press 'o' for slow", 1790 - this.game.camera.x, 592);
            ctx.fillText("         motion", 1790 - this.game.camera.x, 612);
            
        }
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