const { input: lines } = require("./input");

class City {
	constructor(row, col, heatLoss) {
		this.parent = null;
		this.row = row;
		this.col = col;
		this.heatLoss = heatLoss;
		this.g = Infinity;
		this.h = 0;
		this.f = Infinity;
	}

	getNeighbors(graph) {

	}
}

const graph = Array.from(lines, (line, row) => {
	const cities = [];
	const heatNums = line.split("");
	heatNums.forEach((heatNum, col) => {
		cities.push(new City(row, col, parseInt(heatNum)));
	})
	return cities;
});


const findLeastHeatLoss = (graph, startRow, startCol, endRow, endCol) => {

	const calculateHeuristic = (row, col, endRow, endCol) => {
		return Math.abs(row - endRow) + Math.abs(col - endCol);
	};

	const visited = [];
	const unvisited = [];

	const heats = Array.from(graph, () => Array.from(graph[0]).fill(Infinity));
	const prevs = Array.from(graph, () => []);

	const start = graph[startRow][startCol];
	start.g = 0;
	start.h = calculateHeuristic(startRow, startCol, endRow, endCol);
	start.f = start.g + start.h;

	unvisited.push(start);
	while (unvisited.length > 0) {
		const currentCity = unvisited.pop(); // modify later
		visited.push(currentCity);
		for (const neighbor of currentCity.getNeighbors(graph)) {
			if (visited.includes(neighbor))
				continue;
			if (!unvisited.includes(neighbor)) {
				neighbor.parent = currentCity;
				const tentativeG = currentCity.g + neighbor.heatLoss;
				if (tentativeG < neighbor.g)
				unvisited.push(neighbor);
			}
		}
	}
};

const heatLoss = findLeastHeatLoss(graph, 0, 0, graph.length - 1, graph[0].length - 1);
