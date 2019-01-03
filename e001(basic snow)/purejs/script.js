addEventListener("load", function() {
	let context = document.getElementById("display").getContext("2d");
	
	let snowflakes = [];
	
	function draw(){

		if (snowflakes.length < 300) {
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
		
		context.fillStyle = "#000";
		context.fillRect(0, 0, 640, 360);

		context.fillStyle = "#FFF";
		for (let snowflake of snowflakes) {
			snowflake.y += snowflake.speed;

			context.fillRect(snowflake.x, snowflake.y, snowflake.size, snowflake.size);

			if (snowflake.y > 360) {
				snowflake.x = Math.random() * 640;
				snowflake.y = - Math.random() * 360;
			}
		}
		
		requestAnimationFrame(draw);
	}
	requestAnimationFrame(draw);
});
