const fs = require('fs');

function part1(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  function fillSections(start, end) {
    const sections = [];

    for (let i = start; i <= end; i++) {
      sections.push(i);
    }

    return sections;
  }

  return data.reduce((count, row) => {
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

    const remaining = smallerSection.filter(
      (item) => !biggerSection.includes(item)
    );

    if (remaining.length === 0) {
      count++;
    }

    return count;
  }, 0);
}

function part2(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  function fillSections(start, end) {
    const sections = [];

    for (let i = start; i <= end; i++) {
      sections.push(i);
    }

    return sections;
  }

  return data.reduce((count, row) => {
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

    const remaining = smallerSection.filter(
      (item) => !biggerSection.includes(item)
    );

    if (remaining.length !== smallerSection.length) {
      count++;
    }

    return count;
  }, 0);
}

module.exports = {
  part1,
  part2,
};
