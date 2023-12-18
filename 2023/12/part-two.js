const { input: lines } = require("./input");

const records2 = lines.reduce((acc, line) => {
	let [pattern, code] = line.split(" ");
	pattern = `${pattern}?${pattern}`;
	code = `${code},${code}`;
	acc.push([
		pattern,
		code.split(",").map(number => parseInt(number))
	]);
	return acc;
}, []);

const records1 = lines.reduce((acc, line) => {
	const [pattern, code] = line.split(" ");
	acc.push([
		pattern,
		code.split(",").map(number => parseInt(number))
	]);
	return acc;
}, []);

const stack = Array.from({ length: records1.length }, () => []);

const findSumOfArrangements = records => {

	const isValidArrangement = (pattern, damagedSprings) => {
		const damagedSymbols = pattern.match(/#+/g);
		if (!damagedSymbols) {
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

	records.forEach((record, i) => {
		const arrCount = countArrangements(record);
		stack[i].push(arrCount);
	});

};

findSumOfArrangements(records1);
findSumOfArrangements(records2);
console.log(stack);


