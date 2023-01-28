/**
 * Main Character
 * @author Abdulmuen Fethi
 */
class Zero {
    constructor(game, X, Y) {
        this.game = game;
        this.game.Zero = this;
        
        this.animator = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 86, 42,60,100,13,0.1,false);//initial
        // this.x = 100;
        // this.y = 245;
        this.x = X;
        this.y = Y;
        this.width = 60;
        this.hight = 100;

        this.idle = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 92, 49,60,86,13,0.08,false, true, true);//default
        this.walkF = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 84, 157,66,87,8,0.08,false, true, true);//walk forward
        this.walkB = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 84, 157,66,87,8,0.08,true, true, true);//walk backwards
        this.sprintF = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 81, 593,90,77,10,0.08,false, true, true);//sprint forward
        this.sprintB = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 81, 593,90,77,10,0.08,true, true, true);//sprint backwards
        this.slideF = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 84, 1640,330,100,1,1,false, true, true);//slide forward
        this.slideB = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 84, 1640,330,100,1,1,true, true, true);//slide backwards
        this.jumpF = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 78, 1299,64,89,4,0.05,false, true, true);//jump forward
        this.jumpB = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 78, 1299,64,89,4,0.05,true, true, true);//jump backwards
        this.fallF = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 348, 1297,72,91,4,0.05,false, true, true);//fall forward
        this.fallB = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 348, 1297,72,91,4,0.05,true, true, true);//fall backwards
        this.hitFall1 = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 64, 1712,86,100,7,0.2,false, false, true);//dying 1
        this.hitFall2 = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 707, 1712,129,100,5,0.2,false, false, true);//dying 2
        this.attack1 = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 60, 1545,120,75,6,0.2,false, true, true);//attack 1

        this.jumping = false;
        this.falling = false;
        this.startingY = this.y;
        this.speed = 0;
        this.jumpSpeed = 3;
        this.fallSpeed = 2;
        this.maxJump = 180;

        this.isAttacking = false;
        this.isDying = false;
        this.isDead = false;

        this.BB = new BoundingBox(this.x,this.y,this.width,this.hight);
        this.updateBB();

        ///////////////try////////////
        this.flag = true;
    }

    //update bounding box
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x,this.y,this.animator.width,this.animator.height);
    };

    //jump routine
    jump(){


        //if maximum jumping hight is reached start falling
        if(this.y <= (this.startingY - this.maxJump) && this.jumping){
            this.jumping = false;
            this.falling = true;
        }

        //if fallen to the ground stop falling and restore all variables
        if(this.y >= this.startingY && this.falling){
            this.falling = false;
            this.y = this.startingY;
            this.jumpSpeed = 3;
            this.fallSpeed = 2;
            this.speed = 0;
        }

        if(this.jumping && !this.falling){//up
            this.animator = this.speed >= 0 ? this.jumpF : this.jumpB;
            this.jumpSpeed *= 0.99 ;
            this.y -= this.jumpSpeed;
            this.x += this.speed;
        }else if(!this.jumping && this.falling){//down
            this.animator = this.speed >= 0 ? this.fallF : this.fallB;
            this.fallSpeed *= 1.02;
            this.y += this.fallSpeed;
            this.x += this.speed * 1.5;
        }
    }

    attacks() {
        

    }

    update() {
        const TICK = this.game.clockTick;

        if(this.game.keys["e"] && params.canSlow){
            params.NPCSpeed = 0.25;
            params.playerSpeed = 0.75;
        } else {
            params.slowMotionCD += TICK;
            if (params.slowMotionCD >= 5) {
                params.NPCSpeed = 1;
                params.playerSpeed = 1;
                params.slowMotionCD = 0;
                params.canSlow = true;
            }
        }

        this.updateBB();

        //if not in the air or dying
        if(!this.jumping && !this.falling && !this.isAttacking && !this.isDying){

            this.startingY = this.y;//if not on the air save jump starting haight

            if(this.game.keys["d"]){//forward
                this.speed = 2 * params.playerSpeed;
                if(this.game.keys["Shift"]){
                    this.animator = this.sprintF;
                    this.speed = 4 * params.playerSpeed;                   
                }else this.animator = this.walkF;

                if(this.game.keys["w"]){//jump
                    this.jumping = true;
                    this.jump();
                }

                if(this.game.keys["f"]){//slide
                    this.animator = this.slideF;
                    this.speed = 10 * params.playerSpeed;
                }

                this.x += this.speed;
            }else if(this.game.keys["a"]){//backward
                this.speed = -2 * params.playerSpeed;
                if(this.game.keys["Shift"]){
                    this.animator = this.sprintB;
                    this.speed = -4 * params.playerSpeed;                   
                }else this.animator = this.walkB;

                if(this.game.keys["w"]){//jump
                    this.jumping = true;
                    this.jump();
                }
                if(this.game.keys["f"]){//slide
                    this.animator = this.slideB;
                    this.speed = -10 * params.playerSpeed;
                }

                this.x += this.speed * params.playerSpeed;
            }else if(this.game.keys["w"]){//jump
                this.jumping = true;
                this.jump();
            }else if(this.game.keys["i"]){//for testing animation
                this.x += 1 * params.playerSpeed;
                this.animator = this.attack1;
            }else {
                this.animator = this.idle;
                this.speed = 0;
            }

            
        }else if(this.isDying){
            this.die()
        }else
            this.jump();
    }

    die() {
        this.animator = this.hitFall1;
        this.y -= 0.1;
        this.x -= 0.2;
        //console.log(this.isDying)
        if(this.animator == this.hitFall1 && this.animator.isDone()){
            this.animator = this.hitFall2;
            this.y += 0.3;
            this.x -= 0.2;
            if(this.animator.isDone()){
                //this.animator = this.idle;
                this.isDying = false;
                this.y = this.startingY;
                
            }
        }else if(this.animator == this.hitFall2 && this.animator.isDone())
            this.isDead = true;
            
    }

    draw(ctx) {
        ctx.strokeStyle = "Green"
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
        ctx.strokeRect(this.x+10,this.y,this.animator.width-20,this.animator.height);
    }
}