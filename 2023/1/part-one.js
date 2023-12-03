const { input } = require("./input");

let sum = 0;

input.forEach(line => {
	const numbers = line.match(/\d/g);
	sum += parseInt(numbers[0] + numbers[numbers.length - 1]);
});

console.log(sum);