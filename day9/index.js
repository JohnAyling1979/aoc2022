const fs = require('fs');

function part1(dataFile) {
	const steps = fs.readFileSync(`${__dirname}/${dataFile}`, 'utf8').split(/\r?\n/);

	const head = {
		x: 0,
		y: 0,
	}

	const tail = {
		x: 0,
		y: 0,
	}

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

	const moveHeadRight = () => {
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
		}
	}

	const moveHeadUp = () => {
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
		}
	}

	const moveHeadLeft = () => {
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
		}
	}

	const moveHeadDown = () => {
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
		}
	}

	const visited = [{ ...tail }];

	steps.forEach(step => {
		const [direction, spaces] = step.split(' ');

		for (let i = 0; i < +spaces; i++) {
			switch (direction) {
				case 'U':
					moveHeadUp();
					break;
				case 'D':
					moveHeadDown();
					break;
				case 'L':
					moveHeadLeft();
					break;
				case 'R':
					moveHeadRight();
					break;
			}

			if (!visited.find(location => location.x === tail.x && location.y === tail.y)) {
				visited.push({ ...tail });
			}
		}
	});

	return visited.length;
}

function part2(dataFile) {
	const fs = require('fs');
	const steps = fs.readFileSync(`${__dirname}/${dataFile}`, 'utf8').split(/\r?\n/);

	const log = () => {
		for (let y = -15; y <= 5; y++) {
			const line = [];
			for (let x = -11; x < 15; x++) {
				let charater = '.';

				if (x === 0 && y === 0) {
					charater = 'S';
				}

				for (let i = knots.length - 1; i >= 0; i--) {
					if (knots[i].x === x && knots[i].y === y) {
						if (i === 0) {
							charater = 'H';
						} else {
							charater = i;
						}
					}
				}
				line.push(charater);
			}
			console.log(line.join(''));
		}
		console.log();
	}

	const knots = [
		{ // 1
			x: 0,
			y: 0,
		},
		{ // 2
			x: 0,
			y: 0,
		},
		{ // 3
			x: 0,
			y: 0,
		},
		{ // 4
			x: 0,
			y: 0,
		},
		{ // 5
			x: 0,
			y: 0,
		},
		{ // 6
			x: 0,
			y: 0,
		},
		{ // 7
			x: 0,
			y: 0,
		},
		{ // 8
			x: 0,
			y: 0,
		},
		{ // 9
			x: 0,
			y: 0,
		},
		{ // 10
			x: 0,
			y: 0,
		},
	];

	const tailIndex = knots.length - 1;

	const whereNext = (head, tail) => {
		if (head.x > tail.x) {
			return 'R';
		}

		if (head.x < tail.x) {
			return 'L';
		}

		if (head.y < tail.y) {
			return 'U';
		}

		if (head.y > tail.y) {
			return 'D';
		}

		console.log(knots);
		throw new Error('Where did it go?');
	}

	const isAdjacent = (head, tail) => {
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

	const moveRight = knotIndex => {
		if (knotIndex === 0) {
			knots[knotIndex].x++;
		} else {
			if (knots[knotIndex - 1].y !== knots[knotIndex].y) {
				if (knots[knotIndex - 1].y > knots[knotIndex].y) {
					knots[knotIndex].y++;
				} else {
					knots[knotIndex].y--;
				}
			}
			knots[knotIndex].x++;
		}

		if (knotIndex === tailIndex) {
			return
		}

		if (!isAdjacent(knots[knotIndex], knots[knotIndex + 1])) {
			const direction = whereNext(knots[knotIndex], knots[knotIndex + 1]);

			switch (direction) {
				case 'U':
					moveUp(knotIndex + 1);
					break;
				case 'D':
					moveDown(knotIndex + 1);
					break;
				case 'L':
					moveLeft(knotIndex + 1);
					break;
				case 'R':
					moveRight(knotIndex + 1);
					break;
			}
		}
	}

	const moveLeft = knotIndex => {
		if (knotIndex === 0) {
			knots[knotIndex].x--;
		} else {
			if (knots[knotIndex - 1].y !== knots[knotIndex].y) {
				if (knots[knotIndex - 1].y > knots[knotIndex].y) {
					knots[knotIndex].y++;
				} else {
					knots[knotIndex].y--;
				}
			}
			knots[knotIndex].x--;
		}

		if (knotIndex === tailIndex) {
			return
		}

		if (!isAdjacent(knots[knotIndex], knots[knotIndex + 1])) {
			const direction = whereNext(knots[knotIndex], knots[knotIndex + 1]);

			switch (direction) {
				case 'U':
					moveUp(knotIndex + 1);
					break;
				case 'D':
					moveDown(knotIndex + 1);
					break;
				case 'L':
					moveLeft(knotIndex + 1);
					break;
				case 'R':
					moveRight(knotIndex + 1);
					break;
			}
		}
	}

	const moveUp = knotIndex => {
		if (knotIndex === 0) {
			knots[knotIndex].y--;
		} else {
			if (knots[knotIndex - 1].x !== knots[knotIndex].x) {
				if (knots[knotIndex - 1].x > knots[knotIndex].x) {
					knots[knotIndex].x++;
				} else {
					knots[knotIndex].x--;
				}
			}
			knots[knotIndex].y--;
		}

		if (knotIndex === tailIndex) {
			return
		}

		if (!isAdjacent(knots[knotIndex], knots[knotIndex + 1])) {
			const direction = whereNext(knots[knotIndex], knots[knotIndex + 1]);

			switch (direction) {
				case 'U':
					moveUp(knotIndex + 1);
					break;
				case 'D':
					moveDown(knotIndex + 1);
					break;
				case 'L':
					moveLeft(knotIndex + 1);
					break;
				case 'R':
					moveRight(knotIndex + 1);
					break;
			}
		}
	}

	const moveDown = knotIndex => {
		if (knotIndex === 0) {
			knots[knotIndex].y++;
		} else {
			if (knots[knotIndex - 1].x !== knots[knotIndex].x) {
				if (knots[knotIndex - 1].x > knots[knotIndex].x) {
					knots[knotIndex].x++;
				} else {
					knots[knotIndex].x--;
				}
			}
			knots[knotIndex].y++;
		}

		if (knotIndex === tailIndex) {
			return
		}

		if (!isAdjacent(knots[knotIndex], knots[knotIndex + 1])) {
			const direction = whereNext(knots[knotIndex], knots[knotIndex + 1]);

			switch (direction) {
				case 'U':
					moveUp(knotIndex + 1);
					break;
				case 'D':
					moveDown(knotIndex + 1);
					break;
				case 'L':
					moveLeft(knotIndex + 1);
					break;
				case 'R':
					moveRight(knotIndex + 1);
					break;
			}
		}
	}

	const visited = [{ ...knots[0] }];

	steps.forEach(step => {
		const [direction, spaces] = step.split(' ');

		for (let i = 0; i < +spaces; i++) {
			switch (direction) {
				case 'U':
					moveUp(0);
					break;
				case 'D':
					moveDown(0);
					break;
				case 'L':
					moveLeft(0);
					break;
				case 'R':
					moveRight(0);
					break;
			}

			if (!visited.find(location => location.x === knots[tailIndex].x && location.y === knots[tailIndex].y)) {
				visited.push({ ...knots[tailIndex] });
			}
		}
	});

	return visited.length;
}

console.log(part1('data.txt'));
console.log(part2('data.txt'));

module.exports = {
	part1,
	part2
}
