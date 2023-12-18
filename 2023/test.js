const results = [];

const isValidCombination = (results, solution, a, b) => {
	if (a === b) {
		return false;
	}
	for (let i = 0; i < results.length; i++) {
		if (results[i].every(c => [a, b].includes(c))) {
			return false;
		}
	}
	return true;
}

const combine = (results, solution, n, k) => {
	if (n == 5) {
		results.push(solution);
		return true;
	}
	for (let i = 1; i <= 4; i++) {
		if (isValidCombination(n, i, solution)) {
			solution.push(n, i);
			combine(results, solution, n + 1, k);
			solution.pop();
		}
	}
	return false;
};

combine(results, [], 1)