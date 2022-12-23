const fs = require('fs');

function part1(dataFile) {
  const commands = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  let cycles = 0;
  let x = 1;
  let total = 0;
  const checkCycles = [20, 60, 100, 140, 180, 220];

  for (let i = 0; i < commands.length + 2; i++) {
    let action, value;

    if (commands?.[i]) {
      [action, value] = commands[i].split(' ');
    }

    switch (action) {
      case 'addx':
        cycles++;
        if (checkCycles.includes(cycles)) {
          total += cycles * x;
        }
        cycles++;
        if (checkCycles.includes(cycles)) {
          total += cycles * x;
        }
        x += +value;
        break;
      case 'noop':
        cycles++;
        if (checkCycles.includes(cycles)) {
          total += cycles * x;
        }
    }
  }

  return total;
}

function part2(dataFile) {
  const commands = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  const drawCrt = () => {
    cycles++;

    if (
      crtPos % 40 === spritePos - 1 ||
      crtPos % 40 === spritePos ||
      crtPos % 40 === spritePos + 1
    ) {
      screen[line].push('#');
    } else {
      screen[line].push('.');
    }

    if (cycles % 40 === 0) {
      line++;
    }
    crtPos++;
  };

  let cycles = 0;
  let spritePos = 1;
  let crtPos = 0;
  let line = 0;
  const screen = [[], [], [], [], [], []];

  for (let i = 0; i < commands.length + 2; i++) {
    let action, value;

    if (commands?.[i]) {
      [action, value] = commands[i].split(' ');
    }

    switch (action) {
      case 'addx':
        drawCrt();
        drawCrt();
        spritePos += +value;
        break;
      case 'noop':
        drawCrt();
    }
  }

  return screen;
}

module.exports = {
  part1,
  part2,
};
