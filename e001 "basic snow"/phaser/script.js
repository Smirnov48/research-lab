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

let snowflakes = [];
let graphics;

function create () {
	for (let i = 0; i < 300; i++) {
		let x = Math.random() * 640;
		let y = - Math.random() * 360;
		let size = Math.random() * 6;
		let speed = 1 + size/6;

		snowflakes.push({
				'x' : x, 
				'y' : y, 
				'speed': speed, 
				'size': size
		});
	}

    graphics = this.add.graphics({ fillStyle: { color: 0xFFFFFF } });
}

function update () {
	graphics.clear();
	for (let snowflake of snowflakes) {
		snowflake.y += snowflake.speed;

		let rect = new Phaser.Geom.Rectangle(snowflake.x, snowflake.y, snowflake.size, snowflake.size);
		graphics.fillRectShape(rect);

		if (snowflake.y > 360) {
			snowflake.x = Math.random() * 640;
			snowflake.y = - Math.random() * 360;
		}
	}
}
