function SlotMachine(totalReels) {

	const reels = [];

	const totalSlotsInReel = 15;

	const backgroundImage = "images/machine.png";
	const spinDuration = 1500;
	const intervalBetweenSpinStop = 500;

	const gameResult = new GameResult();

	var onSpinEnded;
	var isSpinning = false;

	var coinsInSpin;

	this.create = function() {
		setup(); 
		const mask = createMask();
		createSlotsCol(mask);
	};

	this.update = function() {
		$.each(reels, function(i, reel) {
			reel.spin();
		});
	};

	function setup() {
		var background = new PIXI.Sprite(PIXI.loader.resources[backgroundImage].texture);
		background.width = backgroundWidth;
		background.height = backgroundHeight;

		helper.addToScene(background);
	};

	function createMask() {
		var mask = helper.createSquare(0, 92, window.innerWidth, 433);
		helper.addToScene(mask);
		return mask;
	};

	function createSlotsCol(mask) {
		for (var i = 0; i < totalReels; i++) {
			var col = new Reel(totalSlotsInReel, i, mask);
			col.create();
			reels.push(col);
		}
	};

	this.spin = function(coins, callback) {
		if (isSpinning)
			return false;

		onSpinEnded = callback;
		coinsInSpin = coins;

		isSpinning = true;
		$.each(reels, function(i, reel) {
			reel.startSpinning();
		});

		setTimeout(function() { endSpin(); }, spinDuration);

		return true;
	};

	function endSpin() {
		$.each(reels, function(i, reel) {
			stopReelSpin(i, reel);
		});

		setTimeout(function() {
			isSpinning = false;

			calculateGameResult();
		}, (reels.length) * intervalBetweenSpinStop);
	};

	function stopReelSpin(index, reel) {
		setTimeout(function() {
			reel.endSpin();
		}, index * intervalBetweenSpinStop);
	};

	function calculateGameResult() {
		const resultReels = []
        $.each(reels, function(i, reel) {
            resultReels.push(reel.getResult());
        });

		onSpinEnded(gameResult.calculateResult(coinsInSpin, resultReels));
	};

	return this;
};
