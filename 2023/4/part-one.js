const { input: lines } = require("./input");

let sum = 0;

lines.forEach(line => {

	const [, nums] = line.split(":");
	let [winNums, playerNums] = nums.split("|");
	winNums = winNums.match(/\d+/g).map(num => parseInt(num, 10));
	playerNums = playerNums.match(/\d+/g).map(num => parseInt(num, 10));
	let match = -1;
	playerNums.forEach(playerNum => {
		winNums.forEach(winNum => {
			if (winNum === playerNum) {
				match++;
			}
		});
	});
	if (match >= 0) {
		sum += Math.pow(2, match);
	}
});

console.log(sum);