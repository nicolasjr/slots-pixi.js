function Helper() {
    this.addToScene = function(sprite) {
    	stage.addChild(sprite);
    };

    this.removeFromScene = function(sprite) {
    	stage.removeChild(sprite);
    };

    this.createSquare = function(coordinates) {
        var square = new PIXI.Graphics();
        square.beginFill();
        square.drawRect(coordinates.x, coordinates.y, coordinates.w, coordinates.h);
        square.endFill();

        return square;
    };

	this.createSlotTypeFileNameArray = function(slotNameArray) {
		var fileNameArray = [];
		$.each(slotNameArray, function(i, name) {
			fileNameArray.push(helper.getSlotTypeFileName(name));
		});
		return fileNameArray;
	};

	this.getSlotTypeFileName = function(type) {
		return "images/" + type + ".png";
	};
}