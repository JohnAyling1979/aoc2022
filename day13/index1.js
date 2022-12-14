const fs = require('fs');
const packets = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

const compair = (leftNumber, rightNumber) => {
	if (leftNumber === undefined) {
		console.log('- Left side ran out of items, so inputs are in the right order');
		return true;
	}

	if (rightNumber === undefined) {
		console.log('- Right side ran out of items, so inputs are not in the right order');
		return false;
	}
	console.log(`- Compare ${JSON.stringify(leftNumber)} vs ${JSON.stringify(rightNumber)}`);

	if (Number.isInteger(leftNumber) && Number.isInteger(rightNumber)) {
		if (leftNumber > rightNumber) {
			console.log('- Right side is smaller, so inputs are not in the right order');
			return false;
		}
	
		if (leftNumber < rightNumber) {
			console.log('- Left side is smaller, so inputs are in the right order')
			return true;
		}	
	} else {
		if (!Array.isArray(leftNumber)) {
			console.log(`- Mixed types; convert left to [${leftNumber}] and retry comparison`)
			leftNumber = [leftNumber];
		}

		if (!Array.isArray(rightNumber)) {
			console.log(`- Mixed types; convert rigtht to [${rightNumber}] and retry comparison`)
			rightNumber = [rightNumber];
		}

		let sections = leftNumber.length;

		if (sections < rightNumber.length) {
			sections = rightNumber.length;
		}

		for (let itemIndex = 0; itemIndex < sections; itemIndex++) {
			const leftItem = leftNumber[itemIndex];
			const rightItem = rightNumber[itemIndex];

			const add = compair(leftItem, rightItem);

			if (add !== null) {
				return add;
			}
		}
	}

	return null;
}

const packetPairs = [];

let newPair = null;

packets.forEach(packet => {
	if (packet !== '') {
		if (!newPair) {
			newPair = {
				left: packet,
				right: null,
			}
		} else {
			newPair.right = packet;

			packetPairs.push(newPair);
			newPair = null;
		}
	}
});

const correctOrderIndexBaseOne = [];

packetPairs.forEach((pair, index) => {
	let add = null;
	console.log(`== Pair ${index + 1} ==`);
	console.log(`- Compare ${pair.left} vs ${pair.right}`)
	const leftPair = JSON.parse(pair.left);
	const rightPair = JSON.parse(pair.right);

	let sections = leftPair.length;

	if (sections < rightPair.length) {
		sections = rightPair.length;
	}

	for (let itemIndex = 0; itemIndex < sections; itemIndex++) {
		const leftItem = leftPair[itemIndex];
		const rightItem = rightPair[itemIndex];

		add = compair(leftItem, rightItem);
		if (add !== null) {
			break;
		}
	}

	if (add) {
		correctOrderIndexBaseOne.push(index + 1);
	}

	console.log();
});

console.log(correctOrderIndexBaseOne.reduce((total, current) => total + current, 0));
