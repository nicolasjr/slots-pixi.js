function Slot(slotType, mask) {
	this.type = slotType;
	this.sprite = null;
	this.spritePath = getSlotTypeFileName(this.type);
	this.spriteSize = 120;
	this.mask = mask;

 	return this;
}

Slot.prototype.create = function() {
	this.sprite = new PIXI.Sprite(PIXI.loader.resources[this.spritePath].texture);

	this.sprite.width = this.spriteSize;
	this.sprite.height = this.spriteSize;
	this.sprite.mask = this.mask;
}
