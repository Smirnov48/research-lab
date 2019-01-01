addEventListener("load", function() {
	let context = document.getElementById("display").getContext("2d");
	
	let snowflakes = [];
	
	function draw(){
		
		var x = Math.random() * 640;
		var y = - Math.random() * 360;
		
		if (snowflakes.length < 300) {
			snowflakes.push({'x' : x, 'y' : y});
		}
		
		context.fillStyle = "#000";
		context.fillRect(0, 0, 640, 360);

		context.fillStyle = "#FFF";
		for (let snowflake of snowflakes) {
			snowflake.y++;
			context.fillRect(snowflake.x, snowflake.y, 5, 5);
			if (snowflake.y > 360) {
				snowflake.x = Math.random() * 640;
				snowflake.y = - Math.random() * 360;
			}
		}
		
		requestAnimationFrame(draw);
	}
	requestAnimationFrame(draw);
});
