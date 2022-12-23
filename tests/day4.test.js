const { part1, part2 } = require('../day4');

describe('Day 4: Camp Cleanup', () => {
  describe('Sample Data', () => {
    test('Part 1 assignment pairs that one range fully contain the other should be 157', () => {
      expect(part1('sample.txt')).toBe(2);
    });
    test('Part 2 assignment pairs that are overlapped should be 70', () => {
      expect(part2('sample.txt')).toBe(4);
    });
  });

  describe('Actual Data', () => {
    test('Part 1 assignment pairs that one range fully contain the other should be 69626', () => {
      expect(part1('data.txt')).toBe(464);
    });
    test('Part 2 assignment pairs that are overlapped should be 206780', () => {
      expect(part2('data.txt')).toBe(770);
    });
  });
});
