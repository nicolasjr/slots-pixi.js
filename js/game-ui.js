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
		createCurrentBetController();
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

    function createCurrentBetController() {
    	const radius = 20;
		helper.addToScene(createLabeledButton("-", backgroundWidth / 2 - 60, backgroundHeight - 85, radius, function() {
			ui.onDecreaseCurrentBet();
		}));

		helper.addToScene(createLabeledButton("+", backgroundWidth / 2 + 55, backgroundHeight - 85, radius, function() {
			ui.onIncreaseCurrentBet();
		}));
    };

    function createLabeledButton(label, x, y, r, callback) {
		const buttonLabel = new PIXI.Text(label, {font:"50px Arial", fill:"white"});
		
		const button = helper.createCircle(0, 0, r).setInteractive(true);
		button.position = { x: x, y: y };
		button.on('mouseup', callback);
		button.addChild(buttonLabel);
		helper.parentCenter(buttonLabel);

		return button;
    };

    function createSpinButton() {
    	helper.addToScene(createLabeledButton("SPIN", backgroundWidth - 120, backgroundHeight - 75, 50, function() {
			ui.onSpin();
		}));
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
