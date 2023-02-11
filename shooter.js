class shooter{
    constructor(game, x, y) {
        this.game = game;
		this.x = x;
		this.y = y;
        this.leftRange = this.x - 200;
		this.rightRange = this.x + 200;
		this.speed = 55;
        this.fireRate =2.1;
        this.elapsedTime = 4;
        this.bulletSpeed = 350;
        this.shot = false;
        this.die = false;
        this.hitCount = 0;

        this.scale = 1.25;
        this.BBW = 25 * this.scale;
        this.BBH = 65 * this.scale;


        this.directions = { left: 0, right: 1 };
        this.direction = this.directions.right;
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

        if(this.x <= this.leftRange) {
            this.state = 0
            this.direction = 1;
            this.speed +=115;
        }else if(this.x>this.rightRange){
            this.state = 0;
            this.direction = 0;
            this.speed -=115;
        }

        this.x += this.speed * TICK * params.NPCSpeed;
        this.updateBB();

            let self = this;
            this.game.entities.forEach(function (entity) {
                if (entity instanceof Zero) {                   
                    // if player in attack range
                    if (entity.BB && self.AR.collide(entity.BB)) {
                        self.speed = 0;
                        self.state = 1;
                        self.direction = 0;
                        self.shot = true;
                        if(entity.BB && self.DB.collide(entity.BB)){
                            self.hitCount += 1;
                            console.log(self.hitCount);
                            if(self.hitCount == 50){
                                self.die = true;
                            }
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
        console.log(this.game);
        const TICK = this.game.clockTick;
        this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y,2);
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.AR.x-this.game.camera.x, this.AR.y,this.AR.width, this.AR.height);
        ctx.strokeStyle = "Green";
        ctx.strokeRect(this.DB.x-this.game.camera.x, this.DB.y,this.DB.width, this.DB.height);

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 10, this.y, this.BBW, this.BBH);
        if (this.direction == 1) {
            this.DB = new BoundingBox(this.BB.x, this.BB.y, (this.BB.width * 1.5), this.BB.height);
            this.AR = new BoundingBox(this.BB.x, this.BB.y, (this.BB.width * 11), this.BB.height);
        } else {
            this.DB = new BoundingBox(this.BB.x-30, this.BB.y, (this.BB.width * 1.5), this.BB.height);
            this.AR = new BoundingBox(this.BB.x-330, this.BB.y, (this.BB.width * 11), this.BB.height);
        }
    };
}