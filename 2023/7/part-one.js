const { input: lines } = require("./input");

const STRENGTH = "AKQJT98765432";

const compareHands = (one, two) => {
	let hand1Idx;
	let hand2Idx;
	let diff = 0;

	for (let i = 0; i < one.hand.length; i++) {
		hand1Idx = STRENGTH.indexOf(one.hand[i]);
		hand2Idx = STRENGTH.indexOf(two.hand[i]);
		diff = hand2Idx - hand1Idx;
		if (diff !== 0) {
			break;
		}
	}
	return diff;
}

const isFiveOfKind = hand => {
	const regex = new RegExp(`^([${STRENGTH}])\\1{4}$`, "g");
	if (regex.test(hand)) {
		return true;
	}
	return false;
};

const isFourOfKind = hand => {
	const counters = new Array(STRENGTH.length);
	counters.fill(0);
	for (let i = 0; i < hand.length; i++) {
		const foundIndex = STRENGTH.indexOf(hand[i]);
		if (foundIndex !== -1) {
			counters[foundIndex] = counters[foundIndex] + 1;
		}
	}
	if (Math.max(...counters) === 4) {
		return true;
	}
	return false;
};

const isFullhouse = hand => {
	const counters = new Array(STRENGTH.length);
	counters.fill(0);
	for (let i = 0; i < hand.length; i++) {
		const foundIndex = STRENGTH.indexOf(hand[i]);
		if (foundIndex !== -1) {
			counters[foundIndex] = counters[foundIndex] + 1;
		}
	}
	if (counters.find(v => v === 3) && counters.find(v => v === 2)) {
		return true;
	}
	return false;
};

const isThreeOfKind = hand => {
	const counters = new Array(STRENGTH.length);
	counters.fill(0);
	for (let i = 0; i < hand.length; i++) {
		const foundIndex = STRENGTH.indexOf(hand[i]);
		if (foundIndex !== -1) {
			counters[foundIndex] = counters[foundIndex] + 1;
		}
	}
	if (counters.find(v => v === 3) && !counters.find(v => v === 2)) {
		return true;
	}
	return false;
};


const isTwoPair = hand => {
	const counters = new Array(STRENGTH.length);
	counters.fill(0);
	for (let i = 0; i < hand.length; i++) {
		const foundIndex = STRENGTH.indexOf(hand[i]);
		if (foundIndex !== -1) {
			counters[foundIndex] = counters[foundIndex] + 1;
		}
	}
	const firstIdx = counters.indexOf(2);
	const lastIdx = counters.lastIndexOf(2);
	if (firstIdx !== -1 && lastIdx !== -1 && firstIdx !== lastIdx) {
		return true;
	}
	return false;
};

const isOnePair = hand => {
	const counters = new Array(STRENGTH.length);
	counters.fill(0);
	for (let i = 0; i < hand.length; i++) {
		const foundIndex = STRENGTH.indexOf(hand[i]);
		if (foundIndex !== -1) {
			counters[foundIndex] = counters[foundIndex] + 1;
		}
	}
	if (Math.max(...counters) === 2) {
		return true;
	}
	return false;
};

const getTotalWins = hands => {
	hands.forEach(({ bid }) => {
		currentRank++;
		totalWins += bid * currentRank;
	});
}

const fiveOfKindHands = [];
const fourOfKindHands = [];
const threeOfKindHands = [];
const fullhouseHands = [];
const twoPairHands = [];
const onePairHands = [];
const highCardHands = [];
let currentRank = 0;
let totalWins = 0;

lines.forEach(line => {
	const [hand, bid] = line.split(" ");
	if (isFiveOfKind(hand)) {
		fiveOfKindHands.push({ hand, bid });
	} else if (isFourOfKind(hand)) {
		fourOfKindHands.push({ hand, bid });
	} else if (isThreeOfKind(hand)) {
		threeOfKindHands.push({ hand, bid });
	} else if (isFullhouse(hand)) {
		fullhouseHands.push({ hand, bid });
	} else if (isTwoPair(hand)) {
		twoPairHands.push({ hand, bid });
	} else if (isOnePair(hand)) {
		onePairHands.push({ hand, bid });
	} else {
		highCardHands.push({ hand, bid });
	}
});

fiveOfKindHands.sort(compareHands);
fourOfKindHands.sort(compareHands);
fullhouseHands.sort(compareHands);
threeOfKindHands.sort(compareHands);
twoPairHands.sort(compareHands);
onePairHands.sort(compareHands);
highCardHands.sort(compareHands);

getTotalWins(highCardHands);
getTotalWins(onePairHands);
getTotalWins(twoPairHands);
getTotalWins(threeOfKindHands);
getTotalWins(fullhouseHands);
getTotalWins(fourOfKindHands);
getTotalWins(fiveOfKindHands);

console.log("Total wins = " + totalWins);
