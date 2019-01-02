let config = {
	type: Phaser.AUTO,
	width: 640,
	height: 360,
	scene: {
		create: create,
		update: update
	}
};

let game = new Phaser.Game(config);

let graphics;
let starLine;

function drawStar() {
	for (let i = 0; i < 10; i++) {
		let angle = Math.random() * Math.PI*2;
		let r = Math.random() * 20;
		
		starLine.x1 = Math.cos(angle) * r + 320;
		starLine.y1 = Math.sin(angle) * r + 180;
		starLine.x2 = 320;//Math.cos(angle) * -r + 320;
		starLine.y2 = 180;//Math.sin(angle) * -r + 180;
		
		graphics.strokeLineShape(starLine);
	}
}

function create () {
//	for (let i = 0; i < 300; i++) {
//	}
	starLine = new Phaser.Geom.Line(0, 0, 10, 10);

    graphics = this.add.graphics({ fillStyle: { color: 0xFFFFFF }, lineStyle: { width: 1, color: 0xFFFFFF} });
}

function update () {
	graphics.clear();
	drawStar();
//	for (let snowflake of snowflakes) {

//		let rect = new Phaser.Geom.Rectangle(snowflake.x, snowflake.y, snowflake.size, snowflake.size);
//		graphics.fillRectShape(rect);

//	}
}
