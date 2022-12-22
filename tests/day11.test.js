const {part1, part2} = require('../day11');

describe('Day 11: Monkey in the Middle', () => {
	describe('Sample Data', () => {
		test('Part 1 the level of monkey business after 20 rounds should be 10605', () => {expect(part1('sample.txt')).toBe(10605)});
		test('Part 2 the level of monkey business after 10000 rounds should be 2713310158', () => {expect(part2('sample.txt')).toBe(2713310158)});
	});

	describe('Actual Data', () => {
		test('Part 1 the level of monkey business after 20 rounds should be 112221', () => {expect(part1('data.txt')).toBe(112221)});
		test('Part 2 the level of monkey business after 10000 rounds should be 25272176808', () => {expect(part2('data.txt')).toBe(25272176808)});
	});
});
