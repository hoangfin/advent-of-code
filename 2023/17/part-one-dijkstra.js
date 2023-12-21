const { input: lines } = require("./input");

class City {
	constructor(row, col, heatLoss) {
		this.parent = null;
		this.row = row;
		this.col = col;
		this.heatLoss = heatLoss;
		this.actualHeatLoss = Infinity;
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

// const q = [...graph];

// console.log(q.length, "====", graph.length);
// q.splice(1, 10);
// console.log(q.length, "====", graph.length);
const findLeastHeatLoss = (graph, startRow, startCol, endRow, endCol) => {

	const queue = graph.flat(Infinity);

	const start = graph[startRow][startCol];
	start.actualHeatLoss = 0;

	while (queue.length > 0) {
		const currentCity = queue.reduce(
			(acc, city) => {
				if (city && city.actualHeatLoss < acc.actualHeatLoss) {
					acc = city;
				}
				return acc;
			},
			queue[0]
		);
		queue.splice(queue.indexOf(currentCity), 1);
		if (currentCity.row === endRow && currentCity.col === endCol) {
			const path = buildPath(currentCity);
			console.log(currentCity.actualHeatLoss);
			// const heatLoss = path.reduce((acc, city) => acc + city.g, 0);
			// return currentCity.g;
		}
		// console.log(Object.keys(currentCity));
		// visited.push(currentCity);
		if (currentCity) {
			const neighbors = currentCity.getNeighbors(graph);
			// console.log(neighbors);
			if (neighbors.length > 0) {
				for (const neighbor of neighbors) {
					const tentativeHeatLoss = currentCity.actualHeatLoss + neighbor.heatLoss;
					if (tentativeHeatLoss < neighbor.actualHeatLoss) {
						neighbor.actualHeatLoss = tentativeHeatLoss;
						neighbor.parent = currentCity;
					}
				}
			}

		}
	}
};

findLeastHeatLoss(graph, 0, 0, graph.length - 1, graph[0].length - 1);
// console.log(heatLoss);
// console.log(graph[1][1].getNeighbors(graph));
