/**
 * Main Character
 * @author Abdulmuen Fethi
 */
class Zero {
    constructor(game) {
        this.game = game;
        
        this.animator = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 86, 42,60,100,13,0.1,false);//initial
        this.x = 100;
        this.y = 245;
        this.width = 60;
        this.hight = 100;

        this.BB = new BoundingBox(this.x,this.y,this.width,this.hight);
        this.SlowMotion = new BoundingBox(this.x,this.y,this.width,this.hight);


        this.idle = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 92, 42,60,100,13,0.1,false, true);//default
        this.walkF = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 84, 150,66,100,8,0.1,false, true);//walk forward
        this.walkB = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 84, 150,66,100,8,0.1,true, true);//walk backwards
        this.sprintF = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 81, 590,90,100,10,0.1,false, true);//sprint forward
        this.sprintB = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 81, 590,90,100,10,0.1,true, true);//sprint backwards
        this.slideF = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 84, 1640,330,100,1,1,false, true);//slide forward
        this.slideB = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 84, 1640,330,100,1,1,true, true);//slide backwards
        this.jumpF = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 78, 1295,64,100,4,0.1,false, true);//jump forward
        this.jumpB = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 78, 1295,64,100,4,0.1,true, true);//jump backwards
        this.fallF = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 348, 1295,72,100,4,0.1,false, true);//fall forward
        this.fallB = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 348, 1295,72,100,4,0.1,true, true);//fall backwards
        this.hitFall1 = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 64, 1740,86,72,7,0.5,false, false);//fall forward
        this.hitFall2 = new Animator(ASSET_MANAGER.getAsset("./Sprites/main.png"), 707, 1772,129,28,5,0.5,false, false);//fall forward

        this.jumping = false;
        this.falling = false;
        this.startingY = this.y;
        this.speed = 0;
        this.jumpSpeed = 2;
        this.fallSpeed = 1;

        this.isAttacking = false;
        this.isDying = false;


        ///////////////try////////////
        this.flag = true;


    }

    //update bounding box
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x,this.y,this.width,this.hight);
    };

    //jump routine
    jump(){


        //if maximum jumping hight is reached start falling
        if(this.y <= (this.startingY - 100) && this.jumping){
            this.jumping = false;
            this.falling = true;
        }
        //if fallen to the ground stop falling and restore all variables
        if(this.y >= this.startingY && this.falling){
            this.falling = false;
            this.y = this.startingY;
            this.jumpSpeed = 2;
            this.fallSpeed = 1;
            this.speed = 0;
        }

        if(this.jumping && !this.falling){//up
            this.animator = this.speed >= 0 ? this.jumpF : this.jumpB;
            this.jumpSpeed *= 0.99;
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
        this.updateBB();
        //if not in the air or dying
        if(!this.jumping && !this.falling && !this.isAttacking && !this.isDying){

            this.startingY = this.y;//if not on the air save jump starting haight

            if(this.game.keys["d"]){//forward
                this.speed = 1;
                if(this.game.keys["Shift"]){
                    this.animator = this.sprintF;
                    this.speed = 2;                   
                }else this.animator = this.walkF;

                if(this.game.keys["w"]){//jump
                    this.jumping = true;
                    this.jump();
                }

                if(this.game.keys["f"]){//slide
                    this.animator = this.slideF;
                    this.speed = 10;
                }

                this.x += this.speed;
            }else if(this.game.keys["a"]){//backward
                this.speed = -1;
                if(this.game.keys["Shift"]){
                    this.animator = this.sprintB;
                    this.speed = -2;                   
                }else this.animator = this.walkB;

                if(this.game.keys["w"]){//jump
                    this.jumping = true;
                    this.jump();
                }
                if(this.game.keys["f"]){//slide
                    this.animator = this.slideB;
                    this.speed = -10;
                }

                this.x += this.speed;
            }else if(this.game.keys["w"]){//jump
                this.jumping = true;
                this.jump();
            }else if(this.game.keys["i"]){//for testing animation
                this.die();
            }else {
                this.animator = this.idle;
                this.speed = 0;
            }

            
        }else
            this.jump();
    }

    die() {
            this.animator = this.hitFall2;
    }

    draw(ctx) {
        ctx.strokeStyle = "Green"
        ctx.strokeRect(this.x,this.y,this.width,this.hight);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
    }
}
