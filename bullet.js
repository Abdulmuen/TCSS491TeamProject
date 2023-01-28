class bullet{

    constructor(game,Ex,Ey,facingDir,bulletspeed,size){
        this.game = game;

        this.x = Ex + 90;
        this.y = Ey + 20;

        this.size= size;
        this.speed = bulletspeed;
        this.anamation = facingDir;
        this.removeFromWorldValue = 0;
        this.animationList = [];
        this.animationIndex = facingDir;

        this.animationList[0] = new Animator(ASSET_MANAGER.getAsset("./shooter/BR.png"),0,0,45,21,1,0.1,false,true, false);  
        this.animationList[1] = new Animator(ASSET_MANAGER.getAsset("./shooter/BR.png"),0,0,45,21,1,0.1,true,true, false);

        this.updateBB();
        
    };

    update(){ 
        const TICK = this.game.clockTick;
        if(this.anamation==0){
            this.x += this.speed * aTICK * params.NPCSpeed;
        }else if(this.anamation==1){
            this.x -= this.speed * TICK * params.NPCSpeed;
        }
        var that = this;
        this.game.entities.forEach (function (entity) {
            if(entity.BB && that.BB.collide(entity.BB)){
                if(entity instanceof Zero){
                    entity.isDying = true;
                    that.remove();
                    
            }
            }
        });

        this.updateBB();
    };
    remove(){
        this.removeFromWorldValue = 1;
        this.BB = new BoundingBox(0, 0, 0, 0);
        this.x = -999;
        this.y = -999;
    }
    draw(ctx){

        this.animationList[this.animationIndex].drawFrame(this.game.clockTick, ctx, this.x, this.y,this.size);

    };
    updateBB() {
        this.BB = new BoundingBox(this.x+25, this.y, 20, 5);

};

}
