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

var slotMachine = new SlotMachine(5);

initialize();

function initialize() {
	// renderer.autoResize = true;
	PIXI.loader
		.add(getSlotTypeFileName(Slots[0]))
		.add(getSlotTypeFileName(Slots[1]))
		.add(getSlotTypeFileName(Slots[2]))
		.add(getSlotTypeFileName(Slots[3]))
		.add(getSlotTypeFileName(Slots[4]))
		.add(getSlotTypeFileName(Slots[5]))
		.add(getSlotTypeFileName(Slots[6]))
		.add("images/machine.png")
		.load(ready);

	window.addEventListener("keydown", function(e){
	    if (e.keyCode === 13) {
	        slotMachine.spin();
	    }
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
	// render();
}

function removeFromScene(sprite) {
	stage.removeChild(sprite);
	// render();
}

function getSlotTypeFileName(type) {
	return "images/" + type + ".png";
}
