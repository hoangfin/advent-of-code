const { input: lines } = require("./input");

const generateSequence = numbers => {
	const sequence = [];
	if (numbers.length <= 1) {
		return [...numbers];
	}
	for (let i = 0; i < numbers.length; i++) {
		if (i + 1 < numbers.length) {
			sequence.push(numbers[i + 1] - numbers[i]);
		}
	}
	return sequence;
}

let histories = [];

lines.forEach(line => {
	const numbers = line.split(" ");
	histories.push(numbers.map(number => parseInt(number)));
});

histories = histories.map(history => {
	const sequences = [history];
	let sequence = generateSequence(history);
	while (sequence.some(number => number !== 0)) {
		sequences.push(sequence);
		sequence = generateSequence(sequence);
	}
	return sequences;
});

let extrapolatedValuesSum = 0;

histories.forEach(history => {
	let sum = 0;
	for (let i = history.length - 1; i >= 0; i--) {
		sum = history[i][0] - sum;
	}
	extrapolatedValuesSum += sum;
});

console.log(extrapolatedValuesSum);
