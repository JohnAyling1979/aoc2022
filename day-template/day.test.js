const {part1, part2} = require('.');

describe('Day template', () => {
	describe('Sample Data', () => {
		test('Return nothing', () => {expect(part1('sample.txt')).toBe(null)});
		test('Return nothing', () => {expect(part2('sample.txt')).toBe(null)});
	});

	describe('Actual Data', () => {
		test('Return nothing', () => {expect(part1('data.txt')).toBe(null)});
		test('Return nothing', () => {expect(part2('data.txt')).toBe(null)});
	});
});

