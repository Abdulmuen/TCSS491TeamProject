/**
 * Main Character
 * @author Abdulmuen Fethi
 */
class Zero {
    constructor(game, X, Y) {
        this.game = game;
        this.game.Zero = this;
        this.x = X;
        this.y = Y;
        this.width = 60;
        this.height = 100;
        this.spritesheet = ASSET_MANAGER.getAsset("./Sprites/main.png");
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.AB = new BoundingBox(this.x + this.width / 2, this.y, this.width, this.height);//attack box;

        this.animator = new Animator(this.spritesheet, 86, 42, 60, 100, 13, 0.1, false);//initial

        this.speed = { x: 0, y: 0 };
        this.fallAcc = 500;
        this.max_jump = 350;

        //states
        this.isJumping = false;
        this.isfalling = true;
        this.facing = 0;
        this.isAttacking = false;

        //for sliding attack
        this.isSliding = false;
        this.save_x = 0;
        this.save_t1 = -1;
        this.save_t2 = -1;

        this.first = true;

        // win and loss
        this.lose = false;
        this.won = false;
        this.BossFight = false;
        this.WinorLose = { Lose: 0, Win: 1, Boss: 2 };

        // fire zero's state variables
        //this.canThrow = true;
        //this.throwFireballTimeElapsed = 0;
        //this.fireballsThrown = 0;
        this.idleF = new Animator(this.spritesheet, 92, 49, 60, 86, 13, 0.08, false, true, true);//default
        this.idleB = new Animator(this.spritesheet, 92, 49, 60, 86, 13, 0.08, true, true, true);//face backwards
        this.idle = [this.idleF, this.idleB];

        this.walkF = new Animator(this.spritesheet, 84, 157, 66, 87, 8, 0.08, false, true, true);//walk forward
        this.walkB = new Animator(this.spritesheet, 84, 157, 66, 87, 8, 0.08, true, true, true);//walk backwards
        this.walk = [this.walkF, this.walkB];

        this.sprintF = new Animator(this.spritesheet, 81, 593, 90, 77, 10, 0.08, false, true, true);//sprint forward
        this.sprintB = new Animator(this.spritesheet, 81, 593, 90, 77, 10, 0.08, true, true, true);//sprint backwards
        this.sprint = [this.sprintF, this.sprintB];

        this.slideF = new Animator(this.spritesheet, 90, 1661, 171, 45, 1, 1, false, true, true);//slide attack forward
        this.skidF = new Animator(this.spritesheet, 424, 1644, 100, 64, 1, 1, false, true, true);//skid forward
        this.slideB = new Animator(this.spritesheet, 90, 1661, 171, 45, 1, 1, true, true, true);//slide attack forward
        //this.slideB = new Animator(this.spritesheet, 84, 1640,330,100,1,1,true, true, true);//slide attack backwards
        this.skidB = new Animator(this.spritesheet, 424, 1644, 100, 64, 1, 1, true, true, true);//skid backwards
        this.slide = [this.slideF, this.slideB];
        this.skid = [this.skidF, this.skidB];

        this.jumpF = new Animator(this.spritesheet, 78, 1299, 64, 89, 4, 0.05, false, true, true);//jump forward
        this.jumpB = new Animator(this.spritesheet, 78, 1299, 64, 89, 4, 0.05, true, true, true);//jump backwards
        this.jump = [this.jumpF, this.jumpB];

        this.fallF = new Animator(this.spritesheet, 348, 1297, 72, 91, 4, 0.05, false, true, true);//fall forward
        this.fallB = new Animator(this.spritesheet, 348, 1297, 72, 91, 4, 0.05, true, true, true);//fall backwards
        this.fall = [this.fallF, this.fallB];

        this.attack1F = new Animator(this.spritesheet, 60, 1545, 120, 75, 6, 0.1, false, true, true);//attack 1
        this.attack1B = new Animator(this.spritesheet, 60, 1545, 120, 75, 6, 0.1, true, true, true);//attack 1
        this.attack1 = [this.attack1F, this.attack1B];

        this.rolejumpF = new Animator(this.spritesheet, 78, 788, 100, 90, 6, 0.2, false, true, true);//role jump
        this.rolejumpB = new Animator(this.spritesheet, 78, 788, 100, 90, 6, 0.2, true, true, true);//role jump
        this.rolejump = [this.rolejumpF, this.rolejumpB];

        this.duckF = new Animator(this.spritesheet, 232, 1213, 80, 60, 1, 0.2, false, true, true);//duck and stay
        this.duckB = new Animator(this.spritesheet, 232, 1213, 80, 60, 1, 0.2, true, true, true);//duck and stay
        this.duck = [this.duckF, this.duckB];

        this.duck1F = new Animator(this.spritesheet, 72, 1198, 80, 76, 3, 0.2, false, true, true);//duck down
        this.duck1B = new Animator(this.spritesheet, 72, 1198, 80, 76, 3, 0.2, true, true, true);//duck down
        this.duckDown = [this.duck1F, this.duck1B];

        this.duckAttackF = new Animator(this.spritesheet, 70, 1007, 90, 77, 4, 0.2, false, true, true);//duck down
        this.duckAttackB = new Animator(this.spritesheet, 70, 1007, 90, 77, 4, 0.2, true, true, true);//duck down
        this.duckAttack = [this.duck1F, this.duck1B];

        this.duck2F = new Animator(this.spritesheet, 85, 1115, 86, 63, 10, 0.2, false, true, true);//duck and walk
        this.duck2B = new Animator(this.spritesheet, 85, 1115, 86, 63, 10, 0.2, true, true, true);//duck and walk
        this.duckWalk = [this.duck2F, this.duck2B];

        this.hitFall1F = new Animator(this.spritesheet, 64, 1741, 86, 80, 7, 0.05, false, false, true);//dying 1
        this.hitFall1B = new Animator(this.spritesheet, 64, 1741, 86, 80, 7, 0.05, true, false, true);//dying 1
        this.hitFall1 = [this.hitFall1F, this.hitFall1B];

        this.hitFall2F = new Animator(this.spritesheet, 707, 1772, 129, 28, 5, 0.2, false, false, true);//dying 2
        this.hitFall2B = new Animator(this.spritesheet, 707, 1772, 129, 28, 5, 0.2, true, false, true);//dying 2
        this.hitFall2 = [this.hitFall2F, this.hitFall2B];

        this.slowMotion = new Animator(ASSET_MANAGER.getAsset("./Sprites/slow.png"), 0, 0, 700, 430, 1, 1, false, true, false);

        this.H = this.animator.height - 100;

        this.updateBB();
        this.floor = Y;//ground
        this.roof = 0; //ceiling
        this.q = false;
        this.isDead = false;
        this.isDying = false;

    }

