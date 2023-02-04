class shooter{
    constructor(game, x, y) {
        this.game = game;
		this.x = x;
		this.y = y;
		this.speed = 1;
        this.fireRate =2.1;
        this.elapsedTime = 4;
        this.bulletSpeed = 350;
        this.shot = false;
        this.die = false;

        this.directions = { left: 0, right: 1 };
        this.direction = this.directions.left;
        this.state = 0;
        this.removeFromWorld = false;
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    };
    loadAnimations() {

        let numFacing = 2;
        let numState = 3;
        for (var i = 0; i < numState; i++) {
            this.animations.push([]);
            for (var j = 0; j < numFacing; j++) {
                this.animations[i].push([]);
            }
        }
        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset("./shooter/WR.png"),0, 0, 34, 40, 8, 0.1, false, true, false);//walk right
        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset("./shooter/WR.png"),0, 0, 34, 40, 8, 0.1, true, true, false);//walk left

        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./shooter/shooting.png"),0, 0, 45, 41, 1, 0.1,false, true, false);//shoot right
        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./shooter/shooting.png"),0, 0, 45, 41, 1, 0.1,true, true, false);//shoot left

        this.animations[2][1] = new Animator(ASSET_MANAGER.getAsset("./shooter/dead.png"),0, 0, 44, 32, 12, 0.1, false, false, false);//dead right
        this.animations[2][0] = new Animator(ASSET_MANAGER.getAsset("./shooter/dead.png"),0, 0, 44, 32, 12, 0.1, true, false, false);//dead left
    }
    update(){

        const TICK = this.game.clockTick;
        this.elapsedTime += TICK;

        if(this.x <= 1160) {
            this.state = 0
            this.direction = 1;
            this.speed +=55;
        }else if(this.x>1500){
            this.state = 0;
            this.direction = 0;
            this.speed -=55;
        }

        this.x += this.speed * TICK * params.NPCSpeed;
        this.updateBB();

        var that = this;
        this.game.entities.forEach (function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)){
                if(entity instanceof Zero){
                    that.speed = 0;
                    that.state = 1;
                    that.direction = 0;
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
            this.state = 2;
            this.direction =0;
            if(this.animations[this.state][this.direction].isDone()){
                this.removeFromWorld =true;
            }
        }
    };
    
    draw(ctx){
        const TICK = this.game.clockTick;

            this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y,2);


        
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        ctx.strokeStyle = 'green';
        ctx.strokeRect(this.DB.x, this.DB.y, this.DB.width, this.DB.height);
    };

    updateBB() {
        if (this.direction == 1) this.BB = new BoundingBox(this.x - this.game.camera.x, this.y, 955, 85)
        else this.BB = new BoundingBox(this.x -855 - this.game.camera.x, this.y,  900, 85)
        if (this.direction == 1) this.DB = new BoundingBox(this.x+5 - this.game.camera.x, this.y, 55, 85)
        else this.DB = new BoundingBox(this.x -22 - this.game.camera.x, this.y,  58, 85)
    };
}