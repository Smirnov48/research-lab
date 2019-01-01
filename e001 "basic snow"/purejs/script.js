addEventListener("load", function() {
	let context = document.getElementById("display").getContext("2d");
	
	function draw(){
		
		var x = Math.random() * 640;
		var y = Math.random() * 360;
		
		context.fillRect(x, y, 5, 5);
		
		requestAnimationFrame(draw);
	}
	requestAnimationFrame(draw);
});
