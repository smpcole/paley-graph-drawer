// Return a new Paley drawer object with the following fields:
// -- p: a prime number === 1 mod 4
// -- canvas: an HTML 5 canvas object
// -- draw(): function to draw the Paley graph of order p on the canvas
// -- interval: an interval at which the edges of the graph are being drawn
var newPaley = function(p, canvas, speed) {
	var paley = {};
	paley.p = p;
	paley.canvas = canvas;

	// Smaller number == faster speed
	paley.speed = speed || 0;

	paley.getVertex = function(i) {
		// These are also the coordinates of the center of the canvas
		var xRad = this.canvas.width / 2;
		var yRad = this.canvas.height / 2;
		var angle = i * 2 * Math.PI / this.p;
		return {x: xRad + xRad * Math.cos(angle), y: yRad + yRad * Math.sin(angle)};
	};

	// Callback for setInterval
	// pal is a pointer to paley
	// params is an object containing i, j, the interval
	var drawLine = function(pal, params) {
	    if(params.i >= pal.p) {
			// Done
			clearInterval(pal.interval);
			console.log(params.i);
			params.i += 1;
		}
		
		else if(params.j > (pal.p - 1) / 2) {
			// Done with vertex i
			params.j = 1;
			params.i += 1;
		}
		else {
			var j = (params.i + params.j * params.j) % pal.p;

			if(j > params.i) {
				var i = pal.getVertex(params.i);
				j = pal.getVertex(j);
				var ctx = pal.canvas.getContext("2d");
				ctx.beginPath();
				ctx.moveTo(i.x, i.y);
				ctx.lineTo(j.x, j.y);
				ctx.stroke();
			}

			// Increment j
			params.j += 1;
		}
	};

	paley.draw = function() {
		// Object to hold iteration variables and pointer to interval
		var indices = {i: 0, j: 1};
		this.interval = setInterval(drawLine, this.speed, this, indices);
	};

	return paley;
};
