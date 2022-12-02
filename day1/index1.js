const fs = require('fs');
const data = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

const elvies = [];
let index = 0;

elvies[0] = 0;

data.forEach(line => {
	if (line === '') {
		index++
		elvies[index] = 0;
	} else {
		elvies[index] += +line
	}
})

elvies.sort((a, b) => b - a);

console.log(elvies[0])
