const { input: lines } = require("./input");

const graph = Array.from(lines, line => line.split(""));

const findLeastHeatLoss = (graph, startRow, startCol, endRow, endCol) => {

	const visited = [];
	const unvisited = [];

	const heats = Array.from(graph, () => Array.from(graph[0]).fill(Infinity));
	const prevs = Array.from(graph, () => []);

	unvisited.push([startRow, startCol]);
	while (unvisited.length > 0) {
		const [row, col] = 
	}
};

const heatLoss = findLeastHeatLoss(graph, 0, 0, graph.length - 1, graph[0].length - 1);