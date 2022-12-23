const fs = require('fs');

function part1(dataFile) {
  const packets = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  const compair = (leftNumber, rightNumber) => {
    if (leftNumber === undefined) {
      return true;
    }

    if (rightNumber === undefined) {
      return false;
    }

    if (Number.isInteger(leftNumber) && Number.isInteger(rightNumber)) {
      if (leftNumber > rightNumber) {
        return false;
      }

      if (leftNumber < rightNumber) {
        return true;
      }
    } else {
      if (!Array.isArray(leftNumber)) {
        leftNumber = [leftNumber];
      }

      if (!Array.isArray(rightNumber)) {
        rightNumber = [rightNumber];
      }

      let sections = leftNumber.length;

      if (sections < rightNumber.length) {
        sections = rightNumber.length;
      }

      for (let itemIndex = 0; itemIndex < sections; itemIndex++) {
        const leftItem = leftNumber[itemIndex];
        const rightItem = rightNumber[itemIndex];

        const add = compair(leftItem, rightItem);

        if (add !== null) {
          return add;
        }
      }
    }

    return null;
  };

  const packetPairs = [];

  let newPair = null;

  packets.forEach(packet => {
    if (packet !== '') {
      if (!newPair) {
        newPair = {
          left: packet,
          right: null,
        };
      } else {
        newPair.right = packet;

        packetPairs.push(newPair);
        newPair = null;
      }
    }
  });

  const correctOrderIndexBaseOne = [];

  packetPairs.forEach((pair, index) => {
    const leftPair = JSON.parse(pair.left);
    const rightPair = JSON.parse(pair.right);

    let sections = leftPair.length;
    let add = null;

    if (sections < rightPair.length) {
      sections = rightPair.length;
    }

    for (let itemIndex = 0; itemIndex < sections; itemIndex++) {
      const leftItem = leftPair[itemIndex];
      const rightItem = rightPair[itemIndex];

      add = compair(leftItem, rightItem);
      if (add !== null) {
        break;
      }
    }

    if (add) {
      correctOrderIndexBaseOne.push(index + 1);
    }
  });

  return correctOrderIndexBaseOne.reduce(
    (total, current) => total + current,
    0
  );
}

function part2(dataFile) {
  const packets = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/)
    .filter(line => line !== '')
    .map(line => JSON.parse(line));

  packets.push([[2]]);
  packets.push([[6]]);

  const compair = (leftNumber, rightNumber) => {
    if (leftNumber === undefined) {
      return true;
    }

    if (rightNumber === undefined) {
      return false;
    }

    if (Number.isInteger(leftNumber) && Number.isInteger(rightNumber)) {
      if (leftNumber > rightNumber) {
        return false;
      }

      if (leftNumber < rightNumber) {
        return true;
      }
    } else {
      if (!Array.isArray(leftNumber)) {
        leftNumber = [leftNumber];
      }

      if (!Array.isArray(rightNumber)) {
        rightNumber = [rightNumber];
      }

      let sections = leftNumber.length;

      if (sections < rightNumber.length) {
        sections = rightNumber.length;
      }

      for (let itemIndex = 0; itemIndex < sections; itemIndex++) {
        const leftItem = leftNumber[itemIndex];
        const rightItem = rightNumber[itemIndex];

        const add = compair(leftItem, rightItem);

        if (add !== null) {
          return add;
        }
      }
    }

    return null;
  };

  packets.sort((one, two) => {
    if (compair(one, two)) {
      return -1;
    }

    return 1;
  });

  const packetsString = packets.map(line => JSON.stringify(line));

  const code1 = packetsString.indexOf('[[2]]') + 1;
  const code2 = packetsString.indexOf('[[6]]') + 1;

  return code1 * code2;
}

module.exports = {
  part1,
  part2,
};
