const fs = require('fs');

function part1(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  const rock = 1;
  const paper = 2;
  const scissor = 3;

  const win = 6;
  const draw = 3;
  const loss = 0;

  const scoreMap = {
    X: {
      A: rock + draw,
      B: rock + loss,
      C: rock + win,
    },
    Y: {
      A: paper + win,
      B: paper + draw,
      C: paper + loss,
    },
    Z: {
      A: scissor + loss,
      B: scissor + win,
      C: scissor + draw,
    },
  };

  const sum = data.reduce((total, round) => {
    const [elf, you] = round.split(' ');

    return total + scoreMap[you][elf];
  }, 0);

  return sum;
}

function part2(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  const rock = 1;
  const paper = 2;
  const scissor = 3;

  const win = 6;
  const draw = 3;
  const loss = 0;

  const scoreMap = {
    A: {
      X: loss + scissor,
      Y: draw + rock,
      Z: win + paper,
    },
    B: {
      X: loss + rock,
      Y: draw + paper,
      Z: win + scissor,
    },
    C: {
      X: loss + paper,
      Y: draw + scissor,
      Z: win + rock,
    },
  };

  const sum = data.reduce((total, round) => {
    const [elf, you] = round.split(' ');

    return total + scoreMap[elf][you];
  }, 0);

  return sum;
}

module.exports = {
  part1,
  part2,
};
