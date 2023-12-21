const { input: lines } = require("./input");

const graph = Array.from(lines, line => line.split("").map(num => parseInt(num)));

let leastHeatLoss = Infinity;

const findLeastHeatLoss = (graph, startRow, startCol, endRow, endCol) => {

	const cache = new Map();
	const path = Array.from(
		{ length: graph.length },
		() => new Array(graph[0].length).fill('.')
	);

	const getHeatLoss = (graph, row, col, endRow, endCol, path) => {
		const key = `row:${row},col:${col}`;

		if (row < 0 || row >= graph.length - 1 || col < 0 || col >= graph[0].length - 1) {
			return Infinity;
		}

		if (path[row][col] === '#') {
			return Infinity;
		}

		if (cache.has(key)) {
			return cache.get(key);
		}

		if (row === endRow && col === endCol) {
			path[row][col] = '#';
			return graph[row][col];
		}

		path[row][col] = '#';
		for (const neighbor of [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]]) {
			cache.set(key, graph[row][col] + getHeatLoss(graph, neighbor[0], neighbor[1], endRow, endCol, path)) ;
		}
		path[row][col] = '.';
		return cache.get(key);
	};

	const temp = graph[0][0];
	graph[0][0] = 0;
	getHeatLoss(graph, startRow, startCol, endRow, endCol, path);
	graph[0][0] = temp;
	console.log(cache);
};
findLeastHeatLoss(graph, 0, 0, graph.length - 1, graph[0].length - 1);
console.log(leastHeatLoss);
