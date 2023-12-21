const { input } = require("./input");

const [workflowInput, partsInput] = input.split("\n\n");

class Part {
	constructor(x, m, a, s) {
		this.x = x;
		this.m = m;
		this.a = a;
		this.s = s;
	}
}

// const evaluatePart = (part, key, workflowMap) => {
// 	const workflow = workflowMap.get(key);
// 	workflow.
// 	if (result === 'A') {
// 		return part.values().reduce((acc, v) => acc + v, 0);
// 	}
// 	if (result === 'R') {
// 		return 0;
// 	}
// };

const workflow = workflowInput.split("\n").reduce((acc, line) => {
	const name = line.match(/^([^{}]+){/);
	const rules = line.match(/^.*{(.+)}$/)[1].split(",");
	acc.set(name[1], rules);
	return acc;
}, new Map());

const parts = partsInput.split("\n").reduce((acc, line) => {
	const [x, m, a, s] = line.match(/^{(.+)}$/)[1].split(",");
	acc.push(new Part(
		parseInt(x.split("=")[1]),
		parseInt(m.split("=")[1]),
		parseInt(a.split("=")[1]),
		parseInt(s.split("=")[1])
	));
	return acc;
}, []);

// parts.forEach(part => {
// 	evaluatePart(part, workflow.get("in"))
// });

new Function(parts[0], "")
// console.log(workflow.get("in"));