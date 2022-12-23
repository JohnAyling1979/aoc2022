const { part1, part2 } = require('../day21');

describe('Day 21: Monkey Math', () => {
  describe('Sample Data', () => {
    test('Part 1 Root should yell 152', () => {
      expect(part1('sample.txt')).toBe(152);
    });
    test('Part 2 You should yell 301', () => {
      expect(part2('sample.txt')).toBe('[301]');
    });
  });

  describe('Actual Data', () => {
    test('Part 1 Root should yell 282285213953670', () => {
      expect(part1('data.txt')).toBe(282285213953670);
    });
    test('Part 2 You should yell 3699945358564', () => {
      expect(part2('data.txt')).toBe('[3699945358564]');
    });
  });
});
