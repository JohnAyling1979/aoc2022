const {part1, part2} = require('../day12');

describe('Day 12: Hill Climbing Algorithm', () => {
	describe('Sample Data', () => {
		test('Part 1 the fewest steps required to reach the top should be 31', () => {expect(part1('sample.txt')).toBe(31)});
		test('Part 2 the fewest steps required to reach the top from any ground square should be 29', () => {expect(part2('sample.txt')).toBe(29)});
	});

	describe('Actual Data', () => {
		test('Part 1 the fewest steps required to reach the top should be 425', () => {expect(part1('data.txt')).toBe(425)});
		test('Part 2 the fewest steps required to reach the top from any ground square should be 418', () => {expect(part2('data.txt')).toBe(418)});
	});
});
