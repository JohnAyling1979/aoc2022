const fs = require('fs');
const commands = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

const drawCrt = () => {
	cycles++;
	console.log(crtPos, spritePos, line);
	if (crtPos % 40 === spritePos - 1 || crtPos % 40 === spritePos || crtPos % 40 === spritePos + 1) {
		screen[line].push('#');
	} else {
		screen[line].push('.');
	}

	if (cycles % 40 === 0) {
		line++;
	}
	crtPos++;
}

let cycles = 0;
let spritePos = 1;
let crtPos = 0;
let line = 0;
const screen = [
	[],
	[],
	[],
	[],
	[],
	[]
]

for (let i = 0; i < commands.length + 2; i++) {
	let action, value;

	if (commands?.[i]) {
		[action, value] = commands[i].split(' ');
	}

	switch (action) {
		case 'addx':
			drawCrt();
			drawCrt();
			spritePos += +value;
			break;
		case 'noop':
			drawCrt();
	}
}

screen.forEach(line => {
	console.log(line.join(''));
})