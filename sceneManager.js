class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.Zero = new Zero(this.game, 1 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
        this.loadlevel(1 * PARAMS.BLOCKWIDTH, 2.45 * PARAMS.BLOCKWIDTH);
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    }

    loadlevel(x, y) {
        this.clearEntities();
        this.x = 0;
        this.Zero.x = x;
        this.Zero.y = y;

        this.game.addEntity(this.Zero);
    }

    update() {
    
    }

    draw(ctx) {

    }
}