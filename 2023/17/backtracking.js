const DIRECTION = {
	UP: [-1, 0],
	RIGHT: [0, 1],
	DOWN: [1, 0],
	LEFT: [0, -1]
};

exports.findLeastHeatLoss = (graph, startX, startY, endX, endY) => {
	const visited = Array.from(
		{ length: graph.length },
		() => new Array(graph[0].length).fill('.')
	);
	let minHeatLoss = Number.POSITIVE_INFINITY;

	const isValidMove = (graph, x, y, visited) => {
		if (x < 0 || x >= graph.length || y < 0 || y >= graph[0].length) {
			return false;
		}
		if (visited[x][y] === 'O') {
			return false;
		}
		// for (let i = 1; i <= 3; i++) {
		// 	if (visited[x + i]?.[y] === 'O' || visited[x - i]?.[y] === 'O')
		// }
		return true;
	};

	const move = (graph, x, y, endX, endY, g, visited) => {
		visited[x][y] = 'O';
		g += parseInt(graph[x][y]);
		if (x === endX && y === endY) {
			if (minHeatLoss > g) {
				minHeatLoss = g;
			}
			visited[x][y] = '.';
			return;
		}

		for (const [deltaX, deltaY] of Object.values(DIRECTION)) {
			if (isValidMove(graph, x + deltaX, y + deltaY, visited)) {
				move(graph, x + deltaX, y + deltaY, endX, endY, g, visited);
			}
		}
		visited[x][y] = '.';
	}

	visited[startX][startY] = 'O';
	move(graph, 0, 1, endX, endY, 0, visited);
	move(graph, 1, 0, endX, endY, 0, visited);
	visited[startX][startY] = '.';
	console.log(minHeatLoss);
}