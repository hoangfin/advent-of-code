const { input: lines } = require("./input");

const sketch = lines.reduce((acc, line) => {
	acc.push(Array.from(line));
	return acc;
}, []);

const [startRow, startCol] = (() => {
	for (let i = 0; i < sketch.length; i++) {
		const sIndex = sketch[i].findIndex(char => char === 'S');
		if (sIndex !== -1) {
			return [i, sIndex];
		}
	}
	return [undefined, undefined];
})();

const deepCopy = originalArray => {
    return originalArray.map(innerArray => Array.isArray(innerArray) ? deepCopy(innerArray) : innerArray);
};

const findFarthestLoop = (sketch, startRow, startCol) => {
	const visited = Array.from(
		{ length: sketch.length },
		() => new Array(sketch[0].length).fill(false)
	);
	const dict = {};

	const isValid = (sketch, row, col, prevRow, prevCol) => {
		if (row < 0 || row >= sketch.length || col < 0 || col >= sketch[0].length) {
			return false;
		}

		if (sketch[row][col] === '.') {
			return false;
		}

		if (col - prevCol === 1) {
			if ("FL|".includes(sketch[row][col])) {
				return false;
			}
		}

		if (col - prevCol === -1) {
			if ("7J|".includes(sketch[row][col])) {
				return false;
			}
		}

		if (row - prevRow === 1) {
			if ("7F-".includes(sketch[row][col])) {
				return false;
			}
		}

		if (row - prevRow === -1) {
			if ("LJ-".includes(sketch[row][col])) {
				return false;
			}
		}
		return true;
	};

	const move = (sketch, startRow, startCol) => {
		const stack = [];
		stack.push([startRow, startCol, 0]);
		while (stack.length > 0) {
			const [row, col, depth] = stack.pop();
			if (!visited[row][col]) {
				visited[row][col] = true;
				console.log("depth = " + depth);
				if (!dict[`r${row}c${col}`]) {
					dict[`r${row}c${col}`] = depth;
				} else if (dict[`r${row}c${col}`] < depth) {
					dict[`r${row}c${col}`] = depth;
				}
				for (const neighbour of [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]]) {
					if (
						isValid(sketch, neighbour[0], neighbour[1], row, col) &&
						!visited[neighbour[0]][neighbour[1]]
					) {
						stack.push([...neighbour, depth + 1]);
					}
				}
			}
		}
	};

	move(sketch, startRow, startCol);

	const validNodes = [
		[startRow - 1, startCol],
		[startRow + 1, startCol],
		[startRow, startCol - 1],
		[startRow, startCol + 1]
	].filter(sketchNode => isValid(sketch, sketchNode[0], sketchNode[1], startRow, startCol));

	console.log(validNodes);
	validNodes.forEach(node => console.log(Math.round(dict[`r${node[0]}c${node[1]}`] / 2)));
};

const allSolutions = findFarthestLoop(sketch, startRow, startCol);