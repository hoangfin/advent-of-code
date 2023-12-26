const { input: lines } = require("./input");

const graph = Array.from(lines, line => line.split(""));

const dir = {
	UP: [-1, 0],
	RIGHT: [0, 1],
	DOWN: [1, 0],
	LEFT: [0, -1]
};

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
		const neighbors = [];
		for (const [direction, [x, y]] of Object.entries(dir)) {
			const heatLoss = graph[this.row + x]?.[this.col + y];
			if (heatLoss) {
				const neighbor = new City(this.row + x, this.col + y, direction, heatLoss);
				neighbor.parent = this;
				neighbor.g = this.g + parseInt(heatLoss);
				if (this.direction === neighbor.direction) {
					neighbor.steps = this.steps + 1;
				}
				neighbors.push(neighbor);
			}
		}
		return neighbors
				.filter(neighbor => neighbor.steps !== 4)
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

const buildPath = (currentCity) => {
	const path = [];
	while (currentCity.parent != null) {
		path.unshift(currentCity);
		currentCity = currentCity.parent;
	}
	return path;
};

const findLeastHeatLoss = (graph, startRow, startCol, endRow, endCol) => {

	const calculateHeuristic = (row, col, endRow, endCol) => {
		return Math.abs(row - endRow) + Math.abs(col - endCol);
	};

	const visited = [];
	const unvisited = [];

	const start = graph[startRow][startCol];
	start.g = 0;
	start.h = calculateHeuristic(startRow, startCol, endRow, endCol);
	start.f = start.g + start.h;

	unvisited.push(start);
	while (unvisited.length > 0) {
		const currentCity = unvisited.reduce(
			(acc, city) => {
				if (city && city.f < acc.f) {
					acc = city;
				}
				return acc;
			},
			unvisited[0]
		);
		unvisited.splice(unvisited.indexOf(currentCity), 1);
		visited.push(currentCity);
		// console.log(visited.length, " ===== ", unvisited.length);
		if (currentCity.row === endRow && currentCity.col === endCol) {
			const path = buildPath(currentCity);
			console.log(...path);
			// const heatLoss = path.reduce((acc, city) => acc + city.g, 0);
			// return currentCity.g;
		}
		for (const neighbor of currentCity.getNeighbors(graph)) {
			if (visited.includes(neighbor)) {
				// console.log(neighbor, " included");
				continue;
			}
			if (!unvisited.includes(neighbor)) {
				neighbor.parent = currentCity;
				const tentativeG = currentCity.g + neighbor.heatLoss;
				if (tentativeG < neighbor.g) {
					neighbor.g = tentativeG;
					neighbor.h = calculateHeuristic(neighbor.row, neighbor.col, endRow, endCol);
					neighbor.f = neighbor.g + neighbor.h;
				}
				unvisited.push(neighbor);
			}
		}
	}
};

findLeastHeatLoss(graph, 0, 0, graph.length - 1, graph[0].length - 1);
// console.log(heatLoss);
