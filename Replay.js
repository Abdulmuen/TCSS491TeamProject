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
            

        ctx.font = "50px Arial";
        ctx.fillStyle = 'Red';
        ctx.textAlign = 'center';
        ctx.fillText("Press R to Restart", 448, 274);

    


    };
}
