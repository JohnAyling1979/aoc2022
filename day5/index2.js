const fs = require('fs');
const data = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

const stacks = [
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
];

const stackIndexs = [
	{
		index: 0,
		lineIndex: 1
	},
	{
		index: 1,
		lineIndex: 5
	},
	{
		index: 2,
		lineIndex: 9
	},
	{
		index: 3,
		lineIndex: 13
	},
	{
		index: 4,
		lineIndex: 17
	},
	{
		index: 5,
		lineIndex: 21
	},
	{
		index: 6,
		lineIndex: 25
	},
	{
		index: 7,
		lineIndex: 29
	},
	{
		index: 8,
		lineIndex: 33
	},
];

let index = 0;

for(; index < data.length; index++) {
	const line = data[index];

	if (line === '') {
		break;
	}

	stackIndexs.forEach(stackIndex => {
		const crate = line.charAt(stackIndex.lineIndex);

		if (crate && crate !== ' ' && isNaN(crate)) {
			stacks[stackIndex.index].push(crate)
		}
	});
}

stackIndexs.forEach(stackIndex => {
	stacks[stackIndex.index].reverse();
});

index++;

for(; index < data.length; index++) {
	const [, qty, , from, , to] = data[index].split(' ');
    const moveStack = [];

	for (let i = 0; i < qty; i++) {
		const crate = stacks[from - 1].pop();
		moveStack.push(crate);
	}

    stacks[to - 1] = stacks[to - 1].concat(moveStack.reverse());
}

console.log(stacks.map(stack => stack[stack.length - 1]).join(''));

