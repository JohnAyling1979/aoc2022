const fs = require('fs');

function part1(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  const elvies = [];
  let index = 0;

  elvies[0] = 0;

  data.forEach((line) => {
    if (line === '') {
      index++;
      elvies[index] = 0;
    } else {
      elvies[index] += +line;
    }
  });

  elvies.sort((a, b) => b - a);

  return elvies[0];
}

function part2(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  const elvies = [];
  let index = 0;

  elvies[0] = 0;

  data.forEach((line) => {
    if (line === '') {
      index++;
      elvies[index] = 0;
    } else {
      elvies[index] += +line;
    }
  });

  elvies.sort((a, b) => b - a);

  return elvies[0] + elvies[1] + elvies[2];
}

module.exports = {
  part1,
  part2,
};
