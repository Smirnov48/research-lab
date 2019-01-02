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
let rect;

let asteroids = [];

function drawStar() {
	for (let i = 0; i < 10; i++) {
		let angle = Math.random() * Math.PI*2;
		let r = Math.random() * 20;
		
		starLine.x1 = Math.cos(angle) * r + 320;
		starLine.y1 = Math.sin(angle) * r + 180;
		starLine.x2 = 320;
		starLine.y2 = 180;
		
		graphics.strokeLineShape(starLine);
	}
}

function create () {
	starLine = new Phaser.Geom.Line(0, 0, 10, 10);
	rect = new Phaser.Geom.Rectangle(0, 0, 5, 5);

    graphics = this.add.graphics({ fillStyle: { color: 0xFFFFFF }, lineStyle: { width: 1, color: 0xFFFFFF} });

	for (let i = 0; i < 100; i++) {
		let asteroid = {
			x: Math.random() * 640,
			y: Math.random() * 360,
			size: Math.random() * 5,
			speed: {
				x: Math.random() * 20 - 10,
				y: Math.random() * 20 - 10
			}
		};
		asteroids.push(asteroid);
	}
}

function update () {
	graphics.clear();
	drawStar();
	for (let asteroid of asteroids) {
		
		
		asteroid.speed.x += (320 - asteroid.x) / 1000;
		asteroid.speed.y += (180 - asteroid.y) / 1000;
		
		asteroid.x += asteroid.speed.x;
		asteroid.y += asteroid.speed.y;
		
		rect.x = asteroid.x;
		rect.y = asteroid.y;
		rect.width = asteroid.size;
		rect.height = asteroid.size;	
		graphics.fillRectShape(rect);
	}
}
