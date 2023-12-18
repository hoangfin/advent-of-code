const { input: lines } = require("./input");

const graph = Array.from(lines, line => line.split(""));

class CityBlock {
	constructor(row, col, heatLoss) {
		this.parent = null;
		this.row = row;
		this.col = col;
		this.heatLoss = heatLoss;
		this.direction = "";
		this.g = Infinity;
		this.h = 0;
		this.f = Infinity;
	}
}

const findLeastHeatLoss = (graph, startRow, startCol, endRow, endCol) => {

	const calculateHeuristic = (row, col, endRow, endCol) => {
		return Math.abs(row - endRow) + Math.abs(col - endCol);
	};

	const getNeighbors = (graph, currentCityBlock) => {
		return Math.abs(row - endRow) + Math.abs(col - endCol);
	};

	const visited = [];
	const unvisited = [];

	const heats = Array.from(graph, () => Array.from(graph[0]).fill(Infinity));
	const prevs = Array.from(graph, () => []);

	const cb = new CityBlock(startRow, startCol, graph[row][col]);
	cb.g = 0;
	cb.h = calculateHeuristic(startRow, startCol, endRow, endCol);
	cb.f = cb.g + cb.h;

	unvisited.push(cb);
	while (unvisited.length > 0) {
		const cityBlock = unvisited.pop(); // modify later
		visited.push(cityBlock);
		for (const neighbor in getNeighbors(graph, cityBlock)) {
			if (visited.includes(neighbor)) {
				continue;
			}
			neighbor.parent = cityBlock;
			const tentativeG = cityBlock.heatLoss + neighbor.heatLoss;
			
			if (!unvisited.includes(neighbor))
				unvisited.push(neighbor);
		}
	}
};

const heatLoss = findLeastHeatLoss(graph, 0, 0, graph.length - 1, graph[0].length - 1);