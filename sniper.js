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

        this.scale = 1.25;
        this.BBW = 25 * this.scale;
        this.BBH = 65 * this.scale;


        this.shootinganimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/snipershooting.png"), 0, 0, 44, 20, 8,0.2, false,true,false);
        this.shootingreverseanimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/snipershootingreverse.png"), 0, 0, 44, 20, 8,0.2, false,true,false);

        this.deathanimator = new Animator(ASSET_MANAGER.getAsset("./enemydeath/enemydeath.png"), 0, 0, 44, 21, 5, 0.15, false,true,false);
        this.deathanimatorreverse = new Animator(ASSET_MANAGER.getAsset("./enemydeath/enemydeathreverse.png"),0, 0, 44, 21, 5, 0.15, false,true,false);
        this.updateBB();
    };

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
            if (this.elapsedTime >= this.fireRate) {
                if(this.direction == 0){
                    this.game.addEntityToFrontOfList(new bullet(gameEngine, this.x + 15, this.y - 5 , this.direction, this.bulletSpeed,0.4));
                    this.elapsedTime = 0;
                }
                else{
                    this.game.addEntityToFrontOfList(new bullet(gameEngine, this.x - 140, this.y - 5 , this.direction, this.bulletSpeed,0.4));
                    this.elapsedTime = 0;
                }
            }
        
            this.updateBB();

    };


    draw(ctx) {
        const TICK = this.game.clockTick;
        if (this.direction == 1) {
            this.shootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
        } else {
            this.shootinganimator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.size);
        }
        ctx.strokeStyle = "Green";
        ctx.strokeRect(this.DB.x-this.game.camera.x, this.DB.y,this.DB.width, this.DB.height);
    }
}