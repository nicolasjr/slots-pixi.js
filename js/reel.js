function Reel(totalSlots, colId, mask) {

	this.id = colId;
	
	var isSpinning = false;

	const slots = [];
	var positionY = 0;
	
	const deltaPosX = 158;
	const anchorPosX = 125 + (this.id * deltaPosX);

	const deltaPosY = 150;
	const anchorPosY = -50;

	var spinSpeed = 0;
	const maxSpinSpeed = 25;

	const animationSpeed = 500;

	Reel.prototype.create = function() {
		const insertedTypes = [];
		for(var i = 0; i < totalSlots; i++) {

			var pos = 0;
			do {
				pos = Math.floor(Math.random() * Slots.length);
				if (i >= Slots.length)
					break;
			} while (insertedTypes.contains(pos));
			
			insertedTypes.push(pos);

			var slot = new Slot(Slots[pos], mask);
			slot.create();
			slots.push(slot);
			
			helper.addToScene(slot.sprite);
		}

		positionSlotsInCol();
	};

	function positionSlotsInCol() {
		$.each(slots, function(i, slot) {
			slot.sprite.position.x = anchorPosX;
			slot.sprite.position.y = positionY + anchorPosY + (i * deltaPosY);
		});
	};

	this.spin = function() {
		if (!isSpinning)
			return;

		moveSlotsWithSpeed(spinSpeed);
	};

	this.startSpinning = function() {
		isSpinning = true;

		$({ speed: 0 }).animate({ speed: maxSpinSpeed }, {
			duration: animationSpeed,
			step: function(now) {
				spinSpeed = now;
			}
		});
	};

	function moveSlotsWithSpeed(speed) {
		$.each(slots, function(i, slot) {
			slot.sprite.position.y += speed;
		});

		positionY += speed;

		if (positionY >= deltaPosY)
			resetColPosition();
	};

	function resetColPosition() {
		var lastSlot = slots.last();
		slots.pop(lastSlot);

		slots.splice(0, 0, lastSlot);

		positionY -= deltaPosY;
		lastSlot.sprite.position.y = slots[1].sprite.position.y - deltaPosY;
	};

	this.endSpin = function() {
		isSpinning = false;

		var ss = spinSpeed;
		$({ speed: animationSpeed }).animate({ speed: ss }, {
			duration: 0,
			step: function(now) {
				moveSlotsWithSpeed(ss - now);
			},
			complete: function() { endSpinAnimation(); }
		});
	};

	function endSpinAnimation() {
		const minPos = 0;
		const maxPos = positionY;

		$({ y: minPos }).animate({ y: maxPos }, {
			duration: 1000,
			easing: "easeOutElastic",
			step: function(now) {
				positionY = maxPos - now;
				positionSlotsInCol();
			}
		});
	};

	this.getResult = function() {
		const result = [];

		for (var i = 1; i <= 3; i++)
			result.push(slots[i]);

		return result;
	};

	return this;
};

