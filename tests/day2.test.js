const {part1, part2} = require('../day2');

describe('Day 2: Rock Paper Scissors', () => {
	describe('Sample Data', () => {
		test('Part 1 total score should be 15', () => {expect(part1('sample.txt')).toBe(15)});
		test('Part 2 total score should be 12', () => {expect(part2('sample.txt')).toBe(12)});
	});

	describe('Actual Data', () => {
		test('Part 1 total score should be 13565', () => {expect(part1('data.txt')).toBe(13565)});
		test('Part 2 total score should be 12424', () => {expect(part2('data.txt')).toBe(12424)});
	});
});
