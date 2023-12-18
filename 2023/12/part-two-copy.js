const { input: lines } = require("./input");

const sum = (a, b) => a + b;

const cache = new Map();
const _countWays = (row, ns) => {
	console.log(row)
    row = row.replace(/^\.+|\.+$/, '');
	console.log("replaced = ", row);
    if (row === '') return ns.length ? 0 : 1;
    if (!ns.length) return row.includes('#') ? 0 : 1;
    const key = [row, ns].join(' ');
	// console.log(row, "|", key);
    if (cache.has(key)) return cache.get(key);

    let result = 0;
    const damaged = row.match(/^#+(?=\.|$)/);
	// console.log(damaged);
    if (damaged) {
        if (damaged[0].length === ns[0]) {
            result += _countWays(row.slice(ns[0]), ns.slice(1));
        }
    } else if (row.includes('?')) {
        const total = ns.reduce(sum);
        result += _countWays(row.replace('?', '.'), ns);
        if ((row.match(/#/g) || []).length < total) {
            result += _countWays(row.replace('?', '#'), ns);
        }
    }
    // cache.set(key, result, damaged);
    return result;
};

const countWays = (s) => {
    const [row, ns] = s.split(' ');
    return _countWays(row, ns.split(',').map(Number));
};

const unfold = (s) => {
    const [row, records] = s.split(' ');
    return [
        [...Array(5)].fill(row).join('?'),
        [...Array(5)].fill(records).join(',')
    ].join(' ');
};

let t = performance.now();
console.log(
    'A',
    lines.map(countWays).reduce(sum),
    `took ${performance.now() - t}ms`
);
// t = performance.now();
// console.log(
//     'B',
//     lines.map(unfold).map(countWays).reduce(sum),
//     `took ${performance.now() - t}ms`
// );