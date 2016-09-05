function SlotMachine(totalReels) {

	const reels = [];

	const totalSlotsInReel = 15;

	const backgroundImage = "images/machine.png";
	const spinDuration = 1500;

	const intervalBetweenSpinStop = 500;

	var isSpinning = false;

	this.create = function() {
		setup(); 
		createMask();
		createSlotsCol();

		var slotMachine = this;
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
		this.mask = new PIXI.Graphics();
		this.mask.beginFill();
		this.mask.drawRect(0, 92, window.innerWidth, 433);
		this.mask.endFill();

		addToScene(this.mask)
	}

	function createSlotsCol() {
		for (var i = 0; i < totalReels; i++) {
			var col = new Reel(totalSlotsInReel, i, this.mask);
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
		var slotMachine = this;

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
