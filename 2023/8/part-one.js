const { input: lines } = require("./input");

const INSTRUCTION = lines[0].trim();
const network = {};

for (i = 2; i < lines.length; i++) {
	const [node, nodeLeft, nodeRight] = lines[i].match(/[A-Z]+/g);
	network[node] = [nodeLeft, nodeRight];
}

let steps = 0;

let currentNode = "AAA";
while (currentNode !== "ZZZ") {
	const instruction = INSTRUCTION[steps % INSTRUCTION.length];
	steps++;
	if (instruction === 'L') {
		currentNode = network[currentNode][0];
	} else {
		currentNode = network[currentNode][1];
	}
}

console.log(steps);
