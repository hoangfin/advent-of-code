const { input: instructions } = require("./input");

const graph = Array.from({ length: instructions.length }, () => []);

const fillGraph = (graph, row, col, instructions) => {
	const instruction = instructions.shift();
	if (!instruction) return;
	const [direction, number] = instruction;
	for (i = 0; i < parseInt(number); i++) {
		
	}
	switch (direction) {
		case 'U': {

		}
		case 'R': {

		}
		case 'D': {

		}
		case 'L': {

		}
		default:
			break;
	}
};

instructions.forEach(instruction => {
	const [direction, number, color] = instruction.split(" ");

});