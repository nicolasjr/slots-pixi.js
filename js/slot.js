function Slot(slotType, mask) {
	this.type = slotType;
	
	const spritePath = getSlotTypeFileName(this.type);
	const spriteSize = 120;

 	this.create = function() {
		this.sprite = new PIXI.Sprite(PIXI.loader.resources[spritePath].texture);
		this.sprite.width = spriteSize;
		this.sprite.height = spriteSize;
		this.sprite.mask = mask;
	}

 	return this;
}
