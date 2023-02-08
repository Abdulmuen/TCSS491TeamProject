class Sniper {
    // Direction 0 = Left, 1 = Right
    constructor(game, spawnX, spawnY, direction) {
        this.game = game
        this.spawnX = spawnX
        this.spawnY = spawnY
        this.direction = direction
        this.animationspeed = .10;
        this.deathanimationspeed = .15
        this.size = 4.0

        this.health = 1;

        this.fireRate = 1;
        this.elapsedTime = 2
        this.bulletSpeed = 350;


        this.idleanimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/sniperidle.png"), 
        0, 0, 44, 20, 1, this.animationspeed);
        this.idlereverseanimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/sniperidlereverse.png"), 
        0, 0, 44, 20, 1, this.animationspeed);


        this.shootinganimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/snipershooting.png"), 
        0, 0, 44, 20, 8,0.5, false,true,false);
        this.shootingreverseanimator = new Animator(ASSET_MANAGER.getAsset("./snipersprite/snipershootingreverse.png"), 
        0, 0, 44, 20, 8,0.15, false,true,false);

        this.deathanimator = new Animator(ASSET_MANAGER.getAsset("./enemydeath/enemydeath.png"),
        0, 0, 44, 21, 5, this.deathanimationspeed);
        this.deathanimatorreverse = new Animator(ASSET_MANAGER.getAsset("./enemydeath/enemydeathreverse.png"),
        0, 0, 44, 21, 5, this.deathanimationspeed);
        this.updateBB();
    };

    updateBB() { 
        
    };

    update() {
        const TICK = this.game.clockTick
        this.elapsedTime += TICK
        if ((this.spawnX - this.game.camera.x > 100 && this.spawnX - this.game.camera.x < 1280)) {
            if (this.elapsedTime >= this.fireRate) {
                this.game.addEntityToFrontOfList(new bullet(gameEngine, this.spawnX-90, this.spawnY , 1, this.bulletSpeed,0.4));
                this.elapsedTime = 0;
            }
        }
            this.updateBB();

    };


    draw(ctx) {
        const TICK = this.game.clockTick;
        if (this.direction == 1) {
            this.shootinganimator.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size);
        } else {
            this.shootingreverseanimator.drawFrame(this.game.clockTick, ctx, this.spawnX - this.game.camera.x, this.spawnY, this.size);
        }
        
    }
}