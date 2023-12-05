const { input: lines } = require("./input");

const initialize = (input) => {
	const destinations = [];
	const sources = [];
	const ranges = [];
	const [, ...mapLines] = input.split("\n");
	mapLines.forEach(mapLine => {
		const [dest, src, range] = mapLine.match(/\d+/g).map(num_str => parseInt(num_str));
		destinations.push(dest);
		sources.push(src);
		ranges.push(range);
	});
	return [destinations, sources, ranges];
};

const getValueBySourceKey = (key, map) => {
	const [destinations, sources, ranges] = map;
	for (let i = 0; i < sources.length; i++) {
		if (key >= sources[i] && (key < sources[i] + ranges[i])) {
			return destinations[i] + key - sources[i];
		}
	}
	return key;
}

let minLocation;
const seeds = lines[0]
				.match(/\d+/g)
				.map(num_str => parseInt(num_str))
				.reduce((acc, value, i, array) => {
					if (i % 2 == 0) {
						acc.push(array.slice(i, i + 2));
					}
					return acc;
				}, []);
const soilsBySeeds = initialize(lines[1]);
const fertilizerBySoils = initialize(lines[2]);
const waterByFertilizer = initialize(lines[3]);
const lightByWater = initialize(lines[4]);
const temperatureByLight = initialize(lines[5]);
const humidityByTemperature = initialize(lines[6]);
const locationByHumidity = initialize(lines[7]);

console.log(seeds);
seeds.forEach(seedElement => {
	const [seed, range] = seedElement;
	for (let i = 0; i < range; i++) {
		const soil = getValueBySourceKey(seed + i, soilsBySeeds);
		const fertilizer = getValueBySourceKey(soil, fertilizerBySoils);
		const water = getValueBySourceKey(fertilizer, waterByFertilizer);
		const light = getValueBySourceKey(water, lightByWater);
		const temperature = getValueBySourceKey(light, temperatureByLight);
		const huminity = getValueBySourceKey(temperature, humidityByTemperature);
		const location = getValueBySourceKey(huminity, locationByHumidity);
		if (minLocation === undefined)
			minLocation = location;
		if (minLocation > location) {
			minLocation = location;
		}
	}
});

console.log(minLocation);
