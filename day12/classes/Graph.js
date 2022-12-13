const PriorityQueue = require('./PriorityQueue');

class Graph {
	constructor() {
		this.nodes = [];
		this.adjacencyList = {};

		this.lowest = Infinity;
	}

	addNode(node) {
		this.nodes.push(node);
		this.adjacencyList[node] = [];
	}

	addEdge(node1, node2, weight) {
		this.adjacencyList[node1].push({ node: node2, weight });
	}

	findPathWithDijkstra(startNode, endNode) {
		let times = {};
		let backtrace = {};
		let pq = new PriorityQueue();

		times[startNode] = 0;

		this.nodes.forEach(node => {
			if (node !== startNode) {
				times[node] = Infinity
			}
		});

		pq.enqueue([startNode, 0]);

		while (!pq.isEmpty()) {
			let shortestStep = pq.dequeue();
			let currentNode = shortestStep[0];

			this.adjacencyList[currentNode].forEach(neighbor => {
				let time = times[currentNode] + neighbor.weight;

				if (time < times[neighbor.node]) {
					times[neighbor.node] = time;
					backtrace[neighbor.node] = currentNode;
					pq.enqueue([neighbor.node, time]);
				}
			});
		}

		let path = [];
		let lastStep = endNode;
		let count = 0;

		while (lastStep !== startNode) {
			if (count++ > this.lowest) {
				break;
			}

			path.unshift(backtrace[lastStep])
			lastStep = backtrace[lastStep]
		}

		this.lowest = path.length;

		return path;
	}
};

module.exports = Graph;
