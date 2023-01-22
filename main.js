const gameEngine = new GameEngine();
const PARAMS = 1;
const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./Sprites/main.png");
ASSET_MANAGER.queueDownload("./Sprites/bg1.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");


	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;



	gameEngine.init(ctx);
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.addEntity(new Zero(gameEngine));
	gameEngine.addEntity(new bg1(gameEngine));
	

	gameEngine.start();
});
