const gameEngine = new GameEngine();

// add global parameters here
const PARAMS = {
    DEBUG: true,
    SCALE: 3,
    BITWIDTH: 16
};


const ASSET_MANAGER = new AssetManager();
//main character assets
ASSET_MANAGER.queueDownload("./Sprites/main.png");

//backgrownd assets
ASSET_MANAGER.queueDownload("./Sprites/bg1.png");
ASSET_MANAGER.queueDownload("./Sprites/gr1.png");

//shooter assset
ASSET_MANAGER.queueDownload("./shooter/WR.png");
ASSET_MANAGER.queueDownload("./shooter/dead.png");
ASSET_MANAGER.queueDownload("./shooter/BR.png");
ASSET_MANAGER.queueDownload("./shooter/shooting.png");

// boss asset
ASSET_MANAGER.queueDownload("./Kunoichi/Idle.png");
ASSET_MANAGER.queueDownload("./Kunoichi/Walk.png");
ASSET_MANAGER.queueDownload("./Kunoichi/Run.png");
ASSET_MANAGER.queueDownload("./Kunoichi/Attack_1.png");
ASSET_MANAGER.queueDownload("./Kunoichi/Attack_2.png");
ASSET_MANAGER.queueDownload("./Kunoichi/Cast.png");
ASSET_MANAGER.queueDownload("./Kunoichi/Jump.png");
ASSET_MANAGER.queueDownload("./Kunoichi/Hurt.png");
ASSET_MANAGER.queueDownload("./Kunoichi/Eating.png");
ASSET_MANAGER.queueDownload("./Kunoichi/Dead.png");
ASSET_MANAGER.queueDownload("./Kunoichi/Spine.png");

// trap asset
ASSET_MANAGER.queueDownload("./Laser/on.png");
ASSET_MANAGER.queueDownload("./Laser/off.png");
ASSET_MANAGER.queueDownload("./Laser/turning on.png");
ASSET_MANAGER.queueDownload("./Laser/turning off.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	PARAMS.BLOCKWIDTH = 100;

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);
	gameEngine.addEntity(new Startscreen(gameEngine));
	//gameEngine.addEntity(new SceneManager(gameEngine));

	gameEngine.start();
	
});
