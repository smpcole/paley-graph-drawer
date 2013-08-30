// Return a new Paley drawer object with the following fields:
// -- p: a prime number === 1 mod 4
// -- canvas: an HTML 5 canvas object
// -- draw(): function to draw the Paley graph of order p on the canvas
// -- interval: handle for interval at which the edges of the graph are being drawn (so it can be passed to clearInterval()
var newPaley = function(p, canvas, speed) {
	var paley = {};
	paley.p = p;
	paley.canvas = canvas;

	// Smaller number == faster speed
	paley.speed = speed || 0;

	var getVertex = function(pal, i) {
		// These are also the coordinates of the center of the canvas
		var xRad = pal.canvas.width / 2;
		var yRad = pal.canvas.height / 2;
		var angle = i * 2 * Math.PI / pal.p;
		return {x: xRad + xRad * Math.cos(angle), y: yRad + yRad * Math.sin(angle)};
	};

	// Callback for setInterval
	// pal is a pointer to paley
	// params is an object containing the iteration variables i, j
	var drawLine = function(pal, params) {
	    if(params.i >= pal.p) {
			// Done
			clearInterval(pal.interval);
			return;
		}

		// Increment i and j until an edge has been drawn
		for(; params.i < pal.p; params.i++) {

			for(; params.j <= (pal.p - 1) / 2; params.j++) {

				var j = (params.i + params.j * params.j) % pal.p;

				// Only draw "forward" edges
				if(j > params.i) {
					var i = getVertex(pal, params.i);
					j = getVertex(pal, j);
					var ctx = pal.canvas.getContext("2d");
					ctx.beginPath();
					ctx.moveTo(i.x, i.y);
					ctx.lineTo(j.x, j.y);
					ctx.stroke();
					// Edge has been drawn; increment j and return
					params.j++;
					return;
				}	
			}
			params.j = 1;
		}
	};

	paley.draw = function() {
		// Object to hold iteration variables
		var indices = {i: 0, j: 1};
		this.interval = setInterval(drawLine, this.speed, this, indices);
	};

	return paley;
};
