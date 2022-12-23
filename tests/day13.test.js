const { part1, part2 } = require('../day13');

describe('Day 13: Distress Signal', () => {
  describe('Sample Data', () => {
    test('Part 1 the sum of the indices in the correct order should be 13', () => {
      expect(part1('sample.txt')).toBe(13);
    });
    test('Part 2 the decoder key for the distress signal should be 140', () => {
      expect(part2('sample.txt')).toBe(140);
    });
  });

  describe('Actual Data', () => {
    test('Part 1 the sum of the indices in the correct order should be 6568', () => {
      expect(part1('data.txt')).toBe(6568);
    });
    test('Part 2 the decoder key for the distress signal should be 19493', () => {
      expect(part2('data.txt')).toBe(19493);
    });
  });
});
