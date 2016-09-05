function GameUi() {

	self.onSpin
	self.onIncreaseCurrentBet;
	self.onDecreaseCurrentBet;

	var betLabel;
	var coinsLabel;

	var ui = this;

	this.create = function() {
		createCoinsLabel();
		createBetLabel();
		createCurrentCoinsToSpinController();
		createSpinButton();
	};

	this.updateCurrentBet = function() {

	};

	function createCoinsLabel() {
		coinsLabel = new PIXI.Text("", {font:"50px Arial", fill:"white"});
		coinsLabel.position = { x: backgroundWidth / 2 - 30, y: backgroundHeight - 50};

		const square = helper.createSquare(backgroundWidth / 2 - 40, backgroundHeight - 55, 75, 40);
		square.addChild(coinsLabel);
		helper.addToScene(square);
    };

    function createBetLabel() {
		betLabel = new PIXI.Text("", {font:"50px Arial", fill:"white"});
        betLabel.position = { x: backgroundWidth / 2 - 30, y: backgroundHeight - 100};

		const square = helper.createSquare(backgroundWidth / 2 - 40, backgroundHeight - 105, 75, 40);
        square.addChild(betLabel);
        helper.addToScene(square);
    };

    function createCurrentCoinsToSpinController() {
		const decrease = helper.createSquare(backgroundWidth / 2 - 90, backgroundHeight - 105, 40, 40).setInteractive(true);
		decrease.on('mouseup', function() {
			ui.onDecreaseCurrentBet();
		});
		helper.addToScene(decrease);

		const increase = helper.createSquare(backgroundWidth / 2 + 45, backgroundHeight - 105, 40, 40).setInteractive(true);
		increase.on('mouseup', function() {
			ui.onIncreaseCurrentBet();
		});
		helper.addToScene(increase);
    };

    function createSpinButton() {
		const spinButton = helper.createSquare(backgroundWidth - 120, backgroundHeight - 105, 100, 100).setInteractive(true);
        spinButton.on('mouseup', function() {
        	ui.onSpin();
        });
        helper.addToScene(spinButton);
    };

    this.updateCoinsLabel = function(amount) {
    	coinsLabel.text = amount ? amount : "0";
    	return this;
    };

    this.updateBetLabel = function(amount) {
    	betLabel.text = amount ? amount : "0";
    	return this;
    };
};
