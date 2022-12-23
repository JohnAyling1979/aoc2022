const fs = require('fs');
const { LinkedList, ListNode } = require('./linked-list');

function part1(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/)
    .map((number) => +number);
  let linkedList = null;

  data.forEach((number, index) => {
    const node = new ListNode(number, index);
    if (index === 0) {
      linkedList = new LinkedList(node);
    } else {
      linkedList.add(node);
    }
  });

  data.forEach((_, index) => {
    linkedList.moveByValue(index);
  });

  return linkedList.calculateCoordinates();
}

function part2(dataFile) {
  const key = 811589153;
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/)
    .map((number) => +number * key);
  let linkedList = null;

  data.forEach((number, index) => {
    const node = new ListNode(number, index);
    if (index === 0) {
      linkedList = new LinkedList(node);
    } else {
      linkedList.add(node);
    }
  });

  for (let i = 0; i < 10; i++) {
    data.forEach((_, index) => {
      linkedList.moveByValue(index);
    });
  }

  return linkedList.calculateCoordinates();
}

module.exports = {
  part1,
  part2,
};
