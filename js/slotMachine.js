function SlotMachine(totalReels) {

	const reels = [];

	const totalSlotsInReel = 15;

	const backgroundImage = "images/machine.png";
	const spinDuration = 1500;

	const intervalBetweenSpinStop = 500;

	var isSpinning = false;

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

		addToScene(background);
	};

	function createMask() {
		var mask = new PIXI.Graphics();
		mask.beginFill();
		mask.drawRect(0, 92, window.innerWidth, 433);
		mask.endFill();

		addToScene(mask)

		return mask;
	}

	function createSlotsCol(mask) {
		for (var i = 0; i < totalReels; i++) {
			var col = new Reel(totalSlotsInReel, i, mask);
			col.create();
			reels.push(col);
		}
	};

	this.spin = function() {
		if (isSpinning)
			return;

		isSpinning = true;
		$.each(reels, function(i, reel) {
			reel.startSpinning();
		});

		setTimeout(function() { endSpin(); }, spinDuration);
	};

	function endSpin() {
		$.each(reels, function(i, reel) {
			stopReelSpin(i, reel);
		});

		setTimeout(function() {
			isSpinning = false;
		}, (reels.length + 1) * intervalBetweenSpinStop);
	};

	function stopReelSpin(index, reel) {
		setTimeout(function() {
			reel.endSpin();
		}, index * intervalBetweenSpinStop);
	};

	return this;
}
