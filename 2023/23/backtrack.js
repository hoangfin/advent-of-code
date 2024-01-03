const DIRECTION = {
	UP: [-1, 0],
	DOWN: [1, 0],
	RIGHT: [0, 1],
	LEFT: [0, -1]
};

exports.partOne = (graph, startX, startY, endX, endY) => {
	const visited = Array.from(
		{ length: graph.length },
		() => new Array(graph[0].length).fill('.')
	);

	const move = (graph, x, y, endX, endY, steps, visited) => {
		visited[x][y] = 'O';
		steps++;
		if (x === endX && y === endY) {
			visited[x][y] = '.';
			return steps;
		}
		const results = [];
		for (const [deltaX, deltaY] of Object.values(DIRECTION)) {
			const tile = graph[x + deltaX]?.[y + deltaY];
			if (tile === undefined || tile === '#' || visited[x + deltaX][y + deltaY] === 'O') {
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
			results.push(move(graph, x + deltaX, y + deltaY, endX, endY, steps, visited));
		}
		visited[x][y] = '.';
		return results.length > 0 ? Math.max(...results) : 0;
	}

	visited[startX][startY] = 'O';
	const maxHikeSteps = move(graph, 1, 1, endX, endY, 0, visited);
	visited[startX][startY] = '.';
	return maxHikeSteps;
}

// exports.partTwo = (graph, startX, startY, endX, endY) => {
// 	const path = Array.from(
// 		{ length: graph.length },
// 		() => new Array(graph[0].length).fill('.')
// 	);
// 	const stack = [];
// 	let maxSteps = 0;

// 	path[startX][startY] = 'O';
// 	stack.push([1, 1, 0, path]);
// 	while (stack.length > 0) {
// 		let [x, y, steps, path] = stack.pop();
// 		const clonedPath = copy(path);
// 		clonedPath[x][y] = 'O';
// 		steps++;
// 		if (x === endX && y === endY) {
// 			if (maxSteps < steps) {
// 				// path.forEach(row => console.log(...row));
// 				// console.log(steps);
// 				maxSteps = steps;
// 			}
// 			continue;
// 		}
// 		for (const [deltaX, deltaY] of Object.values(DIRECTION)) {
// 			const tile = graph[x + deltaX]?.[y + deltaY];
// 			if (tile === undefined || tile === '#' || clonedPath[x + deltaX][y + deltaY] === 'O') {
// 				continue;
// 			}
// 			stack.push([x + deltaX, y + deltaY, steps, clonedPath]);
// 		}
// 	}
// 	return maxSteps;
// }

// exports.partTwo = (graph, startX, startY, endX, endY) => {
// 	const memo = new Map();
// 	const visited = Array.from(
// 		{ length: graph.length },
// 		() => new Array(graph[0].length).fill('.')
// 	);

// 	const move = (graph, x, y, endX, endY, dir, steps, visited, memo) => {
// 		const key = `${x}-${y}-${dir}`;
// 		if (memo.has(key)) {
// 			console.log(x, y, steps, memo.get(key), steps + memo.get(key));
// 			return steps + memo.get(key);
// 		}
// 		visited[x][y] = 'O';
// 		steps++;
// 		if (x === endX && y === endY) {
// 			visited[x][y] = '.';
// 			return 1;
// 		}
// 		const results = [];
// 		for (const [direction, [deltaX, deltaY]] of Object.entries(DIRECTION)) {
// 			const tile = graph[x + deltaX]?.[y + deltaY];
// 			if (tile === undefined || tile === '#' || visited[x + deltaX][y + deltaY] === 'O') {
// 				continue;
// 			}
// 			results.push(1 + move(graph, x + deltaX, y + deltaY, endX, endY, direction, steps, visited, memo));
// 		}
// 		visited[x][y] = '.';
// 		const maxSteps = results.length > 0 ? Math.max(...results) : Number.NEGATIVE_INFINITY;
// 		if (!memo.has(key)) {
// 			// console.log(key + "duplicated");
// 			memo.set(key, maxSteps);
// 		}
// 		return maxSteps;
// 	}

// 	visited[startX][startY] = 'O';
// 	const maxHikeSteps = move(graph, 1, 1, endX, endY, "DOWN", 0, visited, memo);
// 	visited[startX][startY] = '.';
// 	return maxHikeSteps;
// }
