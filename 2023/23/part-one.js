const { input: lines } = require("./input");

const graph = Array.from(lines, line => line.split(""));

const direction = {
	UP: [-1, 0],
	DOWN: [1, 0],
	RIGHT: [0, 1],
	LEFT: [0, -1]
};

const findLongestPath = (graph, startX, startY, endX, endY) => {
	const visited = Array.from(
		{ length: graph.length },
		() => new Array(graph[0].length).fill('.')
	);
	let maxHikeSteps = 0;

	const move = (graph, x, y, endX, endY, steps, visited) => {
		if (x < 0 || x >= graph.length || y < 0 || y >= graph[0].length || visited[x][y] === 'O') {
			return;
		}

		const tile = graph[x][y];
		if (tile === '#') {
			return;
		}

		visited[x][y] = 'O';
		steps++;
		if (x === endX && y === endY) {
			return steps;
		}

		for (const [deltaX, deltaY] of Object.values(direction)) {
			if (tile === '^' && deltaX === 1)
				continue;
			if (tile === 'v' && deltaX === -1)
				continue;
			if (tile === '>' && deltaY === -1)
				continue;
			if (tile === '<' && deltaY === 1)
				continue;
			move(graph, x+ deltaX, y + deltaY, endX, endY, steps, visited);
		}
		visited[x][y] = '.';
	}

	visited[startX][startY] = 'O';
	move(graph, 1, 1, endX, endY, 0, visited);
	visited[startX][startY] = false;
	console.log(maxHikeSteps);
}

findLongestPath(graph, 0, 1, graph.length - 1, graph.at(-1).length - 2);
// console.log(graph[22][21]);