const { input: lines } = require("./input");

const INSTRUCTION = lines[0].trim();
const network = {};

for (i = 2; i < lines.length; i++) {
	const [node, nodeLeft, nodeRight] = lines[i].match(/[A-Z]+/g);
	network[node] = [nodeLeft, nodeRight];
}

const nodeSteps = [];
let startNodes = [];
let endNodes = [];

for (let node in network) {
	if (node.endsWith("A")) {
		startNodes.push(node);
	} else if (node.endsWith("Z")){
		endNodes.push(node);
	}
}

const azPairs = startNodes.reduce((acc, node) => {
	const endNode = endNodes.find(
		endNode => network[endNode].every(n => network[node].includes(n))
	);
	acc.push([node, endNode]);
	return acc;
}, []);

azPairs.forEach(pair => {
	let [start, end] = pair;
	let steps = 0;
	while (start !== end) {
		const instruction = INSTRUCTION[steps % INSTRUCTION.length];
		steps++;
		if (instruction === 'L') {
			start = network[start][0];
		} else {
			start = network[start][1];
		}
	}
	nodeSteps.push(steps);
});

const gcd = (a, b) => a ? gcd(b % a, a) : b;

const lcm = (a, b) => a * b / gcd(a, b);

console.log(nodeSteps.reduce(lcm));
