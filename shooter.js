class shooter{
    constructor(game) {
        this.game = game;
        //this.walk = new Animator(ASSET_MANAGER.getAsset("./shooter/WR.png"),0, 0, 34, 40, 8, 0.1, false);
        //this.dead = new Animator(ASSET_MANAGER.getAsset("./shooter/dead.png"),0, 0, 44, 32, 12, 0.1, true);
        //this.shootright = new Animator(ASSET_MANAGER.getAsset("./shooter/shooting.png"),0, 0, 45, 41, 1, 0.1,false);
        //this.shootleft = new Animator(ASSET_MANAGER.getAsset("./shooter/shooting.png"),0, 0, 45, 41, 1, 0.1,true);
		this.x = 1160;
		this.y = 255;
		this.speed = 1;
        this.fireRate =2.1;
        this.elapsedTime = 4;
        this.bulletSpeed = 350;
        this.shot = false;
        this.die = false;
        this.updateBB();
        this.directions = { left: 0, right: 1 };
        this.direction = this.directions.left;
        this.removeFromWorld = false;
        this.animation = [];
        this.animation[0] = new Animator(ASSET_MANAGER.getAsset("./shooter/WR.png"),0, 0, 34, 40, 8, 0.1, false,true);
        this.animation[1] = new Animator(ASSET_MANAGER.getAsset("./shooter/WR.png"),0, 0, 34, 40, 8, 0.1, true,true);
        this.animation[2] =new Animator(ASSET_MANAGER.getAsset("./shooter/shooting.png"),0, 0, 45, 41, 1, 0.1,true,true);
        this.animation[3] =new Animator(ASSET_MANAGER.getAsset("./shooter/dead.png"),0, 0, 44, 32, 12, 0.1, true,false);
    };
    update(){
        const TICK = this.game.clockTick;
        this.elapsedTime += TICK;
        if(this.x <= 1160) {
            this.direction = 0;
            this.speed +=55;
        }else if(this.x>1500){
            this.direction = 1;
            this.speed -=55;
        }
        this.x += this.speed*TICK;
        this.updateBB();
        var that = this;
        this.game.entities.forEach (function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)){
                if(entity instanceof Zero){
                    that.speed = 0;
                    that.direction = 2;
                    that.shot = true;
                     if(that.DB.collide(entity.BB)){
                         that.die = true;
                         }
                         
            }

            }
        
        });
        if(this.shot){
        if (this.elapsedTime >= this.fireRate && this.removeFromWorldValue != 1) {
            this.game.addEntityToFrontOfList(new bullet(gameEngine, this.x-200, this.y, 1, this.bulletSpeed,0.4));
            this.elapsedTime = 0;
        }
    }
        if(this.die){
            this.shot = false;
            this.direction =3;
            if(this.animation[this.direction].isDone()){
                this.removeFromWorld =true;
            }
        }
    };
    
    draw(ctx){
        const TICK = this.game.clockTick;

            this.animation[this.direction].drawFrame(this.game.clockTick, ctx, this.x, this.y,2);


        
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        ctx.strokeStyle = 'green';
        ctx.strokeRect(this.DB.x, this.DB.y, this.DB.width, this.DB.height);
    };

    updateBB() {
        if (this.direction == 0) this.BB = new BoundingBox(this.x, this.y, 955, 85)
        else this.BB = new BoundingBox(this.x -855, this.y,  900, 85)
        if (this.direction == 0) this.DB = new BoundingBox(this.x+5, this.y, 55, 85)
        else this.DB = new BoundingBox(this.x -22, this.y,  58, 85)
};
}
