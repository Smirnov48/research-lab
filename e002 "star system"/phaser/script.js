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

	for (let i = 0; i < 1000; i++) {
		let asteroid = {
			x: Math.random() * 640 * 2 - 320,
			y: Math.random() * 360 * 2 - 180,
			size: Math.random() * 2,
			speed: {
				x: Math.random() * 6 - 3,
				y: Math.random() * 6 - 3
			},
			distroyed: false
		};
		asteroids.push(asteroid);
	}
}

function getDistance(x1, y1, x2, y2) {
	let deltaX = (x2 - x1);
	let deltaY = (y2 - y1);
	return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function update () {
	graphics.clear();
	drawStar();
	for (let asteroid of asteroids) {
		if (asteroid.distroyed) {
			continue;
		}

		let dist = getDistance(asteroid.x, asteroid.y, 320, 160);
		
		if (dist < asteroid.size * 1.5) {
			asteroid.distroyed = true;
			continue;
		}
		
		for (let ast of asteroids) {
			if (asteroid != ast && !ast.distroyed) {
				let d = getDistance(asteroid.x, asteroid.y, ast.x, ast.y);
				let mas = asteroid.size + ast.size;
				if (d < mas/2) {
					if (asteroid.size > ast.size) {
						//asteroid.speed.x = (asteroid.speed.x * asteroid.size + ast.speed.x * ast.size) / mas; 
						//asteroid.speed.y = (asteroid.speed.y * asteroid.size + ast.speed.y * ast.size) / mas;
						asteroid.size += (asteroid.size + ast.size)/(asteroid.size*5);

						ast.distroyed = true;
					} else {
						asteroid.distroyed = true;

						//ast.speed.x = (asteroid.speed.x * asteroid.size + ast.speed.x * ast.size) / mas; 
						//ast.speed.y = (asteroid.speed.y * asteroid.size + ast.speed.y * ast.size) / mas;
						ast.size += (asteroid.size + ast.size)/(ast.size*5);
					}
					continue;
				}
			}
		}
		
		asteroid.speed.x += (320 - asteroid.x) / (30 * dist);
		asteroid.speed.y += (180 - asteroid.y) / (30 * dist);
		
		asteroid.x += asteroid.speed.x;
		asteroid.y += asteroid.speed.y;
		
		rect.x = asteroid.x - asteroid.size/2;
		rect.y = asteroid.y - asteroid.size/2;
		rect.width = asteroid.size;
		rect.height = asteroid.size;	
		graphics.fillRectShape(rect);
	}
}
