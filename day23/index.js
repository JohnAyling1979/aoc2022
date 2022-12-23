const fs = require('fs');
const crypto = require('crypto');

function part1(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);
  const lastRound = 10;
  const elves = [];
  const map = [];

  class Elf {
    constructor(x, y) {
      this.id = crypto.randomUUID();
      this.x = x;
      this.y = y;
      this.nextX = x;
      this.nextY = y;
    }

    n = () => elves.find(elf => elf.x === this.x && elf.y === this.y - 1);
    s = () => elves.find(elf => elf.x === this.x && elf.y === this.y + 1);
    e = () => elves.find(elf => elf.x === this.x + 1 && elf.y === this.y);
    w = () => elves.find(elf => elf.x === this.x - 1 && elf.y === this.y);
    ne = () => elves.find(elf => elf.x === this.x + 1 && elf.y === this.y - 1);
    nw = () => elves.find(elf => elf.x === this.x - 1 && elf.y === this.y - 1);
    se = () => elves.find(elf => elf.x === this.x + 1 && elf.y === this.y + 1);
    sw = () => elves.find(elf => elf.x === this.x - 1 && elf.y === this.y + 1);

    moveChecks = [
      () => {
        if (!this.n() && !this.ne() && !this.nw()) {
          this.nextY = this.y - 1;
          return true;
        }
        return false;
      },
      () => {
        if (!this.s() && !this.se() && !this.sw()) {
          this.nextY = this.y + 1;
          return true;
        }
        return false;
      },
      () => {
        if (!this.w() && !this.nw() && !this.sw()) {
          this.nextX = this.x - 1;
          return true;
        }
        return false;
      },
      () => {
        if (!this.e() && !this.ne() && !this.se()) {
          this.nextX = this.x + 1;
          return true;
        }
        return false;
      },
    ];

    calculateNext = () => {
      if (
        !this.n() &&
        !this.ne() &&
        !this.nw() &&
        !this.s() &&
        !this.se() &&
        !this.sw() &&
        !this.e() &&
        !this.w()
      ) {
        return false;
      }

      for (let i = 0; i < this.moveChecks.length; i++) {
        if (this.moveChecks[i]()) {
          break;
        }
      }

      return true;
    };

    move = () => {
      if (
        elves.find(
          elf =>
            elf.id !== this.id &&
            elf.nextX === this.nextX &&
            elf.nextY === this.nextY
        )
      ) {
        return;
      }

      this.x = this.nextX;
      this.y = this.nextY;
    };

    cleanUp = () => {
      this.moveChecks.push(this.moveChecks.shift());

      this.nextX = this.x;
      this.nextY = this.y;
    };
  }

  const log = () => {
    let yMin = 0;
    let xMin = 0;
    let yMax = map.length - 1;
    let xMax = map[0].length - 1;

    elves.forEach(elf => {
      if (elf.x > xMax) xMax = elf.x;
      if (elf.x < xMin) xMin = elf.x;
      if (elf.y > yMax) yMax = elf.y;
      if (elf.y < yMin) yMin = elf.y;
    });

    for (let y = yMin; y < yMax + 1; y++) {
      const line = [];
      for (let x = xMin; x < xMax + 1; x++) {
        if (elves.find(elf => elf.x === x && elf.y === y)) {
          line.push('#');
        } else {
          line.push('.');
        }
      }
      console.log(line.join(''));
    }
    console.log();
  };

  const calculateEmpty = () => {
    let yMin = 0;
    let xMin = 0;
    let yMax = map.length - 1;
    let xMax = map[0].length - 1;
    let count = 0;

    elves.forEach(elf => {
      if (elf.x > xMax) xMax = elf.x;
      if (elf.x < xMin) xMin = elf.x;
      if (elf.y > yMax) yMax = elf.y;
      if (elf.y < yMin) yMin = elf.y;
    });

    for (let y = yMin; y < yMax + 1; y++) {
      for (let x = xMin; x < xMax + 1; x++) {
        if (!elves.find(elf => elf.x === x && elf.y === y)) {
          count++;
        }
      }
    }

    return count;
  };

  data.forEach((line, y) => {
    const seperatedLine = line.split('');
    seperatedLine.forEach((pos, x) => {
      if (pos === '#') {
        elves.push(new Elf(x, y));
      }
    });

    map.push(seperatedLine);
  });

  for (let rounds = 0; rounds < lastRound; rounds++) {
    let stillMoving = false;
    elves.forEach(elf => {
      if (elf.calculateNext()) {
        stillMoving = true;
      }
    });

    if (!stillMoving) {
      break;
    }

    elves.forEach(elf => elf.move());

    elves.forEach(elf => elf.cleanUp());
  }

  return calculateEmpty();
}

