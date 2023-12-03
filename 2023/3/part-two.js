const { input: lines } = require("./input");

let sum = 0;
const numbersAtRow = [];

const checkGearRatio = (row, col) => {
	const partNumbers = [];
	numbersAtRow[row].forEach(number => {
		if (number.leftCol === col + 1 || number.rightCol === col - 1) {
			partNumbers.push(number.value);
		}
	});
	numbersAtRow[row - 1]?.forEach(number => {
		if (number.rightCol < col - 1 || number.leftCol > col + 1) {
			return;
		}
		partNumbers.push(number.value);
	});
	numbersAtRow[row + 1]?.forEach(number => {
		if (number.rightCol < col - 1 || number.leftCol > col + 1) {
			return;
		}
		partNumbers.push(number.value);
	});
	if (partNumbers.length == 2) {
		sum += partNumbers[0] * partNumbers[1];
	}
}

lines.forEach(line => {
	const regex = /\d+/g;
	const numbers = [];
	for (let match = regex.exec(line); match !== null; match = regex.exec(line)) {
		numbers.push({
			leftCol: match.index,
			rightCol: regex.lastIndex - 1,
			value: parseInt(match[0], 10)
		});
	}
	numbersAtRow.push(numbers);
});

for (let row = 0; row < lines.length; row++) {
	for (let col = 0; col < lines[row].length; col++) {
		if (lines[row][col] === '*') {
			checkGearRatio(row, col);
		}
	}
}

console.log(sum);
