const fs = require('fs');
const steps = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

const log = () => {
	for (let y = -4; y <= 0; y++) {
		const line = [];
		for (let x = 0; x < 6; x++) {
			if (head.x === x && head.y === y) {
				line.push('H');
			} else if (tail.x === x && tail.y === y) {
				line.push('T');
			} else if (x === 0 && y === 0) {
				line.push('S');
			} else {
				line.push('.');
			}
		}
		console.log(line.join(''));
	}
	console.log();
}

const head = {
	x: 0,
	y: 0,
}

const tail = {
	x: 0,
	y: 0,
}

const isAdjacent = () => {
	if (head.x === tail.x - 1 && head.y === tail.y - 1) {
		return true;
	}

	if (head.x === tail.x && head.y === tail.y - 1) {
		return true;
	}

	if (head.x === tail.x + 1 && head.y === tail.y - 1) {
		return true;
	}

	if (head.x === tail.x - 1 && head.y === tail.y) {
		return true;
	}

	if (head.x === tail.x && head.y === tail.y) {
		return true;
	}

	if (head.x === tail.x + 1 && head.y === tail.y) {
		return true;
	}

	if (head.x === tail.x - 1 && head.y === tail.y + 1) {
		return true;
	}

	if (head.x === tail.x && head.y === tail.y + 1) {
		return true;
	}

	if (head.x === tail.x + 1 && head.y === tail.y + 1) {
		return true;
	}

	return false;
}

const moveHeadRight = spaces => {
	for (let i = 0; i < spaces; i++) {
		head.x++;

		if (!isAdjacent()) {
			if (head.y !== tail.y) {
				if (head.y > tail.y) {
					tail.y++;
				} else {
					tail.y--;
				}
			}
			tail.x++;

			if (!visited.find(location => location.x === tail.x && location.y === tail.y)) {
				visited.push({...tail});
			}
		}
	}
}

const moveHeadUp = spaces => {
	for (let i = 0; i < spaces; i++) {
		head.y--;

		if (!isAdjacent()) {
			if (head.x !== tail.x) {
				if (head.x > tail.x) {
					tail.x++;
				} else {
					tail.x--;
				}
			}
			tail.y--;

			if (!visited.find(location => location.x === tail.x && location.y === tail.y)) {
				visited.push({...tail});
			}
		}
	}
}

const moveHeadLeft = spaces => {
	for (let i = 0; i < spaces; i++) {
		head.x--;

		if (!isAdjacent()) {
			if (head.y !== tail.y) {
				if (head.y > tail.y) {
					tail.y++;
				} else {
					tail.y--;
				}
			}
			tail.x--;

			if (!visited.find(location => location.x === tail.x && location.y === tail.y)) {
				visited.push({...tail});
			}
		}
	}
}

const moveHeadDown = spaces => {
	for (let i = 0; i < spaces; i++) {
		head.y++;

		if (!isAdjacent()) {
			if (head.x !== tail.x) {
				if (head.x > tail.x) {
					tail.x++;
				} else {
					tail.x--;
				}
			}
			tail.y++;

			if (!visited.find(location => location.x === tail.x && location.y === tail.y)) {
				visited.push({...tail});
			}
		}
	}
}

const visited = [{...tail}];

steps.forEach(step => {
	const [direction, spaces] = step.split(' ');

	switch (direction) {
		case 'U':
			moveHeadUp(+spaces);
		break;
		case 'D':
			moveHeadDown(+spaces);
		break;
		case 'L':
			moveHeadLeft(+spaces);
		break;
		case 'R':
			moveHeadRight(+spaces);
		break;
	}
});

console.log(visited.length);