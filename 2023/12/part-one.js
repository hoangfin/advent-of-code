const { input: lines } = require("./input");

const records = lines.reduce((acc, line) => {
	const [pattern, code] = line.split(" ");
	acc.push([
		pattern,
		code.split(",").map(number => parseInt(number))
	]);
	return acc;
}, []);

// console.log(records);

const isValidArrangement = (pattern, damagedSprings) => {
	const damagedSymbols = pattern.match(/#+/g);
	if (!damagedSymbols) {
		return false;
	}
	if (damagedSymbols.length !== damagedSprings.length) {
		return false;
	}
	for (let i = 0; i < damagedSymbols.length; i++) {
		if (damagedSymbols[i].length !== damagedSprings[i]) {
			return false;
		}
	}
	return true;
}

const countArrangements = record => {
	const [pattern, damagedSprings] = record;
	let arrangementsCount = 0;
	const unknownSprings = pattern.match(/\?/g);

	for (let i = 0; i < Math.pow(2, unknownSprings.length); i++) {
		let binary = i.toString(2).padStart(unknownSprings.length, '0');
		const testPattern = pattern.replace(/\?/g, () => {
			const prevBinary = binary;
			binary = binary.slice(1);
			return prevBinary[0] === '1' ? '#' : '.';
		});
		if (isValidArrangement(testPattern, damagedSprings)) {
			arrangementsCount++;
		}
	}
	return arrangementsCount;
};

const findSumOfArrangements = records => {
	let sum = 0;

	records.forEach((record, i) => {
		sum += countArrangements(record);
	});

	return sum;
};

const t0 = performance.now();
console.log(findSumOfArrangements(records));
console.log(performance.now() - t0);
