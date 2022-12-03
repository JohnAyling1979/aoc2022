const fs = require('fs');
const data = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

const rock = 1;
const paper = 2;
const scissor = 3;

const win = 6;
const draw = 3;
const loss = 0;

const scoreMap = {
	A: {
		X: loss + scissor,
		Y: draw + rock,
		Z: win + paper,
	},
	B: {
		X: loss + rock,
		Y: draw + paper,
		Z: win + scissor,
	},
	C: {
		X: loss + paper,
		Y: draw + scissor,
		Z: win + rock,
	},
}

const sum = data.reduce((total, round) => {
	const [elf, you] = round.split(' ');

	return total + scoreMap[elf][you];
}, 0);

console.log(sum);
