const {part1, part2} = require('../day6');

describe('Day 6: Tuning Trouble', () => {
	describe('Sample Data', () => {
		test('Part 1 the number of processed character before the first start-of-packet marker is detected should be 7', () => {expect(part1('sample.txt')).toBe(11)});
		test('Part 2 the number of processed character before the first start-of-packet marker is detected should be 26', () => {expect(part2('sample.txt')).toBe(26)});
	});

	describe('Actual Data', () => {
		test('Part 1 the number of processed character before the first start-of-packet marker is detected should be 1175', () => {expect(part1('data.txt')).toBe(1175)});
		test('Part 2 the number of processed character before the first start-of-packet marker is detected should be 3217', () => {expect(part2('data.txt')).toBe(3217)});
	});
});
