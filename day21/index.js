const fs = require('fs');
const nerdamer = require("nerdamer/all.min")

function part1(dataFile) {
    const data = fs.readFileSync(`${__dirname}/${dataFile}`, 'utf8').split(/\r?\n/);
    const monkeys = {};
    let done = true;

    do {
        done = true;

        for (let i = 0; i < data.length; i++) {
            const [monkey, say] = data[i].split(': ');
            if (monkeys.hasOwnProperty(monkey)) {
                continue;
            }

            if (!isNaN(+say)) {
                monkeys[monkey] = +say;
                continue;
            }

            const monkey1 = say.substring(0, 4);
            const sign = say.substring(5, 6);
            const monkey2 = say.substring(7);

            if (monkeys.hasOwnProperty(monkey1) && monkeys.hasOwnProperty(monkey2)) {
                monkeys[monkey] = eval(`${monkeys[monkey1]} ${sign} ${monkeys[monkey2]}`);
                continue;
            }

            done = false;
        }
    } while (!done);

    return monkeys['root'];
}

function part2(dataFile) {
    const data = fs.readFileSync(`${__dirname}/${dataFile}`, 'utf8').split(/\r?\n/);
    const monkeys = {};
    let done;

    do {
        done = true;

        for (let i = 0; i < data.length; i++) {
            const [monkey, say] = data[i].split(': ');
            if (monkeys.hasOwnProperty(monkey)) {
                continue;
            }

            if (monkey === 'humn') {
                monkeys['humn'] = 'x';
                continue;
            }

            if (!isNaN(+say)) {
                monkeys[monkey] = +say;
                continue;
            }

            const monkey1 = say.substring(0, 4);
            const sign = monkey === 'root' ? '=' : say.substring(5, 6);
            const monkey2 = say.substring(7);
            if (monkeys.hasOwnProperty(monkey1) && monkeys.hasOwnProperty(monkey2)) {
                if (!isNaN(monkeys[monkey1]) && !isNaN(monkeys[monkey2])) {
                    monkeys[monkey] = eval(`${monkeys[monkey1]} ${sign} ${monkeys[monkey2]}`);
                } else {
                    monkeys[monkey] = `${isNaN(monkeys[monkey1]) ? `(${monkeys[monkey1]})` : monkeys[monkey1]} ${sign} ${isNaN(monkeys[monkey2]) ? `(${monkeys[monkey2]})` : monkeys[monkey2]}`;
                }
                continue;
            }

            done = false;
        }
    } while (!done);

    return nerdamer.solve(monkeys['root'], 'x').text();
}




module.exports = {
    part1,
    part2
};
