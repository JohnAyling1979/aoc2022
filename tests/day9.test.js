const { part1, part2 } = require('../day9');

describe('Day 9: Rope Bridge', () => {
  describe('Sample Data', () => {
    test('Part 1 the number of positions visited should be 13', () => {
      expect(part1('sample1.txt')).toBe(13);
    });
    test('Part 2 the number of positions visited should be 36', () => {
      expect(part2('sample2.txt')).toBe(36);
    });
  });

  describe('Actual Data', () => {
    test('Part 1 the number of positions visited should be 6098', () => {
      expect(part1('data.txt')).toBe(6098);
    });
    test('Part 2 the number of positions visited should be 2597', () => {
      expect(part2('data.txt')).toBe(2597);
    });
  });
});
