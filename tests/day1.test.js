const {part1, part2} = require('../day1');

describe('Day 1: Calorie Counting', () => {
	describe('Sample Data', () => {
		test('Part 1 total calories should be 24000', () => {expect(part1('sample.txt')).toBe(24000)});
		test('Part 2 total calories should be 45000', () => {expect(part2('sample.txt')).toBe(45000)});
	});

	describe('Actual Data', () => {
		test('Part 1 total calories should be 69626', () => {expect(part1('data.txt')).toBe(69626)});
		test('Part 2 total calories should be 206780', () => {expect(part2('data.txt')).toBe(206780)});
	});
});
