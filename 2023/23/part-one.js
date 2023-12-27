const { input: lines } = require("./input");

const graph = Array.from(lines, line => line.split(""));

const direction = {
	UP: [-1, 0],
	DOWN: [1, 0],
	RIGHT: [0, 1],
	LEFT: [0, -1]
};

// const slopes = "^>v<";

// class Tile {
// 	constructor(x, y, value, direction, steps) {
// 		this.x = x;
// 		this.y = y;
// 		this.value = value;
// 		this.direction = direction;
// 		this.steps = steps;
// 	}

// 	getNeighbors(graph) {
// 		const tiles = [];
// 		for (const [dir, [x, y]] of Object.entries(direction)) {
// 			const value = graph[this.x + x]?.[this.y + y];
// 			if (value === undefined || value === '#' || this.value === 'S') {
// 				continue;
// 			}
// 			tiles.push(new Tile(this.x + x, this.y + y, value, dir, this.steps + 1));
// 		}
// 		return tiles
// 				.filter(tile => {
// 					if (this.direction === "UP")
// 						return tile.direction !== "DOWN";
// 					if (this.direction === "DOWN")
// 						return tile.direction !== "UP";
// 					if (this.direction === "RIGHT")
// 						return tile.direction !== "LEFT";
// 					if (this.direction === "LEFT")
// 						return tile.direction !== "RIGHT";
// 					return true;
// 				})
// 				.filter(tile => {
// 					if (this.value === '^')
// 						return tile.direction !== "DOWN";
// 					if (this.value === 'v')
// 						return tile.direction !== "UP";
// 					if (this.value === '>')
// 						return tile.direction !== "LEFT";
// 					if (this.value === '<')
// 						return tile.direction !== "RIGHT";
// 					return true;
// 				});
// 	}
// }

// const findLongestPath = (graph, startX, startY, endX, endY, direction, steps) => {

// 	const move = (graph, tile, endX, endY) => {

// 		for (const nextPaths of getNextPaths(graph, row, col)) {

// 		}
// 	}

// 	graph[startX][startY] = 'S';
// 	const start = new Tile(startX, startY, graph[startX][startY], "", 0);
// 	console.log(start.getNeighbors(graph));
// 	// move(graph, start, endX, endY);
// };

const findLongestPath = (graph, startX, startY, endX, endY) => {
	const queue = [];
	const visited = Array.from({ length: graph.length }, () => []);
	let longestHikeSteps = 0;

	queue.push([startX, startY, 0]);
	while (queue.length > 0) {
		const [x, y, steps] = queue.pop();
		visited[x][y] = graph[x][y];
		// console.log(visited);
		if (x === endX && y === endY) {
			if (longestHikeSteps > steps)
				longestHikeSteps = steps;
		}
		for (const [deltaX, deltaY] of Object.values(direction)) {
			const tile = graph[x + deltaX]?.[y + deltaY];
			if (tile === undefined || tile === '#' || visited[x + deltaX]?.[y + deltaY]) {
				continue;
			}
			if (tile === '^' && deltaX === 1)
				continue;
			if (tile === 'v' && deltaX === -1)
				continue;
			if (tile === '>' && deltaY === -1)
				continue;
			if (tile === '<' && deltaY === 1)
				continue;
			queue.push([x + deltaX, y + deltaY, steps + 1]);
			console.log(queue.length);
		}
	}
	console.log(longestHikeSteps);
}

findLongestPath(graph, 0, 1, graph.length - 1, graph.at(-1).length - 2);
// console.log(graph[22][21]);