    //update bounding box
    updateBB() {

        this.lastBB = this.BB;
        this.offset = this.facing == 1? this.animator.width - 60 : 0 ;
        if (this.animator == this.attack1[this.facing]) {
            if (this.facing == 1) {
                this.BB = new BoundingBox(this.x + 10 - 20, this.y - this.H, this.animator.width - 60, this.animator.height);
            } else {
                this.BB = new BoundingBox(this.x + 10 - this.offset, this.y - this.H, this.animator.width - 60, this.animator.height);
            }
        } else {
            this.BB = new BoundingBox(this.x + 10 - this.offset, this.y - this.H, this.animator.width - 20, this.animator.height);
        }
        if (this.animator == this.attack1[this.facing] && this.animator.currentFrame() > 1) {
            let dd = this.facing == 1 ? 0 : 50;
            this.AB = new BoundingBox(this.x + dd - this.offset, this.y - this.H + 10, this.animator.width - 50, this.animator.height - 50);
        } else if (this.animator == this.slide[this.facing]) {
            let dd = this.facing == 1 ? 0 : 100;
            this.AB = new BoundingBox(this.x + dd - this.offset, this.y - this.H + 20, this.animator.width - 100, this.animator.height - 50);
        } else {
            this.AB = null;
        }

    };

    //===============================================Start=======================================================================================================================//
    update() {
        if (!this.isDead) {//if not dead
            const TICK = this.game.clockTick;


            if (this.game.keys["o"] && params.canSlow) {//slow motion
                params.NPCSpeed = 0.25;
                params.playerSpeed = 0.75;
                params.canSlow = false;
            }
            if (!params.canSlow) {
                params.slowMotionCD += TICK;
                if (params.slowMotionCD >= 5) {
                    params.NPCSpeed = 1;
                    params.playerSpeed = 1;
                    params.slowMotionCD = 0;
                    params.canSlow = true;
                }
            }

            this.H = this.animator.height - 100;

            if (this.x < this.game.camera.x) this.x = this.game.camera.x;//stay on canvas
            if (this.y > 800) this.isDying = true;//if fallen of map die


            if (!this.isJumping && !this.isfalling && !this.isDying) {//ground physics
                if (this.game.right) {//forward
                    this.facing = 0;
                    this.moving(0, 1000, TICK);
                    this.x += this.speed.x * TICK * params.playerSpeed;
                } else if (this.game.left) {//backward
                    this.facing = 1;
                    this.moving(1, 1000, TICK);
                    this.x -= this.speed.x * TICK * params.playerSpeed;
                } else if (this.game.up) {//jump inplace
                    this.q = false;
                    this.isJumping = true;
                    this.speed.y = 600;
                    this.jumping(TICK, 50, this.facing, this.jump);
                } else if (this.game.keys["q"]) {//jump inplace
                    this.q = true;
                    this.isJumping = true;
                    this.speed.y = 600;
                    this.jumping(TICK, 50, this.facing, this.rolejump);
                } else if (this.game.down) {//duck
                    this.animator = this.duck[this.facing]
                } else if (this.game.keys["j"]) {//for attacks
                    this.animator = this.attack1[this.facing];
                } else if (this.game.keys["i"]) {//slide 
                    this.slides(this.facing);
                    if (this.animator == this.skid[this.facing]) {
                        if (this.facing == 0) {
                            this.x += 300 * TICK * params.playerSpeed;
                        } else
                            this.x -= 300 * TICK * params.playerSpeed;
                    } else if (this.animator == this.slide[this.facing]) {
                        if (this.facing == 0) {
                            this.x += 600 * TICK * params.playerSpeed;
                        } else
                            this.x -= 600 * TICK * params.playerSpeed;
                    }
                } else {
                    this.animator = this.idle[this.facing];
                    this.speed.x = 0;
                    this.save_t2 = -1;//reset timers
                    this.save_t1 = -1;//reset timers
                }

            } else if ((this.isJumping || this.isfalling) && !this.isDying) {//continue jump routine
                if (this.q) {
                    this.jumping(TICK, 50, this.facing, this.rolejump);
                } else
                    this.jumping(TICK, 50, this.facing, this.jump);
            } else if (this.isDying) {//continue death routine
                this.animator = this.hitFall1[this.facing]
                this.die(TICK, this.facing);
            }


            this.updateBB();

            // if(!this.isJumping && this.falling){
            //     this.animator = this.fall[this.facing];
            //     this.speed.y += 2000 * TICK;
            //     this.y += this.speed.y * TICK * params.playerSpeed;
            // }
            //collusion
            /*
            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB) && entity != that) {

                    if (entity instanceof gr1 && ((that.lastBB.top) >= entity.BB.bottom)) {
                        that.roof = entity.BB.bottom;
                        if (that.isJumping) that.isJumping = false;
                        if (that.isJumping && (!(that.game.up || that.game.keys["q"]) || roof <= this.y)) {
                            that.isJumping = false;
                            that.isfalling = true;
                            that.y = entity.BB.bottom - 1;//push it down
                        }
                    }
                    if (entity instanceof gr1 && ((that.lastBB.bottom) <= entity.BB.top)) {
                        if (that.isfalling) that.isfalling = false;
                        if (!that.isJumping && !that.isDying) {//on ground
                            that.y = entity.BB.top - that.height - 1;
                            //test death
                            //this.animator = this.hitFall1[this.facing];
                            //this.isDying = true;
                            //end test
                            that.isJumping = false;
                        }
                    }

                }

            });
            */

            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (entity instanceof door) {
                        that.BossFight = true;
                    }

                    if (entity instanceof gr1 && ((that.lastBB.bottom) <= entity.BB.top)) {
                        that.isfalling = false;
                        that.floor = entity.BB.top;
                    }
                    // fall from left
                    if (entity instanceof gr1 && ((entity.BB.right - that.BB.left) <= 5) && !that.isJumping) {
                        that.isfalling = true;
                    }
                    // fall from right
                    if (entity instanceof gr1 && ((that.BB.right - entity.BB.left) <= 5) && !that.isJumping) {
                        that.isfalling = true;
                    }

                }
            });

            this.game.entities.forEach(function (entity) {
                if (entity.AB && that.BB.collide(entity.AB)) {
                    if (entity instanceof gangster) {
                        that.isDying = true;
                    }
                    if (entity instanceof boss) {
                        that.isDying = true;
                    }
                }
            });


            //update y







        }//else if dead

        let dd = this.facing == 0 ? false : true;
        if (this.isDead) this.animator = new Animator(this.spritesheet, 707 + 129, 1772, 129, 28, 1, 0.2, dd, false, true);
    }
    //===============================================End=======================================================================================================================//

    //jump routine
    jumping(TICK, s, facing, animator) {
        if (this.floor - this.y >= this.max_jump || !(this.game.up || this.game.keys["q"])) {
            this.isJumping = false;
            this.isfalling = true;
        }
        if (this.isJumping && (this.game.up || this.game.keys["q"]) && this.floor - this.y < this.max_jump) {
            //&& this.floor - this.y < this.max_jump && this.roof < this.y
            this.speed.y -= s * TICK;
            this.animator = animator[facing]
            this.y -= this.speed.y * TICK * params.playerSpeed;
        }
        if (this.isfalling) {
            //&& this.floor > this.y + this.animator.height
            this.speed.y += s * TICK;
            this.y += this.speed.y * TICK * params.playerSpeed;
            this.animator = animator[facing]
        }

        if (this.game.right) {
            this.facing = 0;
            this.x += 200 * TICK * params.playerSpeed;
        } else if (this.game.left) {
            this.facing = 1;
            this.x -= 200 * TICK * params.playerSpeed;
        } else {
            if (facing == 1) {
                this.x -= this.speed.x * TICK * params.playerSpeed;
            } else if (facing == 0) {
                this.x += this.speed.x * TICK * params.playerSpeed;
            }
        }
    }

    //death animation
    die(TICK, facing) {
        if (this.animator == this.hitFall1[facing] && this.animator.currentFrame() > 5 && !this.isDead) {
            this.animator = this.hitFall2[facing];
            this.lose = true;
            //this.x -= 20 * TICK;      
        } else if (this.animator == this.hitFall2[facing] && this.animator.currentFrame() > 3 && !this.isDead) {
            this.isDead = true;
        }
    }


    moving(facing, s, TICK) {//movement
        let max_x = 350;
        let key = this.game.right || this.game.left;
        if (this.game.keys["Shift"] && key) {
            max_x = 600;
            s = 1000;
            this.animator = this.sprint[facing];
        } else if (key && !this.game.keys["Shift"]) {
            //console.log(this.game.keys["d"])
            max_x = 350;
            this.animator = this.walk[facing];
        } else if (!this.game.keys["Shift"] && !key) {
            return;
        }

        if (this.game.up) {//jump
            this.q = false;
            this.isJumping = true;
            this.speed.y = 600;
            this.jumping(TICK, 50, this.facing, this.jump);
        } else if (this.game.keys["q"]) {//jump inplace
            this.q = true;
            this.isJumping = true;
            this.speed.y = 600;
            this.jumping(TICK, 50, this.facing, this.rolejump);
        }

        if (this.game.keys["i"]) {//slide  
            s = 20000;
            max_x = 10000;
            this.slides(facing);
        } else {
            this.save_t2 = -1;
            this.save_t1 = -1;
        }

        if (this.game.down) {//duck and walk
            max_x = 150;
            s = 100;
            this.animator = this.duckWalk[facing];
        }
        if (this.game.keys["j"]) {//attack
            max_x = 100;
            s = 100;
            this.animator = this.attack1[facing];
            if (facing == 0) {
                this.x += 100 * TICK * params.playerSpeed;
            } else {
                this.x -= 100 * TICK * params.playerSpeed;
            }
        }

        if (this.speed.x < max_x) {
            this.speed.x += s * TICK * params.playerSpeed;
        } else {
            this.speed.x = max_x;
        }
        max_x = 350;
    }

    slides(facing) {//slide attack
        let t = this.game.timer.lastTimestamp;
        if (this.isSliding) {
            if (t - this.save_t1 < 250) this.animator = this.slide[facing]; //slide for 250 time slices    
            if (t - this.save_t1 > 250 && t - this.save_t1 < 550) {//skid for another 300
                this.animator = this.skid[facing];
                this.speed.x = 0;
            }
            if (t - this.save_t1 > 550) {//stop sliding
                this.save_t2 = t;
                this.save_t1 = -1;
                this.isSliding = false;
            }

        } else {
            if (this.game.keys["d"] || this.game.keys["a"]) {
                this.animator = this.walk[facing];
            } else {
                this.animator = this.idle[facing];
            }
            this.speed.x = 0;

            if (t - this.save_t2 > 5000) {
                if (this.save_t1 < 0) {
                    this.save_t1 = t;
                    this.save_t2 = -1;
                    this.isSliding = true;
                }
            }
        }
    }



    draw(ctx) {
        if (!params.canSlow) {
            this.slowMotion.drawSemiTran(this.game.clockTick, ctx, 0 - this.game.camera.x, 0, 50)
        }

        ctx.strokeStyle = "Green"
        ctx.font = "30px Arial";
        ctx.fillText(this.game.camera.x, 10, 50);
        ctx.fillText(Math.round(this.x), 10, 50);
        this.offset = this.facing == 1? this.animator.width - 60 : 0 ;
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.offset - this.game.camera.x, this.y - this.H, 1);
        //ctx.strokeRect(20, 630, 1000, 20);
        //ctx.strokeRect(this.x + 10 - this.game.camera.x, this.y, this.animator.width - 20, this.animator.height);
        //ctx.strokeRect(this.x + 10, this.y - this.H, this.animator.width - 20, this.animator.height);
        this.drawBB(ctx, this.BB, "green");
        this.drawBB(ctx, this.AB, "red");

        // sence management
        if (this.lose == true) {
            console.log("die");
            //this.removeFromWorld =true;
            this.game.addEntityToFrontOfList(new Replay(this.game, this.WinorLose.Lose));
        }
        if (this.won == true) {
            this.game.addEntityToFrontOfList(new Replay(this.game, this.WinorLose.Win));

        }
    }

    drawBB(ctx, BB, color) {//draw Bounding Box
        if (BB) {
            ctx.strokeStyle = color;
            ctx.strokeRect(BB.x - this.game.camera.x, BB.y, BB.width, BB.height);
            ctx.stroke();
        }
    }
}
