class trap {
    constructor(game,x , y){
        this.game = game;
        this.x = x;
        this.y = y;
        this.states = {on: 0, off: 1, turningOn: 2, turningOff: 3};
        this.state = this.states.on;
        this.isOn = true;
        this.onCD = 0;
        this.isOff = false;
        this.offCD = 0;
        this.turningOn = false;
        this.turningOff = false;

        // change this
        this.scale = 1.5;

        this.sideWidth = 6;
        this.laserWidth = 7;
        this.height = 200;
        this.animations = [];
        this.loadAnimation();

        this.updateBB();
    };

    loadAnimation() {
        this.animations[0] = new Animator(ASSET_MANAGER.getAsset("./Laser/on.png"),0,0,19,200,1,0.1,false, true, false);  
        this.animations[1] = new Animator(ASSET_MANAGER.getAsset("./Laser/off.png"),0,0,19,200,1,0.1,false, true, false);
        this.animations[2] = new Animator(ASSET_MANAGER.getAsset("./Laser/turning on.png"),0,0,29,200,5,0.02, false, false, false);
        this.animations[3] = new Animator(ASSET_MANAGER.getAsset("./Laser/turning off.png"),0,0,29,200,5,0.02, false, false, false);
    }

    update() {
        const TICK = this.game.clockTick;

        if (this.state == this.states.on) {
            var self = this;
            this.game.entities.forEach (function (entity) {
                if(entity.BB && self.BB.collide(entity.BB)){
                    if(entity instanceof Zero){
                        entity.isDying = true;
                    }
                }
            });
        }

        if (this.turningOn) {
            this.state = this.states.turningOn;
            if (this.animations[this.states.turningOn].isDone()) {
                if (this.isOn) {
                    this.state = this.states.on;
                } else {
                    this.state = this.states.off;
                }
                this.turningOn = false;
            }
        } else if (this.turningOff) {
            this.state = this.states.turningOff;
            if (this.animations[this.states.turningOff].isDone()) {
                if (this.isOn) {
                    this.state = this.states.on;
                } else {
                    this.state = this.states.off;
                }
                this.turningOff = false;
            }
        }

        this.checkCD(TICK);
    };

    checkCD(TICK) {
        if (this.isOn) {
            this.onCD += TICK * params.NPCSpeed;
            if (this.onCD >= 3) {
                this.onCD = 0;
                this.isOn = false;
                this.isOff = true;
                this.turningOff = true;
                this.animations[this.states.turningOff].elapsedTime = 0;
            }
        }

        if (this.isOff) {
            this.offCD += TICK * params.NPCSpeed;
            if (this.offCD >= 1.5) {
                this.offCD = 0;
                this.isOff = false;
                this.isOn = true;
                this.turningOn = true;
                this.animations[this.states.turningOn].elapsedTime = 0;
            }
        }
    }

    updateBB() {
        if (this.state == this.states.on) {
            this.BB = new BoundingBox(this.x + (this.sideWidth * this.scale), this.y, this.laserWidth * this.scale, this.height * this.scale);
        } else {
            this.BB = null;
        }
    };

    draw(ctx){
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
    };
}