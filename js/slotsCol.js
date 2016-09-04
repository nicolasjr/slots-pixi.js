function SlotsCol(totalSlots, colId, mask) {

	this.totalSlots = totalSlots;
	this.id = colId;
	this.mask = mask;
	
	this.isSpinning = false;

	this.slots = [];
	this.positionY = 0;
	
	this.anchorPosX = 125;
	this.deltaPosX = 158;

	this.anchorPosY = -50;
	this.deltaPosY = 150;

	this.spinSpeed = 0;
	this.maxSpinSpeed = 26;

	return this;
}

SlotsCol.prototype.create = function() {
	const insertedTypes = [];
	for(var i = 0; i < this.totalSlots; i++) {

		// while ()
		var pos = Math.floor(Math.random() * Slots.length);

		var slot = new Slot(Slots[pos], this.mask);
		slot.create();
		this.slots.push(slot);
		
		addToScene(slot.sprite);
	}

	this.positionSlotsInCol();
};

SlotsCol.prototype.positionSlotsInCol = function() {

	var col = this;
	$.each(this.slots, function(i, slot) {
		slot.sprite.position.x = col.anchorPosX + (col.id * col.deltaPosX);
		slot.sprite.position.y = col.positionY + col.anchorPosY + (i * col.deltaPosY);
	});
}

SlotsCol.prototype.spin = function() {
	if (!this.isSpinning)
		return;

	this.moveSlotsWithSpeed(this.spinSpeed);
};

SlotsCol.prototype.startSpinning = function() {
	this.isSpinning = true;

	var col = this;
	$({ speed: 0 }).animate({ speed: col.maxSpinSpeed }, {
		duration: 1000,
		step: function(now) {
			col.spinSpeed = now;
		}
	});
};

SlotsCol.prototype.moveSlotsWithSpeed = function(speed) {
	$.each(this.slots, function(i, slot) {
		slot.sprite.position.y += speed;
	});

	this.positionY += speed;

	if (this.positionY >= this.deltaPosY)
		this.resetColPosition();
};

SlotsCol.prototype.resetColPosition = function() {
	var lastSlot = this.slots[this.slots.length - 1];
	this.slots.pop(lastSlot);

	this.slots.splice(0, 0, lastSlot);

	this.positionY -= this.deltaPosY;
	lastSlot.sprite.position.y = this.slots[1].sprite.position.y - this.deltaPosY;
};

SlotsCol.prototype.endSpin = function() {
	this.isSpinning = false;

	this.endSpinAnimation();

	// var spinSpeed = this.spinSpeed;
	// var col = this;
	// $({ speed: 0 }).animate({ speed: spinSpeed }, {
	// 	duration: 0,
	// 	step: function(now) {
	// 		col.moveSlotsWithSpeed(spinSpeed - now);
	// 	},
	// 	complete: function() { col.endSpinAnimation(); }
	// });
};

SlotsCol.prototype.endSpinAnimation = function() {
	var col = this;

	const isCloserToEnd = col.positionY > col.deltaPosY * 0.66667 ;

	const maxPos = isCloserToEnd ? 150 : col.positionY;
	const minPos = isCloserToEnd ? col.positionY : 0;

	$({ y: minPos }).animate({ y: maxPos }, {
		duration: 750,
		easing: "easeOutBounce",
		step: function(now) {
			col.positionY = isCloserToEnd ? minPos + (now - minPos) : maxPos - now;
			col.positionSlotsInCol();
		},
		complete: function() { 
			if (isCloserToEnd) col.resetColPosition(); 
		}
	});
}
