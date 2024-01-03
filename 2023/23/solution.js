const { input: lines } = require("./input");
// const { partOne, partTwo } = require("./backtrack");
const { partOne, partTwo } = require("./dfs");

const graph = Array.from(lines, line => line.split(""));
// const maxSteps = partOne(graph, 0, 1, graph.length - 1, graph.at(-1).length - 2);
// console.log(maxSteps);
const maxSteps = partTwo(graph, 0, 1, graph.length - 1, graph.at(-1).length - 2);
console.log(maxSteps);