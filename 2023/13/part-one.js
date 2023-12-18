const { input: lines } = require("./input");

const graphs = [];

lines.forEach(line => {
	const rows = line.split("\n");
	const graph = Array.from(rows, row => row.split(""));
	graphs.push(graph);
});

const hasXReflect = (row, nextRow, graph) => {
	
	for (let col = 0; i < graph[0].length; col++) {
		if (graph[row][col] !== graph[nextRow][col]) {
			return false;
		}
	}
	return hasXReflect(row - 1, nextRow + 1);
}

