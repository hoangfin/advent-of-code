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
		if (this.parent?.parent?.row === this.parent?.row && this.parent?.row === this.row) {
			return [
				graph[this.row - 1] ? graph[this.row - 1][this.col] : undefined,
				graph[this.row + 1] ? graph[this.row + 1][this.col] : undefined
			].filter(city => city !== undefined);
		}
		if (this.parent?.parent?.col === this.parent?.col && this.parent?.col === this.col) {
			return [
				graph[this.row] ? graph[this.row][this.col - 1] : undefined,
				graph[this.row] ? graph[this.row][this.col + 1] : undefined
			].filter(city => city !== undefined);
		}
		return [
			graph[this.row - 1] ? graph[this.row - 1][this.col] : undefined,
			graph[this.row + 1] ? graph[this.row + 1][this.col] : undefined,
			graph[this.row] ? graph[this.row][this.col - 1] : undefined,
			graph[this.row] ? graph[this.row][this.col + 1] : undefined
		].filter(city => city !== undefined);
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
		if (currentCity.row === endRow && currentCity.col === endCol) {
			const path = buildPath(currentCity);
			const heatLoss = path.reduce((acc, city) => acc + city.heatLoss, 0);
			console.log(path[0], "====", path.at(-1));
			return heatLoss;
		}
		visited.push(currentCity);
		for (const neighbor of currentCity.getNeighbors(graph)) {
			if (visited.includes(neighbor))
				continue;
			if (!unvisited.includes(neighbor)) {
				const tentativeG = currentCity.g + neighbor.heatLoss;
				if (tentativeG < neighbor.g) {
					neighbor.parent = currentCity;
					neighbor.g = tentativeG;
					neighbor.h = calculateHeuristic(neighbor.row, neighbor.col, endRow, endCol);
					neighbor.f = neighbor.g + neighbor.h;
				}
				unvisited.push(neighbor);
			}
		}
	}
};

const heatLoss = findLeastHeatLoss(graph, 0, 0, graph.length - 1, graph[0].length - 1);
