const { part1, part2 } = require('../day20');

describe('Day 20: Grove Positioning System', () => {
  describe('Sample Data', () => {
    test('Part 1 The coordinates should be 3', () => {
      expect(part1('sample.txt')).toBe(3);
    });
    test('Part 2 The coordinates should be 1623178306', () => {
      expect(part2('sample.txt')).toBe(1623178306);
    });
  });

  describe('Actual Data', () => {
    test('Part 1 The coordinates should be 4426', () => {
      expect(part1('data.txt')).toBe(4426);
    });
    test('Part 2 The coordinates should be 8119137886612', () => {
      expect(part2('data.txt')).toBe(8119137886612);
    });
  });
});
