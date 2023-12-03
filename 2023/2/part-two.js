const { input } = require("./input");

let gameId = 0;
let sumSets = 0;

const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

input.forEach(line => {
	gameId++;
	const redCubes = line.match(/\d+ red/g).map(e => e.replace(/\D/g, ''));
	const greenCubes = line.match(/\d+ green/g).map(e => e.replace(/\D/g, ''));
	const blueCubes = line.match(/\d+ blue/g).map(e => e.replace(/\D/g, ''));

	let maxRed = 0;
	let maxGreen = 0;
	let maxBlue = 0;
	redCubes.forEach(r => {
		if (parseInt(r) > maxRed) {
			maxRed = parseInt(r);
		}
	});
	greenCubes.forEach(g => {
		if (parseInt(g) > maxGreen) {
			maxGreen = parseInt(g);
		}
	});
	blueCubes.forEach(b => {
		if (parseInt(b) > maxBlue) {
			maxBlue = parseInt(b);
		}
	});
	console.log(`gameId ${gameId}: red(${maxRed}), green(${maxGreen}), blue(${maxBlue})`);
	sumSets += maxRed * maxGreen * maxBlue;
});

console.log(sumSets);