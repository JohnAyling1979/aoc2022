const { part1, part2 } = require('../day7');

describe('Day 7: No Space Left On Device', () => {
  describe('Sample Data', () => {
    test('Part 1 the sum of all directories less than 100000 should be 95437', () => {
      expect(part1('sample.txt')).toBe(95437);
    });
    test('Part 2 the size of the smallest directory that would give enough room should be 24933642', () => {
      expect(part2('sample.txt')).toBe(24933642);
    });
  });

  describe('Actual Data', () => {
    test('Part 1 the sum of all directories less than 100000 should be 1543140', () => {
      expect(part1('data.txt')).toBe(1543140);
    });
    test('Part 2 the size of the smallest directory that would give enough room should be 1117448', () => {
      expect(part2('data.txt')).toBe(1117448);
    });
  });
});
