const backgroundWidth = 1000;
const backgroundHeight = 667;

const stage = new PIXI.Container(),
    renderer = PIXI.autoDetectRenderer(backgroundWidth, backgroundHeight);

const Slots = [
    "slot-dealer",
    "slot-winner",
    "slot-wildcard",
    "slot-card-green",
    "slot-card-red",
    "slot-card-brown",
    "slot-card-blue"
];

function Helper() {
    this.addToScene = function(sprite) {
    	stage.addChild(sprite);
    };

    this.removeFromScene = function(sprite) {
    	stage.removeChild(sprite);
    };

    this.createSquare = function(x, y, w, h) {
        var square = new PIXI.Graphics();
        square.beginFill();
        square.drawRect(x, y, w, h);
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

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--)
        if (this[i] === obj)
            return true;
    return false;
};

Array.prototype.last = function(){
    return this[this.length - 1];
};

PIXI.Graphics.prototype.setInteractive = function(val) {
    this.interactive = val;
    return this;
};