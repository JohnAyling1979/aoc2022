const fs = require('fs');
const data = fs.readFileSync('sample.txt', 'utf8').split(/\r?\n/);

const stacks = [
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


console.log(stacks);
