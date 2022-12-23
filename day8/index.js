const fs = require('fs');

function part1(dataFile) {
	const map = fs.readFileSync(`${__dirname}/${dataFile}`, 'utf8').split(/\r?\n/).map(line => line.split('').map(letter => +letter));

	const checkUp = (current, x, y) => {
		let isVisible = true;

		for (let i = y - 1; i >= 0; i--) {
			if (map[i][x] >= current) {
				isVisible = false;
			}
		}

		return isVisible;
	}

	const checkDown = (current, x, y) => {
		let isVisible = true;

		for (let i = y + 1; i < map.length; i++) {
			if (map[i][x] >= current) {
				isVisible = false;
			}
		}

		return isVisible;
	}

	const checkLeft = (current, x, y) => {
		let isVisible = true;

		for (let i = x - 1; i >= 0; i--) {
			if (map[y][i] >= current) {
				isVisible = false;
			}
		}

		return isVisible;
	}

	const checkRight = (current, x, y) => {
		let isVisible = true;

		for (let i = x + 1; i < map[y].length; i++) {
			if (map[y][i] >= current) {
				isVisible = false;
			}
		}

		return isVisible;
	}

	let total = map.length * 2 + map[0].length * 2 - 4; // outside edge

	for (let y = 1; y < map.length - 1; y++) {
		for (let x = 1; x < map[y].length -1; x++) {
			const current = map[y][x];
			let isVisible = checkUp(current, x, y);
			isVisible = checkDown(current, x, y) || isVisible;
			isVisible = checkRight(current, x, y) || isVisible;
			isVisible = checkLeft(current, x, y) || isVisible;

			if (isVisible) {
				total++;
			}
		}
	}

	return total;
}

function part2(dataFile) {
	const map = fs.readFileSync(`${__dirname}/${dataFile}`, 'utf8').split(/\r?\n/).map(line => line.split('').map(letter => +letter));
	let bestScore = 0;

	const checkUp = (current, x, y) => {
		let score = 0;

		for (let i = y - 1; i >= 0; i--) {
			score = y - i;
			if (map[i][x] >= current) {
				break;
			}
		}

		return score;
	}

	const checkDown = (current, x, y) => {
		let score = 0;

		for (let i = y + 1; i < map.length; i++) {
			score = i - y;
			if (map[i][x] >= current) {
				break;
			}
		}

		return score;
	}

	const checkLeft = (current, x, y) => {
		let score = 0;

		for (let i = x - 1; i >= 0; i--) {
			score = x - i;
			if (map[y][i] >= current) {
				break;
			}
		}

		return score;
	}

	const checkRight = (current, x, y) => {
		let score = 0;

		for (let i = x + 1; i < map[y].length; i++) {
			score = i - x;
			if (map[y][i] >= current) {
				break;
			}
		}

		return score;
	}

	for (let y = 1; y < map.length - 1; y++) {
		for (let x = 1; x < map[y].length -1; x++) {
			const current = map[y][x];
			const upScore = checkUp(current, x, y);
			const downScore = checkDown(current, x, y);
			const rightScore = checkRight(current, x, y);
			const leftScore = checkLeft(current, x, y);

			const score = upScore * downScore * rightScore * leftScore;

			if (bestScore < score ) {
				bestScore = score;
			}
		}
	}

	return bestScore;
}




module.exports = {
	part1,
	part2
};