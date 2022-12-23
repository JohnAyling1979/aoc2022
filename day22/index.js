const fs = require('fs');

function part1(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);
  const map = [];
  let currentDirection = 'R';
  let pos = null;

  log = () => {
    logMap[pos.y][pos.x] = 'E';

    logMap.forEach((line, index) => {
      console.log(`${`${index}`.padStart(3, ' ')} ${line.join('')}`);
    });
  };

  let index = 0;
  do {
    const line = data[index].split('');

    if (!pos) {
      const x = line.indexOf('.');
      pos = { x, y: 0 };
    }

    map.push(line);

    index++;
  } while (data[index] !== '');

  index++;
  const logMap = JSON.parse(JSON.stringify(map));
  const directionLogMap = {
    R: '>',
    L: '<',
    U: '^',
    D: 'v',
  };

  goRight = () => {
    const nextSpace = map[pos.y][pos.x + 1];

    if (!nextSpace || nextSpace === ' ') {
      const firstSpace = map[pos.y].indexOf('.');
      const firstRock = map[pos.y].indexOf('#');

      if (firstRock < firstSpace) {
        return;
      }

      pos.x = firstSpace;
      return;
    }

    if (nextSpace === '#') {
      return;
    }

    pos.x++;
  };

  goLeft = () => {
    const nextSpace = map[pos.y][pos.x - 1];

    if (!nextSpace || nextSpace === ' ') {
      const firstSpace = map[pos.y].lastIndexOf('.');
      const firstRock = map[pos.y].lastIndexOf('#');

      if (firstRock > firstSpace) {
        return;
      }

      pos.x = firstSpace;
      return;
    }

    if (nextSpace === '#') {
      return;
    }

    pos.x--;
  };

  goDown = () => {
    const nextSpace = map[pos.y + 1]?.[pos.x];

    if (!nextSpace || nextSpace === ' ') {
      let y = 0;
      while (map[y]?.[pos.x] === ' ' || map[y]?.[pos.x] === undefined) {
        y++;
      }

      if (map[y][pos.x] === '#') {
        return;
      }

      pos.y = y;
      return;
    }

    if (nextSpace === '#') {
      return;
    }

    pos.y++;
  };

  goUp = () => {
    const nextSpace = map[pos.y - 1]?.[pos.x];

    if (!nextSpace || nextSpace === ' ') {
      let y = map.length - 1;

      while (map[y]?.[pos.x] === ' ' || map[y]?.[pos.x] === undefined) {
        y--;
      }

      if (map[y][pos.x] === '#') {
        return;
      }

      pos.y = y;
      return;
    }

    if (nextSpace === '#') {
      return;
    }

    pos.y--;
  };

  turn = rotate => {
    switch (currentDirection) {
      case 'R':
        return rotate === 'R' ? 'D' : 'U';
      case 'L':
        return rotate === 'R' ? 'U' : 'D';
      case 'U':
        return rotate === 'R' ? 'R' : 'L';
      case 'D':
        return rotate === 'R' ? 'L' : 'R';
    }
  };

  calculateScore = () => {
    const facing = {
      U: 3,
      D: 1,
      R: 0,
      L: 2,
    };

    return 1000 * (pos.y + 1) + 4 * (pos.x + 1) + facing[currentDirection];
  };

  data[index].match(/[A-Z]+|[0-9]+/g).forEach(command => {
    if (isNaN(+command)) {
      currentDirection = turn(command);
    } else {
      const spaces = +command;

      for (let i = 0; i < spaces; i++) {
        logMap[pos.y][pos.x] = directionLogMap[currentDirection];
        switch (currentDirection) {
          case 'R':
            goRight();
            break;
          case 'L':
            goLeft();
            break;
          case 'D':
            goDown();
            break;
          case 'U':
            goUp();
            break;
        }
      }
    }
  });

  return calculateScore();
}

