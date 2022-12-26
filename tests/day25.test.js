const { part1, part2 } = require('../day25');

describe('Day 25: Full of Hot Air', () => {
  describe('Sample Data', () => {
    test('Part 1 The SNAFU number should be 2=-1=0', () => {
      expect(part1('sample.txt')).toBe('2=-1=0');
    });
  });

  describe('Actual Data', () => {
    test('Part 1 SNAFU number should be 20===-20-020=0001-02', () => {
      expect(part1('data.txt')).toBe('20===-20-020=0001-02');
    });
  });
});
