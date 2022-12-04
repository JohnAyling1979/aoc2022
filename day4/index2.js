const fs = require('fs');
const data = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

function fillSections(start, end) {
	const sections = [];

	for (let i = start; i <= end; i++) {
		sections.push(i);
	}

	return sections;
}

const overlapping = data.reduce((count, row) => {
	const [part1, part2] = row.split(',');

	let [start, end] = part1.split('-');
	let biggerSection = fillSections(+start, +end);

	[start, end] = part2.split('-');
	let smallerSection = fillSections(+start, +end);

	if (biggerSection.length < smallerSection.length) {
		const temp = biggerSection;
		biggerSection = smallerSection;
		smallerSection = temp;
	}

	const remaining = smallerSection.filter(item => !biggerSection.includes(item));

	if (remaining.length !== smallerSection.length) {
		count++;
	}

	return count;
}, 0);

console.log(overlapping);