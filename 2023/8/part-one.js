const { input: lines } = require("./input");

const INSTRUCTION = lines[0].trim();
const network = {};

for (i = 2; i < lines.length; i++) {
	const [node, nodeLeft, nodeRight] = lines[i].match(/[A-Z]+/g);
	network[node] = [nodeLeft, nodeRight];
}

// console.log(network);

const start = lines[2].match(/[A-Z]+/)[0];
const end = lines.at(-1).match(/[A-Z]+/)[0];
let steps = 0;

const move = (currentNode, end) => {
	if (currentNode === end) {
		return;
	}
	const [nodeLeft, nodeRight] = network[currentNode];
	const instruction = INSTRUCTION[steps % INSTRUCTION.length];
	console.log(instruction, nodeLeft, nodeRight);
	steps++;
	if (instruction === 'L') {
		move(nodeLeft, end);
	} else {
		move(nodeRight, end);
	}
};

move(start, end);
console.log(steps);