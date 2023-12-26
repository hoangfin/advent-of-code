const { input: lines } = require("./input");
const { Heap } = require("heap-js");

const graph = Array.from(lines, line => line.split(""));

const dir = {
	UP: [-1, 0],
	RIGHT: [0, 1],
	DOWN: [1, 0],
	LEFT: [0, -1]
};

class Crucible {
	constructor(row, col, direction = "", heatLoss) {
		this.parent = null;
		this.row = row;
		this.col = col;
		this.direction = direction;
		this.steps = 1;
		this.heatLoss = heatLoss;
		this.g = Infinity;
	}

	getNeighbors(graph) {
		const neighbors = [];
		for (const [direction, [x, y]] of Object.entries(dir)) {
			const row = (this.direction !== direction) ? (this.row + 4 * x ): (this.row + x);
			const col = (this.direction !== direction) ? (this.col + 4 * y) : (this.col + y);
			let heatLoss = 0;
			// console.log(direction);
			if (direction === "UP" || direction === "DOWN") {
				for (let i = this.row; i !== row; i += x) {
					heatLoss += parseInt(graph[i + x]?.[col]);
				}
			} else {
				for (let i = this.col; i !== col; i += y) {
					heatLoss += parseInt(graph[row]?.[i + y]);
				}
			}
			// console.log(heatLoss);
			if (heatLoss && !isNaN(heatLoss)) {
				const neighbor = new Crucible(row, col, direction, parseInt(heatLoss));
				neighbor.g = this.g + neighbor.heatLoss;
				neighbor.steps = this.direction === neighbor.direction ? (this.steps + 1) : 4;
				neighbors.push(neighbor);
			}
		}
		return neighbors
				.filter(neighbor => neighbor.steps >= 4 && neighbor.steps <= 10)
				.filter(neighbor => {
					if (dir[this.direction] === dir.UP)
						return neighbor.direction !== "DOWN";
					if (dir[this.direction] === dir.RIGHT)
						return neighbor.direction !== "LEFT";
					if (dir[this.direction] === dir.DOWN)
						return neighbor.direction !== "UP";
					if (dir[this.direction] === dir.LEFT)
						return neighbor.direction !== "RIGHT";
					return true;
				});
	}
}

const findLeastHeatLoss = (graph, startRow, startCol, endRow, endCol) => {

	const minHeap = new Heap((a, b) => a.g - b.g);
	const visited = new Map();

	const startCrucible = new Crucible(startRow, startCol, "", 0);
	startCrucible.steps = 0;
	startCrucible.g = 0;
	// console.log(startCrucible.getNeighbors(graph));
	minHeap.push(startCrucible);

	while (minHeap.length > 0) {
		const crucible = minHeap.pop();
		if (crucible.row === endRow && crucible.col === endCol) {
			console.log(`Reached optimal path ${crucible.g}`);
			break;
		}
		for (const neighbor of crucible.getNeighbors(graph)) {
			const { row, col, direction, steps } = neighbor;
			const key = `${row}-${col}-${direction}-${steps}`;
			if (!visited.has(key)) {
				visited.set(key, neighbor.g);
				minHeap.push(neighbor);
				continue;
			}
			if (visited.get(key) > neighbor.g) {
				visited.set(key, neighbor.g);
				minHeap.push(neighbor);
			}
		}
	}
};

findLeastHeatLoss(graph, 0, 0, graph.length - 1, graph[0].length - 1);


