const { input } = require("./input");

const [workflowInput, partsInput] = input.split("\n\n");

class Workflow {
	constructor(name, rules) {
		this.name = name;
		this.rules = rules;
	}
}

class Part {
	constructor(x, m, a, s) {
		this.x = x;
		this.m = m;
		this.a = a;
		this.s = s;
	}
}

const workflows = workflowInput.split("\n").reduce((acc, line) => {
	const name = line.match(/^([^{}]+){/);
	const rules = line.match(/^.*{(.+)}$/)[1].split(",");
	// console.log(rules);
	// console.log(defaultRule[1]);
	// const workflow = new Workflow()
	acc.push(new Workflow(name, rules));
	return acc;
}, []);

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

console.log(parts);