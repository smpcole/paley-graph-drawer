// Return a new Paley drawer object with the following fields:
// -- p: a prime number === 1 mod 4
// -- canvas: an HTML 5 canvas object
// -- draw(): function to draw the Paley graph of order p on the canvas
var newPaley = function(p, canvas) {
	var paley = {};
	paley.p = p;
	paley.canvas = canvas;

	paley.getVertex = function(i) {
		// These are also the coordinates of the center of the canvas
		var xRad = this.canvas.width / 2;
		var yRad = this.canvas.height / 2;
		var angle = i * 2 * Math.PI / this.p;
		return {x: xRad + xRad * Math.cos(angle), y: yRad + yRad * Math.sin(angle)};
	};

	paley.draw = function() {

		var ctx = this.canvas.getContext("2d");

		for(var i = 0; i < this.p; i++) {
			var iCoords = this.getVertex(i);
			for(var residue = 1; residue <= (this.p - 1) / 2; residue++) {
				var j = (i + residue * residue) % this.p;
				if(j > i) {
					ctx.beginPath();
					ctx.moveTo(iCoords.x, iCoords.y);
					var jCoords = this.getVertex(j);
					ctx.lineTo(jCoords.x, jCoords.y);
					ctx.stroke();
				}
			}
		}
	};

	return paley;
};
