const { part1, part2 } = require('../day23');

describe('Day 23: Unstable Diffusion', () => {
  describe('Sample Data', () => {
    test('Part 1 The empty ground within the rectangle contained should be 110', () => {
      expect(part1('sample.txt')).toBe(110);
    });
    test('Part 2 The number of rounds to spread out should be 20', () => {
      expect(part2('sample.txt')).toBe(20);
    });
  });

  describe('Actual Data', () => {
    test('Part 1 empty ground within the rectangle contained should be 3757', () => {
      expect(part1('data.txt')).toBe(3757);
    });
    test('Part 2 The number of rounds to spread out should be 918', () => {
      expect(part2('data.txt', true)).toBe(918);
    });
  });
});
