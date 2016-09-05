const backgroundWidth = 1000;
const backgroundHeight = 667;

var stage = new PIXI.Container(),
    renderer = PIXI.autoDetectRenderer(backgroundWidth, backgroundHeight);

var Slots = [
	"slot-dealer",
	"slot-winner",
	"slot-wildcard",
	"slot-card-green",
	"slot-card-red",
	"slot-card-brown",
	"slot-card-blue"
];

initialize();

const totalReels = 5;
var slotMachine = new SlotMachine(totalReels);

function initialize() {
	PIXI.loader
		.add(createSlotTypeFileNameArray(Slots))
		.add("images/machine.png")
		.load(ready);

	window.addEventListener("keydown", function(e) {
	    if (e.keyCode === 13)
	        slotMachine.spin();
	});

	document.body.appendChild(renderer.view);

	var p = document.createElement("p");
	p.innerHTML = "Press ENTER/RETURN to spin";
	document.body.appendChild(p);

	requestAnimationFrame(gameLoop);
}

function gameLoop() {
	requestAnimationFrame(gameLoop);
	slotMachine.update();
	renderer.render(stage);
}

function ready() {
	slotMachine.create();
}

function addToScene(sprite) {
	stage.addChild(sprite);
}

function removeFromScene(sprite) {
	stage.removeChild(sprite);
}

function createSlotTypeFileNameArray(slotNameArray) {
	var fileNameArray = [];
	$.each(slotNameArray, function(i, name) {
		fileNameArray.push(getSlotTypeFileName(name));
	});
	return fileNameArray;
}

function getSlotTypeFileName(type) {
	return "images/" + type + ".png";
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--)
        if (this[i] === obj)
            return true;
    return false;
}

Array.prototype.last = function(){
    return this[this.length - 1];
};
