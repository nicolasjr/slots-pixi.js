const backgroundWidth = 1000;
const backgroundHeight = 667;

const stage = new PIXI.Container(),
    renderer = PIXI.autoDetectRenderer(backgroundWidth, backgroundHeight);

const Slots = [
	"slot-dealer",
	"slot-winner",
	"slot-wildcard",
	"slot-card-green",
	"slot-card-red",
	"slot-card-brown",
	"slot-card-blue"
];

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

	this.init = function() {

		PIXI.loader
			.add(helper.createSlotTypeFileNameArray(Slots))
			.add("images/machine.png")
			.load(ready);

		window.addEventListener("keydown", function(e) {
		    if (e.keyCode === 13)
		        spin();
		    else if (e.keyCode === 187)
		        increaseCurrentCoinsToSpin();
		    else if (e.keyCode === 189)
		        decreaseCurrentCoinsToSpin();
		});

		document.body.appendChild(renderer.view);

		requestAnimationFrame(gameLoop);
	};

	function spin() {
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

		const square = helper.createSquare({x: backgroundWidth / 2 - 40, y: backgroundHeight - 55, w: 75, h: 40});
		square.addChild(text);
		helper.addToScene(square);

		onTotalCoinsUpdate = function(total) {
			text.text = total;
		};
    };

    function createCoinsToSpinLabel() {
		const text = new PIXI.Text(coinsToSpin, {font:"50px Arial", fill:"white"});
        text.position = { x: backgroundWidth / 2 - 30, y: backgroundHeight - 100};

		const square = helper.createSquare({x: backgroundWidth / 2 - 40, y: backgroundHeight - 105, w: 75, h: 40});
        square.addChild(text);
        helper.addToScene(square);

        onCoinsToSpinUpdate = function(total) {
            text.text = total;
        };
    };

    function createCurrentCoinsToSpinController() {
		const decrease = helper.createSquare({x: backgroundWidth / 2 - 90, y: backgroundHeight - 105, w: 40, h: 40});
		decrease.addChild(new PIXI.Text("-", {font:"50px Arial", fill:"white"}));
		decrease.interactive = true;
		decrease.on('mouseup', decreaseCurrentCoinsToSpin);
		helper.addToScene(decrease);

		const increase = helper.createSquare({x: backgroundWidth / 2 + 45, y: backgroundHeight - 105, w: 40, h: 40});
		increase.addChild(new PIXI.Text("+", {font:"50px Arial", fill:"white"}));
		increase.interactive = true;
		increase.on('mouseup', increaseCurrentCoinsToSpin);
		helper.addToScene(increase);
    };

    function createSpinButton() {
		const spinButton = helper.createSquare({x: backgroundWidth - 120, y: backgroundHeight - 105, w: 100, h: 100});
		spinButton.interactive = true;
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
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--)
        if (this[i] === obj)
            return true;
    return false;
};

Array.prototype.last = function(){
    return this[this.length - 1];
};
