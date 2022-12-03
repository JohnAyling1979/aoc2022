const fs = require('fs');
const data = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const prorityList = letters.reduce((list, letter, index) => {
	list[letter] = index + 1;
	list[letter.toUpperCase()] = index + 27;

	return list;
}, {});

const sum = data.reduce((sum, rucksack) => {
	const compartment1 = rucksack.substring(0, rucksack.length / 2);
	const compartment2 = rucksack.substring(rucksack.length / 2);
	const foundItems = [];

	compartment1.split('').forEach(item1 => {
		compartment2.split('').forEach(item2 => {
			if (item1 === item2 && !foundItems.includes(item1)) {
				sum += prorityList[item1];
				foundItems.push(item1);
			}
		})
	});

	return sum;
}, 0);

console.log(sum)