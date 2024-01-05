const { input: lines } = require("./input");
// const { partOne, partTwo } = require("./backtracking");
const { partOne, partTwo } = require("./dijkstra");

const graph = Array.from(lines, line => line.split(""));
const leastHeatLoss1 = partOne(graph, 0, 0, graph.length - 1, graph[0].length - 1);
console.log(leastHeatLoss1);
// const leastHeatLoss2 = partTwo(graph, 0, 0, graph.length - 1, graph[0].length - 1);
// console.log(leastHeatLoss2);
