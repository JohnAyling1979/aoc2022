const { part1, part2 } = require('../day22');

describe('Day 22: Monkey Map', () => {
  describe('Sample Data', () => {
    test('Part 1 The password should be 6032', () => {
      expect(part1('sample.txt')).toBe(6032);
    });
    test('Part 2 The final password should be 5031', () => {
      expect(part2('sample.txt', 4)).toBe(5031);
    });
  });

  describe('Actual Data', () => {
    test('Part 1 The password should be 165094', () => {
      expect(part1('data.txt')).toBe(165094);
    });
    test('Part 2 The final password should be 95316', () => {
      expect(part2('data.txt', 50)).toBe(95316);
    });
  });
});
