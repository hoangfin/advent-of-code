const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'test.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

module.exports = { input };