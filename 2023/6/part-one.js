const { input: lines } = require("./input");

const isWinnable = (chargeTime, allowedTime, recordDistance) => {
	const speed = chargeTime;
	const remainingTime = allowedTime - chargeTime;
	const distanceTravelled = remainingTime * speed;
	if (distanceTravelled > recordDistance) {
		return true;
	}
	return false;
};

const time = lines[0].match(/\d+/g).map(t => parseInt(t));
const distances = lines[1].match(/\d+/g).map(d => parseInt(d));

const races = time.reduce((acc, v, i) => {
	acc.push([v, distances[i]]);
	return acc;
}, []);

let racesWinCount = 1;

races.forEach(race => {
	let winsNumber = 0;
	const [allowedTime, recordDistance] = race;
	for (let i = 1; i < allowedTime; i++) {
		if (isWinnable(i, allowedTime, recordDistance)) {
			winsNumber++;
		}
	}
	racesWinCount *= winsNumber;
});

console.log(racesWinCount);
