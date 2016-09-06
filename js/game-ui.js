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

	function createCoinsLabel() {
		coinsLabel = helper.parentCenter(createLabel({ x: 15, y: 20}));
		helper.addToScene(createSquare(80, 40, {x: backgroundWidth / 2 - 40, y: backgroundHeight - 55}, coinsLabel));
    };

    function createBetLabel() {
		betLabel = helper.parentCenter(createLabel({ x: 22.5, y: 20}));
        helper.addToScene(createSquare(80, 40, {x: backgroundWidth / 2 - 40, y: backgroundHeight - 105}, betLabel));
    };

    function createLabel(pos) {
    	const l = new PIXI.Text("", {font:"50px Arial", fill:"white"})
    	l.position = pos;
    	return l;
    }

    function createSquare(width, height, pos, child) {
    	const square = helper.createSquare(0, 0, width, height);
		square.position = pos;
        square.addChild(child);
        return square;
    }

    function createCurrentBetController() {
    	const radius = 20;
    	var x = backgroundWidth / 2 - 60;
    	var y = backgroundHeight - 85;
		helper.addToScene(helper.createLabeledRoundButton("-", x, y, radius, function() {
			ui.onDecreaseCurrentBet();
		}));

		x = backgroundWidth / 2 + 60;
		y = backgroundHeight - 85;
		helper.addToScene(helper.createLabeledRoundButton("+", x, y, radius, function() {
			ui.onIncreaseCurrentBet();
		}));
    };

    function createSpinButton() {
    	const radius = 50;
    	const x = backgroundWidth - 120;
    	const y = backgroundHeight - 75;
    	helper.addToScene(helper.createLabeledRoundButton("SPIN", x, y, radius, function() {
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
