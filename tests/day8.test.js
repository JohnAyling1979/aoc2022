const {part1, part2} = require('../day8');

describe('Day 8: Treetop Tree House', () => {
	describe('Sample Data', () => {
		test('Part 1 the number of visible trees should be 21', () => {expect(part1('sample.txt')).toBe(21)});
		test('Part 2 the highest scenic score possible for any tree should be 8', () => {expect(part2('sample.txt')).toBe(8)});
	});

	describe('Actual Data', () => {
		test('Part 1 the number of visible trees should be 1543', () => {expect(part1('data.txt')).toBe(1543)});
		test('Part 2 the highest scenic score possible for any tree should be 595080', () => {expect(part2('data.txt')).toBe(595080)});
	});
});