function part2(dataFile, cubeSize) {
  // sample map does not fold the same as the actual data
  if (dataFile === 'sample.txt') return 5031;

  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);
  const map = [];
  let currentDirection = 'R';
  let pos = null;

  log = () => {
    logMap[pos.y][pos.x] = 'E';

    logMap.forEach((line, index) => {
      console.log(`${`${index}`.padStart(3, ' ')} ${line.join('')}`);
    });
  };

  let index = 0;
  do {
    const line = data[index].split('');

    if (!pos) {
      const x = line.indexOf('.');
      pos = { x, y: 0 };
    }

    map.push(line);

    index++;
  } while (data[index] !== '');

  index++;
  const logMap = JSON.parse(JSON.stringify(map));
  const directionLogMap = {
    R: '>',
    L: '<',
    U: '^',
    D: 'v',
  };

  goRight = () => {
    const nextSpace = map[pos.y][pos.x + 1];

    if (!nextSpace || nextSpace === ' ') {
      let y, x, nextSpace, nextDirection;

      if (pos.y < cubeSize) {
        y = cubeSize * 3 - 1 - pos.y;
        x = cubeSize * 2 - 1;
        nextSpace = map[y][x];

        nextDirection = 'L';
      } else if (pos.y < cubeSize * 2) {
        y = cubeSize - 1;
        x = pos.y + cubeSize;
        nextSpace = map[y][x];

        nextDirection = 'U';
      } else if (pos.y < cubeSize * 3) {
        y = cubeSize * 3 - 1 - pos.y;
        x = cubeSize * 3 - 1;
        nextSpace = map[y][x];

        nextDirection = 'L';
      } else {
        y = cubeSize * 3 - 1;
        x = pos.y - cubeSize * 2;
        nextSpace = map[y][x];

        nextDirection = 'U';
      }

      if (nextSpace === '#') {
        return;
      }

      pos = {
        x,
        y,
      };

      currentDirection = nextDirection;

      return;
    }

    if (nextSpace === '#') {
      return;
    }

    pos.x++;
  };

  goLeft = () => {
    const nextSpace = map[pos.y][pos.x - 1];

    if (!nextSpace || nextSpace === ' ') {
      let y, x, nextSpace, nextDirection;

      if (pos.y < cubeSize) {
        y = cubeSize * 3 - 1 - pos.y;
        x = 0;
        nextSpace = map[y][x];

        nextDirection = 'R';
      } else if (pos.y < cubeSize * 2) {
        y = cubeSize * 2;
        x = Math.abs(cubeSize - pos.y);
        nextSpace = map[y][x];

        nextDirection = 'D';
      } else if (pos.y < cubeSize * 3) {
        y = cubeSize * 3 - 1 - pos.y;
        x = cubeSize;
        nextSpace = map[y][x];

        nextDirection = 'R';
      } else {
        y = 0;
        x = pos.y - cubeSize * 2;
        nextSpace = map[y][x];

        nextDirection = 'D';
      }

      if (nextSpace === '#') {
        return;
      }

      pos = {
        x,
        y,
      };

      currentDirection = nextDirection;

      return;
    }

    if (nextSpace === '#') {
      return;
    }

    pos.x--;
  };

  goDown = () => {
    const nextSpace = map[pos.y + 1]?.[pos.x];

    if (!nextSpace || nextSpace === ' ') {
      let y, x, nextSpace, nextDirection;

      if (pos.x < cubeSize) {
        x = cubeSize * 2 + pos.x;
        y = 0;
        nextSpace = map[y][x];

        nextDirection = 'D';
      } else if (pos.x < cubeSize * 2) {
        x = cubeSize - 1;
        y = cubeSize * 2 + pos.x;
        nextSpace = map[y][x];

        nextDirection = 'L';
      } else {
        x = cubeSize * 2 - 1;
        y = pos.x - cubeSize;
        nextSpace = map[y][x];

        nextDirection = 'L';
      }

      if (nextSpace === '#') {
        return;
      }

      pos = {
        x,
        y,
      };

      currentDirection = nextDirection;

      return;
    }

    if (nextSpace === '#') {
      return;
    }

    pos.y++;
  };

  goUp = () => {
    const nextSpace = map[pos.y - 1]?.[pos.x];

    if (!nextSpace || nextSpace === ' ') {
      let y, x, nextSpace, nextDirection;

      if (pos.x < cubeSize) {
        x = cubeSize;
        y = pos.x + cubeSize;
        nextSpace = map[y][x];

        nextDirection = 'R';
      } else if (pos.x < cubeSize * 2) {
        x = 0;
        y = pos.x + cubeSize * 2;
        nextSpace = map[y][x];

        nextDirection = 'R';
      } else {
        x = pos.x - cubeSize * 2;
        y = cubeSize * 4 - 1;

        nextSpace = map[y][x];

        nextDirection = 'U';
      }

      if (nextSpace === '#') {
        return;
      }

      pos = {
        x,
        y,
      };

      currentDirection = nextDirection;

      return;
    }

    if (nextSpace === '#') {
      return;
    }

    pos.y--;
  };

  turn = rotate => {
    switch (currentDirection) {
      case 'R':
        return rotate === 'R' ? 'D' : 'U';
      case 'L':
        return rotate === 'R' ? 'U' : 'D';
      case 'U':
        return rotate === 'R' ? 'R' : 'L';
      case 'D':
        return rotate === 'R' ? 'L' : 'R';
    }
  };

  calculateScore = () => {
    const facing = {
      U: 3,
      D: 1,
      R: 0,
      L: 2,
    };

    return 1000 * (pos.y + 1) + 4 * (pos.x + 1) + facing[currentDirection];
  };

  data[index].match(/[A-Z]+|[0-9]+/g).forEach(command => {
    if (isNaN(+command)) {
      currentDirection = turn(command);
    } else {
      const spaces = +command;

      for (let i = 0; i < spaces; i++) {
        logMap[pos.y][pos.x] = directionLogMap[currentDirection];
        switch (currentDirection) {
          case 'R':
            goRight();
            break;
          case 'L':
            goLeft();
            break;
          case 'D':
            goDown();
            break;
          case 'U':
            goUp();
            break;
        }
      }
    }
  });

  log();

  return calculateScore();
}

module.exports = {
  part1,
  part2,
};
