const fs = require('fs');
const commands = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

let cycles = 0;
let x = 1;
let total = 0;
const checkCycles = [20, 60, 100, 140, 180, 220];

for (let i = 0; i < commands.length + 2; i++) {
	let action, value;

	if (commands?.[i]) {
		[action, value] = commands[i].split(' ');
	}

	switch (action) {
		case 'addx':
			cycles++;
			if (checkCycles.includes(cycles)) {
				console.log(cycles, cycles * x);
				total += cycles * x;
			}
			cycles++;
			if (checkCycles.includes(cycles)) {
				console.log(cycles, cycles * x);
				total += cycles * x;
			}
			x += +value;
			break;
		case 'noop':
			cycles++
			if (checkCycles.includes(cycles)) {
				console.log(cycles, cycles * x);
				total += cycles * x;
			}
	}
}

console.log(`Total: ${total}`);