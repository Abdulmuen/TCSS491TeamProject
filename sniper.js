class Sniper {
    constructor(game, x, y, direction) {
        this.game = game
        this.x = x
        this.y = y
        this.direction = direction
        this.size = 3

        this.fireRate = 2;
        this.elapsedTime = 3
        this.bulletSpeed = 150;
        this.shot = true;
        this.scale = 1.25;
        this.BBW = 25 * this.scale;
        this.BBH = 65 * this.scale;
        this.die = false;
        this.animations = [];
        this.state = 0;
        this.hitCount = 0;
        this.removeFromWorld = false;
        this.loadAnimations();
        this.updateBB();
    };
    loadAnimations() {

        let numFacing = 2;
        let numState = 2;
        for (var i = 0; i < numState; i++) {
            this.animations.push([]);
            for (var j = 0; j < numFacing; j++) {
                this.animations[i].push([]);
            }
        }

        this.animations[0][0] = new Animator(ASSET_MANAGER.getAsset("./snipersprite/snipershooting.png"), 0, 0, 44, 20, 8,0.2, false,true,false);//shoot right
        this.animations[0][1] = new Animator(ASSET_MANAGER.getAsset("./snipersprite/snipershootingreverse.png"), 0, 0, 44, 20, 8,0.2, false,true,false);//shoot left

        this.animations[1][0] = new Animator(ASSET_MANAGER.getAsset("./snipersprite/enemydeath.png"), 0, 0, 44, 21, 5, 0.3, false,true,false);//dead right
        this.animations[1][1] = new Animator(ASSET_MANAGER.getAsset("./snipersprite/enemydeathreverse.png"),0, 0, 44, 21, 5, 0.3, false,true,false);//dead left
    }
    updateBB() { 
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x , this.y, this.BBW, this.BBH);
        if (this.direction == 0) {

            this.DB = new BoundingBox(this.BB.x +28, this.BB.y, (this.BB.width * 3.5), this.BB.height-15);
        } else {
            this.DB = new BoundingBox(this.BB.x+13, this.BB.y, (this.BB.width * 3.5), this.BB.height-15);
        }
    };

    update() {
        const TICK = this.game.clockTick
        this.elapsedTime += TICK
            /*if (this.elapsedTime >= this.fireRate) {
                if(this.direction == 0){
                    this.state = 1;
                    this.game.addEntityToFrontOfList(new bullet(gameEngine, this.x + 15, this.y - 5 , this.direction, this.bulletSpeed,0.4));
                    this.elapsedTime = 0;
                }
                else{
                    this.state = 0;
                    this.game.addEntityToFrontOfList(new bullet(gameEngine, this.x - 140, this.y - 5 , this.direction, this.bulletSpeed,0.4));
                    this.elapsedTime = 0;
                }
            }*/
            let self = this;
            this.game.entities.forEach(function (entity) {
                if (entity instanceof Zero) {                   
                    // if player in attack range
                    if (entity.BB && self.DB.collide(entity.BB)) {
                            self.hitCount += 1;
                            console.log(self.hitCount);
                            if(self.hitCount == 50){
                                self.die = true;   
                            }
                    }
                    
                }
            });

        if(this.shot){
            if (this.elapsedTime >= this.fireRate && this.removeFromWorldValue != 1) {
                this.game.addEntityToFrontOfList(new bullet(gameEngine, this.x-200, this.y, this.direction, this.bulletSpeed,0.4));
                this.elapsedTime = 0;
            }
        }
        
        if(this.die){
            this.shot = false;
            this.state = 1;
            if(this.animations[this.state][this.direction].isDone()){
                this.removeFromWorld =true;
            }
        }
    };


    draw(ctx) {
        const TICK = this.game.clockTick;
        this.animations[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y,this.size);
        ctx.strokeStyle = "Green";
        ctx.strokeRect(this.DB.x-this.game.camera.x, this.DB.y,this.DB.width, this.DB.height);
    }
}