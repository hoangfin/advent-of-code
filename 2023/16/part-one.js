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

const findEnergizedTiles = (graph, startRow, startCol, direction) => {

	const energizedTiles = new Map();
	const snapShot = Array.from(
		{ length: graph.length },
		() => new Array(graph[0].length).fill('.')
	);

	const move = (graph, row, col, direction) => {
		const key = JSON.stringify({ row, col, direction });
		if (row < 0 || row >= graph.length || col < 0 || col >= graph[0].length) {
			return;
		}

		if (energizedTiles.has(key)) {
			return energizedTiles.get(key);
		}

		energizedTiles.set(key, '#');
		snapShot[row][col] = '#';
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
	move(graph, startRow, startCol, direction);

	return snapShot.reduce((acc, shot) => {
		for (let i = 0; i < shot.length; i++) {
			if (shot[i] === '#') {
				acc++;
			}
		}
		return acc;
	}, 0);
};

const tiles = findEnergizedTiles(graph, 0, 0, RIGHT);

console.log(tiles);
// let total = 0;
// energizedTiles.forEach(tiles => {
// 	let sum = 0;
// 	for (let i = 0; i < tiles.length; i++) {
// 		if (tiles[i]) {
// 			sum++;
// 		}
// 	}
// 	total += sum;
// });
// console.log(total);
// energizedTiles.forEach(tiles => console.log(...tiles));