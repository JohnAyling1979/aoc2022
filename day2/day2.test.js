const {part1, part2} = require('.');

describe('Day 2: Rock Paper Scissors', () => {
	describe('Sample Data', () => {
		test('Part 1 total calories should be 24000', () => {expect(part1('sample.txt')).toBe(15)});
		test('Part 2 total calories should be 45000', () => {expect(part2('sample.txt')).toBe(12)});
	});

	describe('Actual Data', () => {
		test('Part 1 total calories should be 69626', () => {expect(part1('data.txt')).toBe(13565)});
		test('Part 2 total calories should be 206780', () => {expect(part2('data.txt')).toBe(12424)});
	});
});
