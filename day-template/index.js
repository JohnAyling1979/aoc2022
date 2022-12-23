const fs = require('fs');

function part1(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  return null;
}

function part2(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  return null;
}

console.log(part1('sample.txt'));
console.log(part2('sample.txt'));

module.exports = {
  part1,
  part2,
};
