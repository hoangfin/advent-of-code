class Crucible {
	constructor(x, y, direction = "", heatLoss) {
		this.parent = null;
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.steps = 1;
		this.heatLoss = heatLoss;
		this.g = Number.POSITIVE_INFINITY;
	}

	getNeighbors(graph) {
		const neighbors = [];
		for (const [direction, [x, y]] of Object.entries(DIRECTION)) {
			const x = (this.direction !== direction) ? (this.x + 4 * x ): (this.x + x);
			const y = (this.direction !== direction) ? (this.y + 4 * y) : (this.y + y);
			let heatLoss = 0;
			// console.log(direction);
			if (direction === "UP" || direction === "DOWN") {
				for (let i = this.x; i !== x; i += x) {
					heatLoss += parseInt(graph[i + x]?.[y]);
				}
			} else {
				for (let i = this.y; i !== y; i += y) {
					heatLoss += parseInt(graph[x]?.[i + y]);
				}
			}
			// console.log(heatLoss);
			if (heatLoss && !isNaN(heatLoss)) {
				const neighbor = new Crucible(x, y, direction, parseInt(heatLoss));
				neighbor.g = this.g + neighbor.heatLoss;
				neighbor.steps = this.direction === neighbor.direction ? (this.steps + 1) : 4;
				neighbors.push(neighbor);
			}
		}
		return neighbors
				.filter(neighbor => neighbor.steps >= 4 && neighbor.steps <= 10)
				.filter(neighbor => {
					if (this.direction === "UP")
						return neighbor.direction !== "DOWN";
					if (this.direction === "RIGHT")
						return neighbor.direction !== "LEFT";
					if (this.direction === "DOWN")
						return neighbor.direction !== "UP";
					if (this.direction === "LEFT")
						return neighbor.direction !== "RIGHT";
					return true;
				});
	}
}

module.exports = Crucible;