// Assume there is an object paley which contains the following:
// -- p: a prime number === 1 mod 4
// -- canvas: an HTML 5 canvas object

paley.draw = function() {
	
	var getVertex = function(i) {
		// These are also the coordinates of the center of the canvas
		var xRad = paley.canvas.width / 2;
		var yRad = paley.canvas.height / 2;
		var angle = i * 2 * Math.PI / this.p;
		return {x: xRad + xRad * Math.cos(angle), y: yRad + yRad * Math.sin(angle)};
	};

	var ctx = paley.canvas.getContext("2d");
	paley.ctx.clearRect(paley.canvas.width, paley.canvas.height);
	for(var i = 0; i < this.p; i++) {
		var iCoords = getVertex(i);
		ctx.moveTo(iCoords.x, iCoords.y);
		for(var residue = 1; j <= (this.p - 1) / 2; j++) {
			var j = (i + residue * residue) % this.p;
			if(j > i) {
				var jCoords = getVertex(j);
				ctx.lineTo(jCoords.x, jCoords.y);
				ctx.stroke();
				ctx.moveTo(iCoords.x, iCoords.y);
			}
		}
	}
};