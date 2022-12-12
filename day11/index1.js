const fs = require('fs');
const input = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

const monkeys = [];
currentMonkeyIndex = null;
const targetRound = 20;

input.forEach(line => {
	if (line.startsWith('Monkey')) {
		const [,index] = line.split(' ');
		currentMonkeyIndex = +index.replace(':', '');

		monkeys.push({
			index: currentMonkeyIndex,
			items: [],
			itemsInspected: 0,
			operation: null,
			test: null,
			true: null,
			false: null,
		});

	} else if (line.startsWith('  Starting items:')) {
		const numbers = line.replace('  Starting items:', '');

		numbers.split(',').forEach(section => {
			monkeys[currentMonkeyIndex].items.push(+section);
		});
	} else if (line.startsWith('  Operation:')) {
		const [, operation] = line.split(': ');
		const [, equation] = operation.split(' = ');

		monkeys[currentMonkeyIndex].operation = function (old) {
			return Function(`return ${equation.replaceAll('old', old)}`)();
		} ;
	} else if (line.startsWith('  Test:')) {
		const [,divisor] = line.split(' by ');

		monkeys[currentMonkeyIndex].test = +divisor;
	} else if (line.startsWith('    If true:')) {
		const [,target] = line.split('monkey ');

		monkeys[currentMonkeyIndex].true = +target;
	} else if (line.startsWith('    If false:')) {
		const [,target] = line.split('monkey ');

		monkeys[currentMonkeyIndex].false = +target;
	}
})

for (let round = 1; round <= targetRound; round++) {
	monkeys.forEach(monkey => {
		monkey.items.forEach((item, itemIndex) => {
			let worryLevel = monkey.operation(item);
			worryLevel = Math.floor(worryLevel / 3);

			if (worryLevel % monkey.test === 0) {
				monkeys[monkey.true].items.push(worryLevel);
			} else {
				monkeys[monkey.false].items.push(worryLevel);
			}

			monkey.itemsInspected++;
		})

		monkey.items = [];
	})
}

console.log(`== After round ${targetRound} ==`);
monkeys.forEach(monkey => {
	console.log(`Monkey ${monkey.index} inspected items ${monkey.itemsInspected} times.`)
})

monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);

console.log(monkeys[0].itemsInspected * monkeys[1].itemsInspected);
