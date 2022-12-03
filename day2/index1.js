const fs = require('fs');
const data = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

const rock = 1;
const paper = 2;
const scissor = 3;

const win = 6;
const draw = 3;
const loss = 0;

const scoreMap = {
	X: {
		A: rock + draw,
		B: rock + loss,
		C: rock + win,
	},
	Y: {
		A: paper + win,
		B: paper + draw,
		C: paper + loss,
	},
	Z: {
		A: scissor + loss,
		B: scissor + win,
		C: scissor + draw,
	},
}

const sum = data.reduce((total, round) => {
	const [elf, you] = round.split(' ');

	return total + scoreMap[you][elf];
}, 0);

console.log(sum);
