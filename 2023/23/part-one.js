const { input: lines } = require("./input");

const graph = Array.from(lines, line => line.split(""));

const DIRECTION = {
	UP: [-1, 0],
	DOWN: [1, 0],
	RIGHT: [0, 1],
	LEFT: [0, -1]
};

const backtrackMaxSteps = (graph, startX, startY, endX, endY) => {
	const visited = Array.from(
		{ length: graph.length },
		() => new Array(graph[0].length).fill('.')
	);
	let maxHikeSteps = 0;

	const move = (graph, x, y, endX, endY, steps, visited) => {
		const tile = graph[x]?.[y];
		if (tile === undefined || tile === '#' || visited[x][y] === 'O') {
			return;
		}

		visited[x][y] = 'O';
		steps++;
		if (x === endX && y === endY) {
			if (maxHikeSteps < steps) {
				maxHikeSteps = steps;
			}
			visited[x][y] = '.';
			return;
		}

		for (const [deltaX, deltaY] of Object.values(DIRECTION)) {
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
	visited[startX][startY] = '.';
	console.log(maxHikeSteps);
}

const dfsMaxSteps = (graph, startX, startY, endX, endY) => {
	const stack = [];
	const results = [];
	stack.push([startX, startY, "", 0]);
	while (stack.length > 0) {
		const [x, y, dir, steps] = stack.pop();
		if (x === endX && y === endY) {
			results.push(steps);
			continue;
		}
		for (const [direction, [deltaX, deltaY]] of Object.entries(DIRECTION)) {
			const tile = graph[x + deltaX]?.[y + deltaY];
			if (tile === undefined || tile === '#') {
				continue;
			}
			if (tile === '^' && deltaX === 1)
				continue;
			if (tile === 'v' && deltaX === -1)
				continue;
			if (tile === '>' && deltaY === -1)
				continue;
			if (tile === '<' && deltaY === 1)
				continue;
			if (dir === "UP" && direction === "DOWN")
				continue;
			if (dir === "DOWN" && direction === "UP")
				continue;
			if (dir === "RIGHT" && direction === "LEFT")
				continue;
			if (dir === "LEFT" && direction === "RIGHT")
				continue;
			stack.push([x+ deltaX, y + deltaY, direction, steps + 1]);
		}
	}
	console.log(Math.max(...results));
}

backtrackMaxSteps(graph, 0, 1, graph.length - 1, graph.at(-1).length - 2);
// dfsMaxSteps(graph, 0, 1, graph.length - 1, graph.at(-1).length - 2);
