const { part1, part2 } = require('../day14');

describe('Day 14: Regolith Reservoir', () => {
  describe('Sample Data', () => {
    test('Part 1 the units of sand should be 24', () => {
      expect(part1('sample.txt')).toBe(24);
    });
    test('Part 2 the units of sand should be 93', () => {
      expect(part2('sample.txt', 11, true)).toBe(93);
    });
  });

  describe('Actual Data', () => {
    test('Part 1 the units of sand should be 858', () => {
      expect(part1('data.txt', true)).toBe(858);
    });
    test('Part 2 the units of sand should be 26845', () => {
      expect(part2('data.txt', 169, true)).toBe(26845);
    });
  });
});
