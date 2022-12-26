const fs = require('fs');

function part1(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  let sum = 0;

  const powersOfFive = dec => {
    let i = 0;
    let value;

    do {
      value = Math.pow(5, i);
      console.log(value);
      i++;
    } while (value < dec);
  };

  const snafuToTen = snafu => {
    const snafuMap = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      '-': -1,
      '=': -2,
    };
    const lastIndex = snafu.length - 1;
    let baseTen = 0;

    for (let index = lastIndex; index >= 0; index--) {
      const pow = lastIndex - index;
      const character = snafu[index];
      const value = snafuMap[character];

      baseTen += value * Math.pow(5, pow);
    }

    return baseTen;
  };

  const tenToSnafu = dec => {
    const result = [];
    let add = false;

    while (dec > 5) {
      let value = dec % 5;

      if (add) {
        value++;
        add = false;
      }

      if (value === 5) {
        result.push(0);
        add = true;
      } else if (value === 4) {
        result.push('-');
        add = true;
      } else if (value === 3) {
        result.push('=');
        add = true;
      } else {
        result.push(value);
      }

      dec = parseInt(dec / 5);
    }

    if (add) {
      dec++;
    }

    result.push(dec);

    return result.reverse().join('');
  };

  data.forEach(snafu => {
    sum += snafuToTen(snafu);
  });

  return tenToSnafu(sum);
}

function part2(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  return null;
}

module.exports = {
  part1,
  part2,
};
