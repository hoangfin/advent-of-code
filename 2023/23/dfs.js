const DIRECTION = {
	UP: [-1, 0],
	DOWN: [1, 0],
	RIGHT: [0, 1],
	LEFT: [0, -1]
};

exports.partOne = (graph, startX, startY, endX, endY) => {
	const stack = [];
	const visited = new Map();
	let maxSteps = Number.NEGATIVE_INFINITY;

	stack.push([startX, startY, "", 0]);
	while (stack.length > 0) {
		const [x, y, direction, steps] = stack.pop();
		visited.set(`${x}-${y}-${direction}-${steps}`, steps);
		if (x === endX && y === endY) {
			if (maxSteps < steps) {
				maxSteps = steps;
			}
		}
		for (const [nextDirection, [deltaX, deltaY]] of Object.entries(DIRECTION)) {
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
			if (direction === "UP" && nextDirection === "DOWN")
				continue;
			if (direction === "DOWN" && nextDirection === "UP")
				continue;
			if (direction === "RIGHT" && nextDirection === "LEFT")
				continue;
			if (direction === "LEFT" && nextDirection === "RIGHT")
				continue;
			if (!visited.has(`${x + deltaX}-${y + deltaY}-${nextDirection}-${steps + 1}`)) {
				visited.set(`${x + deltaX}-${y + deltaY}-${nextDirection}-${steps + 1}`, steps + 1);
				stack.push([x + deltaX, y + deltaY, nextDirection, steps + 1]);
			}
		}
	}
	return maxSteps;
}

exports.partTwo = (graph, startX, startY, endX, endY) => {
	const stack = [];
	const visited = new Map();
	let maxSteps = Number.NEGATIVE_INFINITY;

	stack.push([startX, startY, "", 0]);
	while (stack.length > 0) {
		const [x, y, direction, steps] = stack.pop();
		visited.set(`${x}-${y}-${direction}-${steps}`, steps);
		if (x === endX && y === endY) {
			if (maxSteps < steps) {
				maxSteps = steps;
			}
		}
		for (const [nextDirection, [deltaX, deltaY]] of Object.entries(DIRECTION)) {
			const tile = graph[x + deltaX]?.[y + deltaY];
			if (tile === undefined || tile === '#') {
				continue;
			}
			if (direction === "UP" && nextDirection === "DOWN")
				continue;
			if (direction === "DOWN" && nextDirection === "UP")
				continue;
			if (direction === "RIGHT" && nextDirection === "LEFT")
				continue;
			if (direction === "LEFT" && nextDirection === "RIGHT")
				continue;
			if (!visited.has(`${x + deltaX}-${y + deltaY}-${nextDirection}-${steps + 1}`)) {
				visited.set(`${x + deltaX}-${y + deltaY}-${nextDirection}-${steps + 1}`, steps + 1);
				stack.push([x + deltaX, y + deltaY, nextDirection, steps + 1]);
			}
		}
	}
	return maxSteps;
}