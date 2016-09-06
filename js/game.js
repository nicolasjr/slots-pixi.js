const helper = new Helper();
const game = new Game();
game.init();

function Game() {
	const totalReels = 5;
	var slotMachine = new SlotMachine(totalReels);

	var ui = new GameUi();

	var totalCoins = 2000;

	var bet = 20;
	const minBet = 20;
	const maxBet = 100;
	const deltaBet = 10;

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

		if (totalCoins - bet < 0) {
			alert("Not enough coins!");
			return;
		}

		if (slotMachine.spin(bet, spinResult)) {
			totalCoins -= bet;
			ui.updateCoinsLabel(totalCoins);
		}
	};

	function spinResult(result) {
		totalCoins += result;
		ui.updateCoinsLabel(totalCoins);

		isSpinning = false;
    };

    function gameLoop() {
    	requestAnimationFrame(gameLoop);
    	slotMachine.update();
    	renderer.render(stage);
    };

    function ready() {
    	slotMachine.create();
    	ui.create();
    	ui.onSpin = spin;
    	ui.onIncreaseCurrentBet = increaseCurrentBet;
    	ui.onDecreaseCurrentBet = decreaseCurrentBet;
    	ui.updateCoinsLabel(totalCoins).updateBetLabel(bet);
    };

    function increaseCurrentBet() {
    	if (isSpinning)
    		return;
    	
        if (bet + deltaBet > maxBet) {
        	alert("You're already betting maximum.");
            return;
        }

		changeCurrentCoinsToSpin(deltaBet);
    };

    function decreaseCurrentBet() {
    	if (isSpinning)
    		return;

        if (bet - deltaBet < minBet) {
        	alert("You're already betting minimum.");
            return;
        }

		changeCurrentCoinsToSpin(deltaBet * -1);
    };

    function changeCurrentCoinsToSpin(delta) {
		bet += delta;
		ui.updateBetLabel(bet);
    };
};
