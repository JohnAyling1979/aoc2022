const {part1, part2} = require('../day5');

describe('Day 5: Supply Stacks', () => {
	describe('Sample Data', () => {
		test('Part 1 the creates that end on top should be CMZ', () => {expect(part1('sample.txt')).toBe('CMZ')});
		test('Part 2 the creates that end on top should be MCD', () => {expect(part2('sample.txt')).toBe('MCD')});
	});

	describe('Actual Data', () => {
		test('Part 1 the creates that end on top should be ZSQVCCJLL', () => {expect(part1('data.txt')).toBe('ZSQVCCJLL')});
		test('Part 2 the creates that end on top should be QZFJRWHGS', () => {expect(part2('data.txt')).toBe('QZFJRWHGS')});
	});
});
