class gr1 {
    constructor(game,x,y){
        this.game = game;
        this.x = x;
        this.y = y;
        this.bb = new BoundingBox(this.x,this.y,500,40);
    }

    update() {

    }

    draw(ctx) {

        ctx.drawImage(ASSET_MANAGER.getAsset("./Sprites/gr2.png"), this.x- this.game.camera.x,this.y);
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.bb.x-this.game.camera.x, this.bb.y,this.bb.width, this.bb.height);
    }
}