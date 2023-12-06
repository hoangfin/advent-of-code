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

const time = parseInt(lines[0].match(/\d+/g).join(""));
const distance = parseInt(lines[1].match(/\d+/g).join(""));

let racesWinCount = 0;

for (let i = 1; i < time; i++) {
	if (isWinnable(i, time, distance)) {
		racesWinCount++;
	}
}

console.log(racesWinCount);
