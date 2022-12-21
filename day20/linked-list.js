class ListNode {
	constructor(value, index) {
		this.value = value;
		this.originalIndex = index;
		this.prev = null;
		this.next = null;
	}
}

class LinkedList {
	constructor(head) {
		this.head = head;
		this.head.prev = this.head;
		this.head.next = this.head;

		this.count = 1;
	}

	size() {
		return this.count;
	}

	add(newNode) {
		let node = this.head;

		for (let i = 0; i < this.count - 1; i++) {
			node = node.next;
		}

		newNode.prev = node;
		newNode.next = this.head;

		node.next = newNode;
		this.head.prev = newNode;
		this.count++;
	}

	moveByValue(originalIndex) {
		let node = this.head;
		let isHead = true;

		while (true) {
			if (node.originalIndex === originalIndex) {
				break;
			}

			node = node.next;
			isHead = false
		}

		const move = node.value % (this.count - 1);

		if (move === 0) {
			// console.log('0 does not move:');
			return;
		}

		node.prev.next = node.next;
		node.next.prev = node.prev;

		if (isHead) {
			this.head = node.next;
		}

		let beforeNode = null;
		let afterNode = null;

		if (move > 0) {
			beforeNode = node.next;

			for (let i = 0; i < move - 1; i++) {
				beforeNode = beforeNode.next;
			}

			afterNode = beforeNode.next;
		} else {
			afterNode = node.prev;

			for (let i = 0; i < (move * -1) - 1; i++) {
				afterNode = afterNode.prev;
			}

			beforeNode = afterNode.prev;
		}

		node.next = afterNode;
		node.prev = beforeNode;

		beforeNode.next = node;
		afterNode.prev = node

		// console.log(`${node.value} moves between ${beforeNode.value} and ${afterNode.value}`);
	}

	print() {
		const values = [];
		let node = this.head;

		for (let i = 0; i < this.count; i++) {
			values.push(node.value);

			node = node.next;
		}

		console.log(values.join(', '));
	}

	calculateCoordinates() {
		let index = 0;
		let score = 0;
		let node = this.head;
		let foundZero = this.head.value === 0;

		while (true) {
			if (index === 1000 || index === 2000 || index === 3000) {
				score += node.value;

				if (index === 3000) {
					break;
				}
			}

			if (foundZero) {
				index++
			}

			node = node.next;
			if (node.value === 0) {
				foundZero = true;
			}
		}

		return score;
	}

	getHead() {
		return this.head;
	}
}

module.exports = {
	LinkedList,
	ListNode
};
