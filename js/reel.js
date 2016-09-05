function Reel(totalSlots, colId, mask) {

	this.totalSlots = totalSlots;
	this.id = colId;
	this.mask = mask;
	
	this.isSpinning = false;

	this.slots = [];
	this.positionY = 0;
	
	this.deltaPosX = 158;
	this.anchorPosX = 125 + (this.id * this.deltaPosX);

	this.deltaPosY = 150;
	this.anchorPosY = -50;

	this.spinSpeed = 0;
	this.maxSpinSpeed = 25;

	this.animationSpeed;

	return this;
}

Reel.prototype.create = function() {
	this.insertedTypes = [];
	for(var i = 0; i < this.totalSlots; i++) {

		var pos = 0;
		do {
			pos = Math.floor(Math.random() * Slots.length);
			if (i >= Slots.length)
				break;
		} while (this.insertedTypes.contains(pos));
		
		this.insertedTypes.push(pos);

		var slot = new Slot(Slots[pos], this.mask);
		slot.create();
		this.slots.push(slot);
		
		addToScene(slot.sprite);
	}

	this.positionSlotsInCol();
};

Reel.prototype.positionSlotsInCol = function() {

	var reel = this;
	$.each(this.slots, function(i, slot) {
		slot.sprite.position.x = reel.anchorPosX;
		slot.sprite.position.y = reel.positionY + reel.anchorPosY + (i * reel.deltaPosY);
	});
}

Reel.prototype.spin = function() {
	if (!this.isSpinning)
		return;

	this.moveSlotsWithSpeed(this.spinSpeed);
};

Reel.prototype.startSpinning = function() {
	this.isSpinning = true;

	var reel = this;
	$({ speed: 0 }).animate({ speed: reel.maxSpinSpeed }, {
		duration: reel.animationSpeed,
		step: function(now) {
			reel.spinSpeed = now;
		}
	});
};

Reel.prototype.moveSlotsWithSpeed = function(speed) {
	$.each(this.slots, function(i, slot) {
		slot.sprite.position.y += speed;
	});

	this.positionY += speed;

	if (this.positionY >= this.deltaPosY)
		this.resetColPosition();
};

Reel.prototype.resetColPosition = function() {
	var lastSlot = this.slots.last();
	this.slots.pop(lastSlot);

	this.slots.splice(0, 0, lastSlot);

	this.positionY -= this.deltaPosY;
	lastSlot.sprite.position.y = this.slots[1].sprite.position.y - this.deltaPosY;
};

Reel.prototype.endSpin = function() {
	this.isSpinning = false;

	var spinSpeed = this.spinSpeed;
	var reel = this;
	$({ speed: reel.animationSpeed }).animate({ speed: spinSpeed }, {
		duration: 0,
		step: function(now) {
			reel.moveSlotsWithSpeed(spinSpeed - now);
		},
		complete: function() { reel.endSpinAnimation(); }
	});
};

Reel.prototype.endSpinAnimation = function() {
	var reel = this;

	const minPos = 0;
	const maxPos = reel.positionY;

	$({ y: minPos }).animate({ y: maxPos }, {
		duration: 1000,
		easing: "easeOutElastic",
		step: function(now) {
			reel.positionY = maxPos - now;
			reel.positionSlotsInCol();
		}
	});
}
