const { Heap } = require("heap-js");

const DIRECTION = {
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
		this.g = Number.POSITIVE_INFINITY;
	}

	getNeighbors(graph) {
		const neighbors = [];
		for (const [direction, [x, y]] of Object.entries(DIRECTION)) {
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

// exports.partOne = (graph, startX, startY, endX, endY) => {
// 	const queue = new Heap((a, b) => a.at(-1) - b.at(-1));
// 	const visited = new Map();
// 	let minHeatLoss = Number.POSITIVE_INFINITY;

// 	const temp = graph[startX][startY];
// 	graph[startX][startY] = 'S';
// 	queue.push([startX, startY, "", 0, 0]);

// 	while (queue.length > 0) {
// 		const [x, y, direction, steps, g] = queue.pop();
// 		const key = `${x}-${y}-${direction}-${steps}`;
// 		if (x === endX && y === endY) {
// 			console.log(g);
// 			if (minHeatLoss > g)
// 				minHeatLoss = g;
// 		}
// 		if (!visited.has(key)) {
// 			visited.set(key, g);
// 			for (const [nextDirection, [deltaX, deltaY]] of Object.entries(DIRECTION)) {
// 				const heatLoss = graph[x + deltaX]?.[y + deltaY];
// 				if (heatLoss === undefined || heatLoss === 'S')
// 					continue;
// 				if (direction === "UP" && nextDirection === "DOWN")
// 					continue;
// 				if (direction === "DOWN" && nextDirection === "UP")
// 					continue;
// 				if (direction === "RIGHT" && nextDirection === "LEFT")
// 					continue;
// 				if (direction === "LEFT" && nextDirection === "RIGHT")
// 					continue;
// 				const nextSteps = nextDirection === direction ? (steps + 1) : 1;
// 				const nextG = g + parseInt(heatLoss);
// 				if (nextSteps === 4)
// 					continue;
// 				if (!visited.has(`${x + deltaX}-${y + deltaY}-${nextDirection}-${nextSteps}`)) {
// 					queue.push([
// 						x + deltaX,
// 						y + deltaY,
// 						nextDirection,
// 						nextSteps,
// 						nextG
// 					]);
// 				}
// 			}
// 		}
// 	}
// 	graph[startX][startY] = temp;
// 	return minHeatLoss;
// };

exports.partOne = (graph, startX, startY, endX, endY) => {
	const queue = new Heap((a, b) => a.at(-1) - b.at(-1));
	const visited = Array.from({ length: graph.length }, () => []);

	visited[startX][startY] = 0;
	queue.push([startX, startY, "", 0, 0]);
	while (queue.length > 0) {
		const [x, y, direction, steps, g] = queue.pop();
		if (visited[x]?.[y] && visited[x][y] < g) {
			// console.log(`current g = ${g}, visited[${x}][${y}] === ${visited[x][y]}`);
			continue;
		}
		if (x === endX && y === endY) {
			return g;
		}
		for (const [nextDirection, [deltaX, deltaY]] of Object.entries(DIRECTION)) {
			const heatLoss = graph[x + deltaX]?.[y + deltaY];
			if (heatLoss === undefined)
				continue;
			const nextSteps = nextDirection === direction ? (steps + 1) : 1;
			if (nextSteps === 4)
				continue;
			const nextG = g + parseInt(heatLoss);
			if (!visited[x + deltaX][y + deltaY]) {
				visited[x + deltaX][y + deltaY] = nextG;
				queue.push([x + deltaX, y + deltaY, nextDirection, nextSteps, nextG]);
				continue;
			}
			if (visited[x + deltaX][y + deltaY] > nextG) {
				console.log(`current nextG = ${nextG}, visited[${x + deltaX}][${y + deltaY}] === ${visited[x + deltaX][y + deltaY]}`);
				visited[x + deltaX][y + deltaY] = nextG;
				queue.push([x + deltaX, y + deltaY, nextDirection, nextSteps, nextG]);
			}
		}
		// console.log(queue);
	}
	return minHeatLoss;
};

exports.partTwo = (graph, startX, startY, endX, endY) => {

	const queue = new Heap((a, b) => a.g - b.g);
	const visited = new Map();
	let minHeatLoss = Number.POSITIVE_INFINITY;

	// graph[startX][startY] = '0';
	const startCrucible = new Crucible(startX, startY, "", 0);
	startCrucible.steps = 0;
	startCrucible.g = 0;
	queue.push(startCrucible);

	while (queue.length > 0) {
		const crucible = queue.pop();
		const key = `${crucible.row}-${crucible.col}-${crucible.direction}-${crucible.steps}`;
		if (crucible.row === endX && crucible.col === endY) {
			if (minHeatLoss > crucible.g) {
				minHeatLoss = crucible.g;
			}
		}
		if (!visited.has(key)) {
			visited.set(key, crucible.g);
			for (const neighbor of crucible.getNeighbors(graph)) {
				const { row, col, direction, steps } = neighbor;
				if (!visited.has(`${row}-${col}-${direction}-${steps}`)) {
					queue.push(neighbor);
				}

			}
		}
	}
	return minHeatLoss;
};