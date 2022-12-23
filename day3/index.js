const fs = require('fs');
const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

function part1(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  const prorityList = letters.reduce((list, letter, index) => {
    list[letter] = index + 1;
    list[letter.toUpperCase()] = index + 27;

    return list;
  }, {});

  const sum = data.reduce((sum, rucksack) => {
    const compartment1 = rucksack.substring(0, rucksack.length / 2);
    const compartment2 = rucksack.substring(rucksack.length / 2);
    const foundItems = [];

    compartment1.split('').forEach(item1 => {
      compartment2.split('').forEach(item2 => {
        if (item1 === item2 && !foundItems.includes(item1)) {
          sum += prorityList[item1];
          foundItems.push(item1);
        }
      });
    });

    return sum;
  }, 0);

  return sum;
}

function part2(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);
  const groupSize = 3;

  const groups = [];

  for (let index = 0; index < data.length; index += groupSize) {
    groups.push(data.slice(index, index + groupSize));
  }

  const prorityList = letters.reduce((list, letter, index) => {
    list[letter] = index + 1;
    list[letter.toUpperCase()] = index + 27;

    return list;
  }, {});

  const sum = groups.reduce((sum, group) => {
    const foundItems = [];

    group[0].split('').forEach(item1 => {
      group[1].split('').forEach(item2 => {
        group[2].split('').forEach(item3 => {
          if (
            item1 === item2 &&
            item1 === item3 &&
            !foundItems.includes(item1)
          ) {
            sum += prorityList[item1];
            foundItems.push(item1);
          }
        });
      });
    });

    return sum;
  }, 0);

  return sum;
}

module.exports = {
  part1,
  part2,
};
