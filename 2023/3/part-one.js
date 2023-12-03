const { input: lines } = require("./input");
const fs = require('fs');

const partNumberMap = new Map();
const numbersAtRow = [];

const checkPartNumber = (row, col) => {
	numbersAtRow[row].forEach(number => {
		if (number.leftCol === col + 1 || number.rightCol === col - 1) {
			partNumberMap.set(`row${row}idx${number.leftCol}`, number.value);
		}
	});
	numbersAtRow[row - 1]?.forEach(number => {
		if (number.rightCol < col - 1 || number.leftCol > col + 1) {
			return;
		}
		partNumberMap.set(`row${row - 1}idx${number.leftCol}`, number.value);
	});
	numbersAtRow[row + 1]?.forEach(number => {
		if (number.rightCol < col - 1 || number.leftCol > col + 1) {
			return;
		}
		partNumberMap.set(`row${row + 1}idx${number.leftCol}`, number.value);
	});
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
		if (lines[row][col] !== '.' && isNaN(lines[row][col])) {
			checkPartNumber(row, col);
		}
	}
}

let sum = 0;
partNumberMap.forEach(e => { sum += parseInt(e, 10) });
console.log(sum);
