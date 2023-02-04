class Replay{
    constructor(game, x, y) {
        Object.assign(this, { game});
        
        this.game = game;
       

    };

    update(){
        if(this.game.keys["r"] ){
            this.removeFromWorld = true;
            
            this.game.addEntity(new SceneManager(this.game));
        }

    };
    
    draw(ctx){ 
            

        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/bg1.png"), 0,0);
        ctx.font = "50px Arial";
        ctx.fillStyle = 'Black';
        ctx.textAlign = 'center';
        ctx.fillText("Press R to Restart", 948, 374);

    


    };
}