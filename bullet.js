class bullet{

    constructor(game,Ex,Ey,facingDir,bulletspeed,size){
        this.game = game;

        this.x = Ex + 90;
        this.y = Ey + 20;

        this.size= size;
        this.speed = bulletspeed;
        this.anamation = facingDir;
        this.removeFromWorldValue = 0;
        this.removeFromWorld = false;
        this.animationList = [];
        this.animationIndex = facingDir;

        this.animationList[0] = new Animator(ASSET_MANAGER.getAsset("./shooter/BR.png"),0,0,45,21,1,0.1,false,true,false);  
        this.animationList[1] = new Animator(ASSET_MANAGER.getAsset("./shooter/BR.png"),0,0,45,21,1,0.1,true,true,false);
        this.animationList[3] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Spine.png"),0,5,10,10,1,0.1, false, true, false);
        this.animationList[2] = new Animator(ASSET_MANAGER.getAsset("./Kunoichi/Spine.png"),0,5,10,10,1,0.1, true, true, false);

        this.updateBB();
        
    };

    update(){ 
        const TICK = this.game.clockTick;

        if(this.anamation==0){
            this.x += this.speed * TICK * params.NPCSpeed;
        }else if(this.anamation==1){
            this.x -= this.speed * TICK * params.NPCSpeed;
        }
        
        // for spine
        if(this.anamation==3){
            this.x += this.speed * TICK * params.NPCSpeed;
        }else if(this.anamation==2){
            this.x -= this.speed * TICK * params.NPCSpeed;
        }

        var that = this;
        this.game.entities.forEach (function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)){
                if(entity instanceof Zero){
                    entity.isDying = true;
                    that.removeFromWorld = true;
                }
            }
        });

        this.updateBB();
    };

    draw(ctx){
        this.animationList[this.animationIndex].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y,this.size);
    };

    updateBB() {
        this.BB = new BoundingBox(this.x+25 - this.game.camera.x, this.y, 20, 5);
    };

}