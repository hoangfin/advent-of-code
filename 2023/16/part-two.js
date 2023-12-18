const { input: lines } = require("./input");

const graph = Array.from(lines, line => line.split(""));

const SPACE = '.';
const MIRROR_LEFT = '/';
const MIRROR_RIGHT = '\\';
const VER_SPLITTER = '|';
const HOR_SPLITTER = '-';
const UP = [-1, 0];
const RIGHT = [0, 1];
const DOWN = [1, 0];
const LEFT = [0, -1];

const directionsMap = new Map();
directionsMap.set(JSON.stringify(UP + SPACE), [UP]);
directionsMap.set(JSON.stringify(UP + MIRROR_LEFT), [RIGHT]);
directionsMap.set(JSON.stringify(UP + MIRROR_RIGHT), [LEFT]);
directionsMap.set(JSON.stringify(UP + VER_SPLITTER), [UP]);
directionsMap.set(JSON.stringify(UP + HOR_SPLITTER), [LEFT, RIGHT]);

directionsMap.set(JSON.stringify(RIGHT + SPACE), [RIGHT]);
directionsMap.set(JSON.stringify(RIGHT + MIRROR_LEFT), [UP]);
directionsMap.set(JSON.stringify(RIGHT + MIRROR_RIGHT), [DOWN]);
directionsMap.set(JSON.stringify(RIGHT + VER_SPLITTER), [UP, DOWN]);
directionsMap.set(JSON.stringify(RIGHT + HOR_SPLITTER), [RIGHT]);

directionsMap.set(JSON.stringify(DOWN + SPACE), [DOWN]);
directionsMap.set(JSON.stringify(DOWN + MIRROR_LEFT), [LEFT]);
directionsMap.set(JSON.stringify(DOWN + MIRROR_RIGHT), [RIGHT]);
directionsMap.set(JSON.stringify(DOWN + VER_SPLITTER), [DOWN]);
directionsMap.set(JSON.stringify(DOWN + HOR_SPLITTER), [LEFT, RIGHT]);

directionsMap.set(JSON.stringify(LEFT + SPACE), [LEFT]);
directionsMap.set(JSON.stringify(LEFT + MIRROR_LEFT), [DOWN]);
directionsMap.set(JSON.stringify(LEFT + MIRROR_RIGHT), [UP]);
directionsMap.set(JSON.stringify(LEFT + VER_SPLITTER), [UP, DOWN]);
directionsMap.set(JSON.stringify(LEFT + HOR_SPLITTER), [LEFT]);

// console.log(JSON.stringify(UP + MIRROR_RIGHT));
// console.log(JSON.stringify(UP + graph[0][0]));
// console.log(MIRROR_RIGHT === graph[0][0]);

const countEnergizedTiles = energizedTilesGrap => {
	return energizedTilesGrap.reduce((acc, tiles) => {
		for (let i = 0; i < tiles.length; i++) {
			if (tiles[i] === '#') {
				acc++;
			}
		}
		return acc;
	}, 0);
}

const findMaxEnergizedGraph = (graph) => {

	const cache = new Map();

	const energizedTilesGrap = Array.from(
		{ length: graph.length },
		() => new Array(graph[0].length).fill('.')
	);

	let max = 0;

	const move = (graph, row, col, direction) => {
		const key = JSON.stringify({ row, col, direction });
		if (row < 0 || row >= graph.length || col < 0 || col >= graph[0].length) {
			return;
		}

		if (cache.has(key)) {
			return cache.get(key);
		}

		cache.set(key, '#');
		energizedTilesGrap[row][col] = '#';
		const nextDirections = directionsMap.get(JSON.stringify(direction + graph[row][col]));
		// console.log(row, col);
		// console.log(nextDirections);
		// console.log("=========================");
		for (let i = 0; i < nextDirections.length; i++) {
			move(
				graph,
				row + nextDirections[i][0],
				col + nextDirections[i][1],
				nextDirections[i]
			)
		}

	};

	for (let i = 0; i < graph.length; i++) {
		let n = 0;
		move(graph, i, 0, RIGHT);
		n = countEnergizedTiles(energizedTilesGrap);
		if (max < n) {
			max = n;
		}
		cache.clear();
		energizedTilesGrap.forEach(tiles => tiles.fill('.'));
		move(graph, i, graph[0].length - 1, LEFT);
		n = countEnergizedTiles(energizedTilesGrap);
		if (max < n) {
			max = n;
		}
		cache.clear();
		energizedTilesGrap.forEach(tiles => tiles.fill('.'));
	}

	for (let i = 0; i < graph[0].length; i++) {
		let n = 0;
		move(graph, 0, i, DOWN);
		n = countEnergizedTiles(energizedTilesGrap);
		if (max < n) {
			max = n;
		}
		cache.clear();
		energizedTilesGrap.forEach(tiles => tiles.fill('.'));
		move(graph, graph.length - 1, i, UP);
		n = countEnergizedTiles(energizedTilesGrap);
		if (max < n) {
			max = n;
		}
		cache.clear();
		energizedTilesGrap.forEach(tiles => tiles.fill('.'));
	}

	console.log(max);
};

findMaxEnergizedGraph(graph);

// let max = 0;





// console.log(max);