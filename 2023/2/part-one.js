const { input } = require("./input");

let gameId = 0;
let validGameIdsSum = 0;

const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

input.forEach(line => {
	gameId++;
	const redCubes = line.match(/\d+ red/g).map(e => e.replace(/\D/g, ''));
	for (let i = 0; i < redCubes.length; i++) {
		if (redCubes[i] > MAX_RED_CUBES) {
			return;
		}
	}
	const greenCubes = line.match(/\d+ green/g).map(e => e.replace(/\D/g, ''));
	for (let i = 0; i < greenCubes.length; i++) {
		if (greenCubes[i] > MAX_GREEN_CUBES) {
			return;
		}
	}
	const blueCubes = line.match(/\d+ blue/g).map(e => e.replace(/\D/g, ''));
	for (let i = 0; i < blueCubes.length; i++) {
		if (blueCubes[i] > MAX_BLUE_CUBES) {
			return;
		}
	}
	validGameIdsSum += gameId;
});

console.log(validGameIdsSum);