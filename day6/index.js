const fs = require('fs');

function part1(dataFile) {
	const data = fs.readFileSync(`${__dirname}/${dataFile}`, 'utf8').split(/\r?\n/)[0];

	let firstMarker = 0;
	const markerLength = 4

	for(let i = 0; i < data.length - markerLength + 1; i++) {
		const marker = data.substring(i, i + markerLength).split('');
		const tester = {};
		const pass = marker.reduce((current, character) => {
			if (tester[character]) {
				return false;
			}

			tester[character] = true;

			return current;
		}, true)

		if (pass) {
			firstMarker = i + markerLength;
			break;
		}
	}

	return firstMarker;
}

function part2(dataFile) {
	const data = fs.readFileSync(`${__dirname}/${dataFile}`, 'utf8').split(/\r?\n/)[0];

	let firstMarker = 0;
	const markerLength = 14

	for(let i = 0; i < data.length - markerLength + 1; i++) {
		const marker = data.substring(i, i + markerLength).split('');
		const tester = {};
		const pass = marker.reduce((current, character) => {
			if (tester[character]) {
				return false;
			}

			tester[character] = true;

			return current;
		}, true)

		if (pass) {
			firstMarker = i + markerLength;
			break;
		}
	}

	return firstMarker;
}




module.exports = {
	part1,
	part2
};
