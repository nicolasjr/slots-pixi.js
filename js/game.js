const helper = new Helper();
const game = new Game();
game.init();

function Game() {
	const totalReels = 5;
	var slotMachine = new SlotMachine(totalReels);

	var totalCoins = 2000;
	var onTotalCoinsUpdate;

	var coinsToSpin = 20;
	const minCoinsToSpin = 20;
	const maxCoinsToSpin = 100;
	const deltaCoinsToSpin = 10;
	var onCoinsToSpinUpdate;

	var isSpinning = false;

	this.init = function() {

		PIXI.loader
			.add(helper.createSlotTypeFileNameArray(Slots))
			.add("images/machine.png")
			.load(ready);

		document.body.appendChild(renderer.view);

		requestAnimationFrame(gameLoop);
	};

	function spin() {
		if (isSpinning)
			return;

		isSpinning = true;

		if (totalCoins - coinsToSpin < 0) {
			alert("Not enough coins!");
			return;
		}

		if (slotMachine.spin(coinsToSpin, spinResult)) {
			totalCoins -= coinsToSpin;
			onTotalCoinsUpdate(totalCoins);
		}
	}

	function spinResult(result) {
		totalCoins += result;
		onTotalCoinsUpdate(totalCoins);

		isSpinning = false;
    };

    function gameLoop() {
    	requestAnimationFrame(gameLoop);
    	slotMachine.update();
    	renderer.render(stage);
    };

    function ready() {
    	slotMachine.create();
		createCoinsLabel();
		createCoinsToSpinLabel();
		createCurrentCoinsToSpinController();
		createSpinButton();
    };

    function createCoinsLabel() {
		const text = new PIXI.Text(totalCoins, {font:"50px Arial", fill:"white"});
		text.position = { x: backgroundWidth / 2 - 30, y: backgroundHeight - 50};

		const square = helper.createSquare(backgroundWidth / 2 - 40, backgroundHeight - 55, 75, 40);
		square.addChild(text);
		helper.addToScene(square);

		onTotalCoinsUpdate = function(total) {
			text.text = total;
		};
    };

    function createCoinsToSpinLabel() {
		const text = new PIXI.Text(coinsToSpin, {font:"50px Arial", fill:"white"});
        text.position = { x: backgroundWidth / 2 - 30, y: backgroundHeight - 100};

		const square = helper.createSquare(backgroundWidth / 2 - 40, backgroundHeight - 105, 75, 40);
        square.addChild(text);
        helper.addToScene(square);

        onCoinsToSpinUpdate = function(total) {
            text.text = total;
        };
    };

    function createCurrentCoinsToSpinController() {
		const decrease = helper.createSquare(backgroundWidth / 2 - 90, backgroundHeight - 105, 40, 40)
								.setInteractive(true);
		decrease.on('mouseup', decreaseCurrentCoinsToSpin);
		helper.addToScene(decrease);

		const increase = helper.createSquare(backgroundWidth / 2 + 45, backgroundHeight - 105, 40, 40)
								.setInteractive(true);
		increase.on('mouseup', increaseCurrentCoinsToSpin);
		helper.addToScene(increase);
    };

    function createSpinButton() {
		const spinButton = helper.createSquare(backgroundWidth - 120, backgroundHeight - 105, 100, 100)
								 .setInteractive(true);
        spinButton.on('mouseup', spin);
        helper.addToScene(spinButton);
    }

    function increaseCurrentCoinsToSpin() {
        if (coinsToSpin + deltaCoinsToSpin > maxCoinsToSpin)
            return;

		changeCurrentCoinsToSpin(deltaCoinsToSpin);
    };

    function decreaseCurrentCoinsToSpin() {
        if (coinsToSpin - deltaCoinsToSpin < minCoinsToSpin)
            return;

		changeCurrentCoinsToSpin(deltaCoinsToSpin * -1);
    };

    function changeCurrentCoinsToSpin(delta) {
		coinsToSpin += delta;
		onCoinsToSpinUpdate(coinsToSpin);
    };
};
