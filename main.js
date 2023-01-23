const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./Sprites/main.png");
ASSET_MANAGER.queueDownload("./Sprites/bg1.png");
ASSET_MANAGER.queueDownload("./shooter/WR.png");
ASSET_MANAGER.queueDownload("./shooter/dead.png");
ASSET_MANAGER.queueDownload("./shooter/BR.png");
ASSET_MANAGER.queueDownload("./shooter/shooting.png");
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	

	gameEngine.init(ctx);
	gameEngine.addEntity(new Zero(gameEngine));
        gameEngine.addEntity(new shooter(gameEngine));
	gameEngine.addEntity(new bg1(gameEngine));

	gameEngine.start();
});
