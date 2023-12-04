const { input: lines } = require("./input");

let scratchCards = 0;

const countScratchCards = (card, cardIndex) => {
	if (!card || cardIndex > cards.length - 1) return;
	let match = 0;
	scratchCards++;
	const [winNums, playerNums] = card;
	playerNums.forEach(playerNum => {
		winNums.forEach(winNum => {
			if (winNum === playerNum) {
				match++;
			}
		})
	});
	if (match > 0) {
		for (let i = 1; i <= match; i++) {
			countScratchCards(cards[cardIndex + i], cardIndex + i);
		}
	}
};

const cards = lines.map(line => {
	const [, nums] = line.split(":");
	let [winNums, playerNums] = nums.split("|");
	winNums = winNums.match(/\d+/g).map(num => parseInt(num, 10));
	playerNums = playerNums.match(/\d+/g).map(num => parseInt(num, 10));
	return [winNums, playerNums];
});

for (let i = 0; i < cards.length; i++) {
	countScratchCards(cards[i], i);
}

console.log(scratchCards);
