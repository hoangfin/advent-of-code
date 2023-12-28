const { input: lines } = require("./input");

const graph = Array.from(lines, line => line.split(""));

const DIRECTION = {
	UP: [-1, 0],
	DOWN: [1, 0],
	RIGHT: [0, 1],
	LEFT: [0, -1]
};

const findLongestPath = (graph, startX, startY, endX, endY) => {

	const queue = [];
	const memo = new Map();
	queue.push([startX, startY, "", 0]);
	while (queue.length > 0) {
		const [x, y, direction, steps] = queue.pop();
		memo.set(`${x}-${y}-${direction}`, steps);
		if (x === endX && y === endY) {
			console.log(steps);
		}
		for (const [dir, [deltaX, deltaY]] of Object.entries(DIRECTION)) {
			const tile = graph[x + deltaX]?.[y + deltaY];
			if (tile === undefined || tile === '#') {
				continue;
			}
			if (direction === "UP" && dir === "DOWN")
				continue;
			if (direction === "DOWN" && dir === "UP")
				continue;
			if (direction === "RIGHT" && dir === "LEFT")
				continue;
			if (direction === "LEFT" && dir === "RIGHT")
				continue;
			if (memo.has(`${x + deltaX}-${y + deltaY}-${dir}`)) {
				continue;
			}
			queue.push([x + deltaX, y + deltaY, dir, steps + 1]);
		}
	}
}

findLongestPath(graph, 0, 1, graph.length - 1, graph.at(-1).length - 2);
// console.log(graph[22][21]);