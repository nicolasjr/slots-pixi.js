function SlotMachine(totalSlotsCol) {

	this.slotsCol = [];

	this.totalSlotsInCol = 15;
	this.totalSlotsCol = totalSlotsCol;

	this.backgroundImage = "images/machine.png";
	this.spinDuration = 1500;

	this.intervalBetweenSpinStop = 500;

	this.isSpinning = false;

	return this;
}

SlotMachine.prototype.create = function() {
	this.setup(); 
	this.createMask();
	this.createSlotsCol();

	var slotMachine = this;
};

SlotMachine.prototype.update = function() {
	$.each(this.slotsCol, function(i, col) {
		col.spin();
	});
};

SlotMachine.prototype.setup = function() {
	var background = new PIXI.Sprite(PIXI.loader.resources[this.backgroundImage].texture);
	background.width = backgroundWidth;
	background.height = backgroundHeight;

	addToScene(background);
};

SlotMachine.prototype.createMask = function() {
	this.mask = new PIXI.Graphics();
	this.mask.beginFill();
	this.mask.drawRect(0, 92, window.innerWidth, 433);
	this.mask.endFill();

	addToScene(this.mask)
}

SlotMachine.prototype.createSlotsCol = function() {
	for (var i = 0; i < this.totalSlotsCol; i++) {
		var col = new SlotsCol(this.totalSlotsInCol, i, this.mask);
		col.create();
		this.slotsCol.push(col);
	}
};

SlotMachine.prototype.spin = function() {
	if (this.isSpinning)
		return;

	var slotMachine = this;

	this.isSpinning = true;

	$.each(this.slotsCol, function(i, col) {
		col.startSpinning();
	});

	setTimeout(function() { slotMachine.endSpin(); }, slotMachine.spinDuration);
};

SlotMachine.prototype.endSpin = function() {
	var slotMachine = this;

	$.each(this.slotsCol, function(i, col) {
		slotMachine.stopSpinSlotCol(i, col);
	});

	setTimeout(function() {
		slotMachine.isSpinning = false;
	}, (this.slotsCol.length + 1) * this.intervalBetweenSpinStop);
};

SlotMachine.prototype.stopSpinSlotCol = function(index, col) {
	setTimeout(function() {
		col.endSpin();
	}, index * this.intervalBetweenSpinStop);
};
