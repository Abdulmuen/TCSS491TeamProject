class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.Zero = new Zero(this.game, 1 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
        this.loadlevel(1 * PARAMS.BLOCKWIDTH, 2.45 * PARAMS.BLOCKWIDTH);
    };

    clearEntities() {
        this.game.entities.forEach(function d(entity) {
            entity.removeFromWorld = true;
        });
    }

    addMain(x, y) {
        this.clearEntities();
        this.x = 0;
        this.Zero.x = x;
        this.Zero.y = y;
        this.game.addEntity(this.Zero);
    }
    loadGame(){
        this.clearEntities();
        this.game.addEntity(this.Zero1);
        this.game.addEntity(this.shooter);
        this.game.addEntity(this.boss); 
        this.game.addEntity(new bg1(gameEngine));
        this.game.addEntity(new Hud(gameEngine));

    }
    loadlevel(x, y) {
        this.clearEntities();
        this.x = 0;
        this.Zero.x = x;
        this.Zero.y = y;

        this.game.addEntity(this.Zero);
        gameEngine.addEntity(new bg1(gameEngine, this.x));
        gameEngine.addEntity(new gr1(gameEngine, this.x));
        gameEngine.addEntity(new shooter(gameEngine, 1160, 255));
        gameEngine.addEntity(new shooter(gameEngine, 1345, 255));
        //gameEngine.addEntity(new boss((gameEngine,1400,177.5)));
    }

    update() {
    
        let midpoint = PARAMS.CANVAS_WIDTH/2;

        if (this.x < this.Zero.x - midpoint) this.x = this.Zero.x - midpoint;

    }

    draw(ctx) {

    }
}
