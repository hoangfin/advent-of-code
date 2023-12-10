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
	let max 

	const isValidMove = (sketch, row, col) => {
		if (row < 0 || row >= sketch.length || col < 0 || col >= sketch[0].length || visited[row][col]) {
			return false;
		}

		switch (sketch[row][col]) {
			case '.':
				return false;
			case ''
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

	const move = (sketch, row, col) => {
		if (sketch[row][col] === 'S') {
			console.log("End here");
			return true;
		}

		if (isValidMove(sketch, row, col)) {
			visited[row][col] = true;
			for (const neighbour of [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]]) {
				move(sketch, neighbour[0], neighbour[1]);
			}
		}

		return false;
	};

	move(sketch, startRow, startCol);

};

const allSolutions = findFarthestLoop(sketch, startRow, startCol);