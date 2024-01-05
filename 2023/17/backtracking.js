const DIRECTION = {
	UP: [-1, 0],
	RIGHT: [0, 1],
	DOWN: [1, 0],
	LEFT: [0, -1]
};

exports.partOne = (graph, startX, startY, endX, endY) => {
	const path = Array.from(
		{ length: graph.length },
		() => new Array(graph[0].length).fill('.')
	);
	let minHeatLoss = Number.POSITIVE_INFINITY;

	const move = (graph, x, y, direction, steps, g, path) => {
		g += parseInt(graph[x][y]);
		path[x][y] = 'O';
		if (x === endX && y === endY) {
			if (minHeatLoss > g) {
				minHeatLoss = g;
			}
			path[x][y] = '.';
			return;
		}

		for (const [nextDirection, [deltaX, deltaY]] of Object.entries(DIRECTION)) {
			const heatLoss = graph[x + deltaX]?.[y + deltaY];
			if (!heatLoss || g > minHeatLoss || path[x + deltaX][y + deltaY] === 'O') {
				continue;
			}
			const nextSteps = direction === nextDirection ? (steps + 1) : 1;
			if (nextSteps === 4) {
				continue;
			}
			move(graph, x + deltaX, y + deltaY, nextDirection, nextSteps, g, path);
		}
		path[x][y] = '.';
	}

	path[startX][startY] = 'O';
	move(graph, 0, 1, "RIGHT", 1, 0, path);
	move(graph, 1, 0, "DOWN", 1, 0, path);
	path[startX][startY] = '.';
	return minHeatLoss;
}