const { input: lines } = require("./input");

const graph = Array.from(lines, line => line.split(""));

const DIRECTION = {
	UP: [-1, 0],
	DOWN: [1, 0],
	RIGHT: [0, 1],
	LEFT: [0, -1]
};

const findLongestPath = (graph, startX, startY, endX, endY) => {
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

findLongestPath(graph, 0, 1, graph.length - 1, graph.at(-1).length - 2);
// console.log(graph[22][21]);