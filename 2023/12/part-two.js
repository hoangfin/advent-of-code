const { input: lines } = require("./input");
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");
const os = require("os");

if (isMainThread) {
	const numberOfCPUs = os.cpus.length;
	const records = lines.reduce((acc, line) => {
		let [pattern, code] = line.split(" ");
		pattern = `${(pattern + "?").repeat(4)}${pattern}`;
		code = `${(code + ",").repeat(4)}${code}`;
		acc.push([
			pattern,
			code.split(",").map(number => parseInt(number))
		]);
		return acc;
	}, []);
	const chunks = records.splice()
	// console.log(records);
	const findSumOfArrangements = records => {
		let sum = 0;

		const isValidArrangement = (pattern, damagedSprings) => {
			const damagedSymbols = pattern.match(/#+/g);
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

		records.forEach((record, i) => {
			sum += countArrangements(record);
		});

		return sum;
	};


	const workers = [];

	for (let i = 0; i < numberOfCPUs; i++) {
		workers[i] = new Worker(__filename, {
			workerData: {
				findSumOfArrangements,
				records: chunks[i]
			}
		});
	}

	console.log(findSumOfArrangements(records));
}


