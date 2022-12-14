const fs = require('fs');
const packets = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/).filter(line => line !== '').map(line => JSON.parse(line));

packets.push([[2]]);
packets.push([[6]]);

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

packets.sort((one, two) => {
    if (compair(one, two)) {
        return -1;
    }

    return 1;
});

const packetsString = packets.map(line => JSON.stringify(line));

const code1 = packetsString.indexOf('[[2]]') + 1;
const code2 = packetsString.indexOf('[[6]]') + 1;

console.log(code1 * code2);