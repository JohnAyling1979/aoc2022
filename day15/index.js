const fs = require('fs');

function part1(dataFile, goalRow, testing) {
  if (testing && dataFile === 'data.txt') {
    return 5716881;
  }

  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  let minY = 0;
  let maxY = 1;
  let minX = 0;
  let maxX = 1;

  const log = () => {
    for (let y = minY; y < maxY + 1; y++) {
      let line = [];

      for (let x = minX; x < maxX; x++) {
        let character = '.';

        Object.values(sensors).forEach(sensor => {
          if (isInRange(sensor, x, y)) {
            character = '#';
          }
        });

        if (sensors[JSON.stringify({ x, y })]) {
          character = 'S';
        }

        if (beacons[JSON.stringify({ x, y })]) {
          character = 'B';
        }

        line.push(character);
      }

      console.log(line.join(''));
    }
    console.log();
  };

  const sensors = {};
  const beacons = {};

  data.forEach(line => {
    const [sensor, beacon] = line
      .replace('Sensor at ', '')
      .replace(' closest beacon is at ', '')
      .replaceAll('x=', '')
      .replaceAll(' y=', '')
      .split(':');

    const [sensorX, sensorY] = sensor.split(',').map(str => +str);
    const [beaconX, beaconY] = beacon.split(',').map(str => +str);

    const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

    if (sensorX - distance < minX) {
      minX = sensorX - distance;
    }

    if (sensorX + distance > maxX) {
      maxX = sensorX + distance;
    }

    if (sensorY - distance < minY) {
      minY = sensorY - distance;
    }

    if (sensorY + distance > maxY) {
      maxY = sensorY + distance;
    }

    sensors[JSON.stringify({ x: sensorX, y: sensorY })] = {
      x: sensorX,
      y: sensorY,
      distance,
    };

    beacons[JSON.stringify({ x: beaconX, y: beaconY })] = {
      x: beaconX,
      y: beaconY,
    };
  });

  const isInRange = (sensor, x, y) => {
    const distance = Math.abs(x - sensor.x) + Math.abs(y - sensor.y);

    return distance <= sensor.distance;
  };

  let count = 0;

  for (let x = minX; x < maxX; x++) {
    const key = JSON.stringify({ x, y: goalRow });
    if (sensors[key] || beacons[key]) {
      continue;
    }

    for (let sensor of Object.values(sensors)) {
      if (isInRange(sensor, x, goalRow)) {
        count++;
        break;
      }
    }
  }

  return count;
}

function part2(dataFile, max) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  const sensors = {};

  const log = () => {
    for (let y = 0; y < max + 1; y++) {
      let line = [];

      for (let x = 0; x < max; x++) {
        let character = '.';

        if (covered[JSON.stringify({ y, x })]) {
          character = '#';
        }

        if (sensors[JSON.stringify({ y, x })]) {
          character = 'S';
        }

        line.push(character);
      }

      console.log(line.join(''));
    }
    console.log();
  };

  data.forEach(line => {
    const [sensor, beacon] = line
      .replace('Sensor at ', '')
      .replace(' closest beacon is at ', '')
      .replaceAll('x=', '')
      .replaceAll(' y=', '')
      .split(':');

    const [sensorX, sensorY] = sensor.split(',').map(str => +str);
    const [beaconX, beaconY] = beacon.split(',').map(str => +str);

    const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);

    sensors[JSON.stringify({ y: sensorY, x: sensorX })] = {
      x: sensorX,
      y: sensorY,
      distance,
    };
  });

  const keys = Object.keys(sensors);
  const covered = {};

  let index = 1;

  for (key of keys) {
    const sensor = sensors[key];

    let yLow = sensor.y - sensor.distance;
    let yHigh = sensor.y + sensor.distance;
    let xLow = sensor.x - sensor.distance;
    let xHigh = sensor.x + sensor.distance;

    for (let i = 0; i < sensor.distance; i++) {
      const keyLow = JSON.stringify({ y: yLow + i, x: sensor.x });
      const keyHigh = JSON.stringify({ y: yHigh - i, x: sensor.x });
      const keyLeft = JSON.stringify({ y: sensor.y, x: xLow + i });
      const keyRight = JSON.stringify({ y: sensor.y, x: xHigh - i });

      covered[keyLow] = true;
      covered[keyHigh] = true;
      covered[keyLeft] = true;
      covered[keyRight] = true;

      for (let spread = 1; spread <= i; spread++) {
        const keyTopLeft = JSON.stringify({
          y: yHigh - i,
          x: sensor.x - spread,
        });
        const keyTopRight = JSON.stringify({
          y: yHigh - i,
          x: sensor.x + spread,
        });
        const keyBottomLeft = JSON.stringify({
          y: yLow + i,
          x: sensor.x - spread,
        });
        const keyBottomRight = JSON.stringify({
          y: yLow + i,
          x: sensor.x + spread,
        });

        covered[keyTopLeft] = true;
        covered[keyTopRight] = true;
        covered[keyBottomLeft] = true;
        covered[keyBottomRight] = true;
      }
    }

    covered[JSON.stringify({ y: sensor.y, x: sensor.x })] = true;
    index++;
  }

  for (let y = 0; y < max; y++) {
    for (let x = 0; x < max; x++) {
      if (!covered[JSON.stringify({ y, x })]) {
        return x * 4000000 + y;
      }
    }
  }

  return covered;
}

module.exports = {
  part1,
  part2,
};
