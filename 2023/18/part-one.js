const { input: lines } = require("./input");

const instructions = Array.from(lines, line => line.split(" "));

let minX = 0;
let minY = 0;

let coordinates = instructions.reduce((acc, [dir, displacement]) => {
	let [x, y] = acc.at(-1);
	if (dir === 'U') {
		y = y - parseInt(displacement);
	} else if (dir === 'D') {
		y = y + parseInt(displacement);
	} else if (dir === 'R') {
		x = x + parseInt(displacement);
	} else if (dir === 'L') {
		x = x - parseInt(displacement);
	}
	if (minX > x) minX = x;
	if (minY > y) minY = y;
	acc.push([x, y]);
	return acc;
}, [[0, 0]]);

coordinates = coordinates.map(coordinate => [
	coordinate[0] + Math.abs(minX),
	coordinate[1] + Math.abs(minY)
]);

const fillGraph = (graph, coordinates) => {
	if (coordinates.length <= 1) return;
	const [x1, y1] = coordinates[0];
	const [x2, y2] = coordinates[1];
	console.log(x1, y1, x2, y2);
	if (x1 !== x2) {
		const steps = (x2 - x1) / (x2 - x1);
		let i = x1;
		do {
			graph[i][y1] = '#';
			i += steps;
		} while (i !== x2);
	}
	if (y1 !== y2) {
		const steps = (y2 - y1) / (y2 - y1);
		let i = y1;
		do {
			graph[x1][i] = '#';
			i += steps;
		} while (i !== y2);
	}
	fillGraph(graph, coordinates.slice(1));
};

const graph = Array.from({ length: 10 }, () => new Array(7).fill('.'));

fillGraph(graph, coordinates);

graph.forEach(v => console.log(...v));