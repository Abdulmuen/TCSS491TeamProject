const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
//main character assets
ASSET_MANAGER.queueDownload("./Sprites/main.png");

//backgrownd assets
ASSET_MANAGER.queueDownload("./Sprites/t.png");
ASSET_MANAGER.queueDownload("./Sprites/win.png");
ASSET_MANAGER.queueDownload("./Sprites/bg0.png");
ASSET_MANAGER.queueDownload("./Sprites/bg3.png");
ASSET_MANAGER.queueDownload("./Sprites/gr1.png");
ASSET_MANAGER.queueDownload("./Sprites/gr2.png");
ASSET_MANAGER.queueDownload("./Sprites/go1.png");
ASSET_MANAGER.queueDownload("./Sprites/door.png");
ASSET_MANAGER.queueDownload("./background/first_1.png");
ASSET_MANAGER.queueDownload("./background/first_2.png");
ASSET_MANAGER.queueDownload("./background/first_3.png");
ASSET_MANAGER.queueDownload("./background/first_4.png");
ASSET_MANAGER.queueDownload("./background/mid_1.png");
ASSET_MANAGER.queueDownload("./background/mid_2.png");
ASSET_MANAGER.queueDownload("./background/mid_3.png");
ASSET_MANAGER.queueDownload("./background/mid_4.png");
ASSET_MANAGER.queueDownload("./background/back_1.png");
ASSET_MANAGER.queueDownload("./background/back_2.png");
ASSET_MANAGER.queueDownload("./background/back_3.png");
ASSET_MANAGER.queueDownload("./background/back_4.png");

//portal
ASSET_MANAGER.queueDownload("./Sprites/portal.png");

//shooter assset
ASSET_MANAGER.queueDownload("./shooter/WR.png");
ASSET_MANAGER.queueDownload("./shooter/dead.png");
ASSET_MANAGER.queueDownload("./shooter/BR.png");
ASSET_MANAGER.queueDownload("./shooter/shooting.png");
ASSET_MANAGER.queueDownload("./shooter/turn.png");

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

//sniper
ASSET_MANAGER.queueDownload("./snipersprite/snipershooting.png")
ASSET_MANAGER.queueDownload("./snipersprite/snipershootingreverse.png")
ASSET_MANAGER.queueDownload("./snipersprite/enemydeath.png")
ASSET_MANAGER.queueDownload("./snipersprite/enemydeathreverse.png")

// trap asset
ASSET_MANAGER.queueDownload("./Laser/on.png");
ASSET_MANAGER.queueDownload("./Laser/off.png");
ASSET_MANAGER.queueDownload("./Laser/turning on.png");
ASSET_MANAGER.queueDownload("./Laser/turning off.png");

//gangster
ASSET_MANAGER.queueDownload("./gangster/idle.png");
ASSET_MANAGER.queueDownload("./gangster/attack.png");
ASSET_MANAGER.queueDownload("./gangster/run.png");
ASSET_MANAGER.queueDownload("./gangster/dead.png");

//slowmotion
ASSET_MANAGER.queueDownload("./Sprites/slow2.png");
ASSET_MANAGER.queueDownload("./Sprites/slow.png");
ASSET_MANAGER.queueDownload("./Sprites/bilb.png");

ASSET_MANAGER.queueDownload("./sound/lose.wav");
ASSET_MANAGER.queueDownload("./sound/main-1.wav");
ASSET_MANAGER.queueDownload("./sound/main-3.wav");
ASSET_MANAGER.queueDownload("./sound/shoot.wav");
ASSET_MANAGER.queueDownload("./sound/mainattack.wav");
ASSET_MANAGER.queueDownload("./sound/boss1.wav");
ASSET_MANAGER.queueDownload("./sound/1.wav");
ASSET_MANAGER.queueDownload("./sound/2.wav");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
		ASSET_MANAGER.autoRepeat("./sound/main-3.wav");
	ASSET_MANAGER.autoRepeat("./sound/main-1.wav");
	PARAMS.BLOCKWIDTH = 100;

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);
	gameEngine.addEntity(new Startscreen(gameEngine));
	//gameEngine.addEntity(new SceneManager(gameEngine));

	gameEngine.start();

});
