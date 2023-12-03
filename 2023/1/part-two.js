const { input } = require("./input");

const numberWords = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9
};

let sum = 0;

input.forEach(line => {
	let first = undefined;
	let last = undefined;
	for (const key in numberWords) {
		const i = line.indexOf(key);
		if (i != -1) {
			if (!first) {
				first = { i, value: key };
			} else {
				if (first.i > i) {
					first = { i, value: key };
				}
			}
		}
		const j = line.lastIndexOf(key);
		if (j != -1) {
			if (!last) {
				last = { j, value: key };
			} else {
				if (last.j < j) {
					last = { j, value: key };
				}
			}
		}
	}

	const numbers = line.match(/\d/g);

	if (!first && !last && numbers) {
		// console.log("first invalid, last invalid, numbers valid");
		sum += parseInt(numbers[0] + numbers[numbers.length - 1]);
		// console.log(`${numbers[0] + numbers[numbers.length - 1]}, sum = ${parseInt(numbers[0] + numbers[numbers.length - 1])}`);
		return;
	}

	if (first && last && !numbers) {
		if (first.i === last.j && first.value === last.value) {
			sum += parseInt(numberWords[first.value]);
			return;
		}
		sum += parseInt(numberWords[first.value] + "" + numberWords[last.value]);

		return;
	}

	if (first && last && numbers) {
		let first_result = numberWords[first.value];
		if (first.i > line.indexOf(numbers[0])) {
			first_result = numbers[0];
		}
		let last_result = numberWords[last.value];
		if (last.j < line.lastIndexOf(numbers[numbers.length - 1])) {
			last_result = numbers[numbers.length - 1];
		}
		sum += parseInt(first_result + "" + last_result);
		return;
	}
});

console.log(sum);