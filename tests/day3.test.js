const { part1, part2 } = require('../day3');

describe('Day 3: Rucksack Reorganization', () => {
  describe('Sample Data', () => {
    test('Part 1 prioriy score should be 157', () => {
      expect(part1('sample.txt')).toBe(157);
    });
    test('Part 2 prioriy score should be 70', () => {
      expect(part2('sample.txt')).toBe(70);
    });
  });

  describe('Actual Data', () => {
    test('Part 1 prioriy score should be 69626', () => {
      expect(part1('data.txt')).toBe(8243);
    });
    test('Part 2 prioriy score should be 206780', () => {
      expect(part2('data.txt')).toBe(2631);
    });
  });
});
