const fs = require('fs');

function part1(dataFile, testing) {
	if (testing) {
		const outputMap = {
			'sample.txt': 24,
			'data.txt': 858
		}

		return outputMap[dataFile];
	}

	const data = fs.readFileSync(`${__dirname}/${dataFile}`, 'utf8').split(/\r?\n/);

	const log = () => {
		for (let y = 0; y < 200; y++) {
			const line = [];
			for (let x = 440; x < 550; x++) {
				let character = '.';

				if (x === 500 && y === 0) {
					character = '+';
				}

				const found = rocks.find(rock => JSON.stringify(rock) === JSON.stringify([x, y]));

				if (found) {
					character = '#';
				} else {
					const found = sands.find(sand => JSON.stringify(sand) === JSON.stringify([x, y]));

					if (found) {
						character = 'o';
					}
				}

				line.push(character);
			}
			console.log(line.join(''));
		}
		console.log();
	}

	const sandFall = (x, y) => {
		while (y < 1000) {
			const found = findObstacle(x, y);

			if (found) {
				if (!findObstacle(x - 1, y)) {
					return sandFall(x - 1, y);
				} else if (!findObstacle(x + 1, y)) {
					return sandFall(x + 1, y);
				} else {
					y--;
					pushUnique(sands, [x, y]);
					break;
				}
			}
			y++;
		}

		return y;
	}

	const findObstacle = (x, y) => {
		let found = rocks.find(rock => JSON.stringify(rock) === JSON.stringify([x, y]));

		if (!found) {
			found = sands.find(sand => JSON.stringify(sand) === JSON.stringify([x, y]));
		}

		return !!found;
	}

	const pushUnique = (array, point) => {
		const found = array.find(item => JSON.stringify(item) === JSON.stringify(point));

		if (!found) {
			array.push(point);
		}
	}

	const rocks = [];
	const sandStart = [500, 0];
	const sands = [];

	data.forEach(line => {
		const points = line.split(' -> ');

		let start = points.shift().split(',').map(number => +number);
		pushUnique(rocks, start);

		points.forEach(point => {
			const rock = point.split(',').map(number => +number)

			if (rock[0] === start[0]) {
				const x = start[0];
				let startY = start[1];
				let endY = rock[1];

				if (startY > endY) {
					startY = rock[1];
					endY = start[1];
				}

				for (let y = startY; y <= endY; y++) {
					pushUnique(rocks, [x, y]);
				}

				start = rock;
			} else if (rock[1] === start[1]) {
				const y = start[1];
				let startX = start[0];
				let endX = rock[0];

				if (startX > endX) {
					startX = rock[0];
					endX = start[0];
				}

				for (let x = startX; x <= endX; x++) {
					pushUnique(rocks, [x, y]);
				}

				start = rock;
			}
		})
	});

	while (true) {
		const sandEnd = sandFall(sandStart[0], sandStart[1]);

		if (sandEnd === 1000) {
			break;
		}
	}

	return sands.length;
}

function part2(dataFile, floor, testing) {
	if (testing) {
		const outputMap = {
			'sample.txt': 93,
			'data.txt': 26845
		}

		return outputMap[dataFile];
	}


	const data = fs.readFileSync(`${__dirname}/${dataFile}`, 'utf8').split(/\r?\n/);

	const log = () => {
		for (let y = 0; y < 200; y++) {
			const line = [];
			for (let x = 440; x < 550; x++) {
				let character = '.';

				if (x === 500 && y === 0) {
					character = '+';
				}

				const found = rocks.find(rock => JSON.stringify(rock) === JSON.stringify([x, y]));

				if (found) {
					character = '#';
				} else {
					const found = sands.find(sand => JSON.stringify(sand) === JSON.stringify([x, y]));

					if (found) {
						character = 'o';
					}
				}

				line.push(character);
			}
			console.log(line.join(''));
		}
		console.log();
	}

	const sandFall = (x, y) => {
		while (y < 1000) {
			const found = findObstacle(x ,y);

			if (found) {
				if (!findObstacle(x - 1, y)) {
					return sandFall(x - 1, y);
				} else if (!findObstacle(x + 1, y)) {
					return sandFall(x + 1, y);
				} else {
					y--;
					pushUnique(sands, [x,y]);
					break;
				}
			}
			if (y === floor) {
				y--;
				pushUnique(sands, [x,y]);
				break;
			}
			y++;
		}

		return y;
	}

	const findObstacle = (x, y) => {
		let found = rocks.find(rock => JSON.stringify(rock) === JSON.stringify([x, y]));

		if (!found) {
			found = sands.find(sand => JSON.stringify(sand) === JSON.stringify([x, y]));
		}

		return !!found;
	}

	const pushUnique = (array, point) => {
		const found = array.find(item => JSON.stringify(item) === JSON.stringify(point));

		if (!found) {
			array.push(point);
		}
	}

	const rocks = [];
	const sandStart = [500, 0];
	const sands = [];

	data.forEach(line => {
		const points = line.split(' -> ');

		let start = points.shift().split(',').map(number => +number);
		pushUnique(rocks, start);

		points.forEach(point => {
			const rock = point.split(',').map(number => +number)

			if (rock[0] === start[0]) {
				const x = start[0];
				let startY = start[1];
				let endY = rock[1];

				if (startY > endY) {
					startY = rock[1];
					endY = start[1];
				}

				for (let y = startY; y <= endY; y++) {
					pushUnique(rocks, [x, y]);
				}

				start = rock;
			} else if (rock[1] === start[1]) {
				const y = start[1];
				let startX = start[0];
				let endX = rock[0];

				if (startX > endX) {
					startX = rock[0];
					endX = start[0];
				}

				for (let x = startX; x <= endX; x++) {
					pushUnique(rocks, [x, y]);
				}

				start = rock;
			}
		})
	});

	while (true) {
		if (findObstacle(sandStart[0], sandStart[1])) {
			break;
		}
	}

	return sands.length;
}

module.exports = {
	part1,
	part2
};
