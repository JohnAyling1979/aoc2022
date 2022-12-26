const { part1, part2 } = require('../day15');

describe('Day 15: Beacon Exclusion Zone', () => {
  describe('Sample Data', () => {
    test('Part 1 the number of positions that cannot contain the beacon should be 26', () => {
      expect(part1('sample.txt', 10)).toBe(26);
    });
    test('Part 2 the tuning frequency should be 56000011', () => {
      expect(part2('sample.txt', 20)).toBe(56000011);
    });
  });

  describe('Actual Data', () => {
    test('Part 1 the number of positions that cannot contain the beacon should be 5716881', () => {
      expect(part1('data.txt', 2000000, true)).toBe(5716881);
    });
  });
});
