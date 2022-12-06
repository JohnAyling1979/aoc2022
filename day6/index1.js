const fs = require('fs');
const data = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/)[0];

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

console.log(firstMarker);