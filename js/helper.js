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

    this.parentCenter = function(child) {
        child.pivot = new PIXI.Point(child.width / 2, child.height / 2);
        return child;
    };

    this.createCircle = function(x, y, r) {
        var circle = new PIXI.Graphics();
        circle.beginFill("#000");
        circle.drawCircle(x, y, r);
        circle.endFill();

        return circle;
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

    this.createLabeledRoundButton = function(label, x, y, r, callback) {
        const buttonLabel = new PIXI.Text(label, {font:"50px Arial", fill:"white"});
        
        const button = helper.createCircle(0, 0, r).setInteractive(true);
        button.position = { x: x, y: y };
        button.on('mouseup', callback);
        button.on('touchend', callback);
        button.addChild(buttonLabel);
        this.parentCenter(buttonLabel);

        return button;
    };
};

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