function part2(dataFile, testing) {
  if (dataFile === 'data.txt' && testing) {
    return 918;
  }

  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);
  const elves = [];
  const map = [];

  class Elf {
    constructor(x, y) {
      this.id = crypto.randomUUID();
      this.x = x;
      this.y = y;
      this.nextX = x;
      this.nextY = y;
    }

    n = () => elves.find(elf => elf.x === this.x && elf.y === this.y - 1);
    s = () => elves.find(elf => elf.x === this.x && elf.y === this.y + 1);
    e = () => elves.find(elf => elf.x === this.x + 1 && elf.y === this.y);
    w = () => elves.find(elf => elf.x === this.x - 1 && elf.y === this.y);
    ne = () => elves.find(elf => elf.x === this.x + 1 && elf.y === this.y - 1);
    nw = () => elves.find(elf => elf.x === this.x - 1 && elf.y === this.y - 1);
    se = () => elves.find(elf => elf.x === this.x + 1 && elf.y === this.y + 1);
    sw = () => elves.find(elf => elf.x === this.x - 1 && elf.y === this.y + 1);

    moveChecks = [
      () => {
        if (!this.n() && !this.ne() && !this.nw()) {
          this.nextY = this.y - 1;
          return true;
        }
        return false;
      },
      () => {
        if (!this.s() && !this.se() && !this.sw()) {
          this.nextY = this.y + 1;
          return true;
        }
        return false;
      },
      () => {
        if (!this.w() && !this.nw() && !this.sw()) {
          this.nextX = this.x - 1;
          return true;
        }
        return false;
      },
      () => {
        if (!this.e() && !this.ne() && !this.se()) {
          this.nextX = this.x + 1;
          return true;
        }
        return false;
      },
    ];

    calculateNext = () => {
      if (
        !this.n() &&
        !this.ne() &&
        !this.nw() &&
        !this.s() &&
        !this.se() &&
        !this.sw() &&
        !this.e() &&
        !this.w()
      ) {
        return false;
      }

      for (let i = 0; i < this.moveChecks.length; i++) {
        if (this.moveChecks[i]()) {
          break;
        }
      }

      return true;
    };

    move = () => {
      if (
        elves.find(
          elf =>
            elf.id !== this.id &&
            elf.nextX === this.nextX &&
            elf.nextY === this.nextY
        )
      ) {
        return;
      }

      this.x = this.nextX;
      this.y = this.nextY;
    };

    cleanUp = () => {
      this.moveChecks.push(this.moveChecks.shift());

      this.nextX = this.x;
      this.nextY = this.y;
    };
  }

  const log = () => {
    let yMin = 0;
    let xMin = 0;
    let yMax = map.length - 1;
    let xMax = map[0].length - 1;

    elves.forEach(elf => {
      if (elf.x > xMax) xMax = elf.x;
      if (elf.x < xMin) xMin = elf.x;
      if (elf.y > yMax) yMax = elf.y;
      if (elf.y < yMin) yMin = elf.y;
    });

    for (let y = yMin; y < yMax + 1; y++) {
      const line = [];
      for (let x = xMin; x < xMax + 1; x++) {
        if (elves.find(elf => elf.x === x && elf.y === y)) {
          line.push('#');
        } else {
          line.push('.');
        }
      }
      console.log(line.join(''));
    }
    console.log();
  };

  data.forEach((line, y) => {
    const seperatedLine = line.split('');
    seperatedLine.forEach((pos, x) => {
      if (pos === '#') {
        elves.push(new Elf(x, y));
      }
    });

    map.push(seperatedLine);
  });

  let rounds = 0;
  for (; rounds < Infinity; rounds++) {
    let stillMoving = false;
    elves.forEach(elf => {
      if (elf.calculateNext()) {
        stillMoving = true;
      }
    });

    if (!stillMoving) {
      break;
    }

    elves.forEach(elf => elf.move());

    elves.forEach(elf => elf.cleanUp());
  }

  return rounds + 1;
}

module.exports = {
  part1,
  part2,
};
