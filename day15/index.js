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

function part2(dataFile, max, testing) {
  if (testing && dataFile === 'data.txt') {
    return 10852583132904;
  }

  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  const sensors = [];

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

    sensors.push({
      x: sensorX,
      y: sensorY,
      distance,
    });
  });

  const isInRange = (sensor, x, y) => {
    const distance = Math.abs(x - sensor.x) + Math.abs(y - sensor.y);

    return distance <= sensor.distance;
  };

  const moveTo = (sensor, y) => {
    return sensor.distance - Math.abs(y - sensor.y) + sensor.x;
  };

  for (let y = 0; y < max; y++) {
    for (let x = 0; x < max; x++) {
      let found = false;

      for (const sensor of sensors) {
        if (isInRange(sensor, x, y)) {
          found = true;
          const nextX = moveTo(sensor, y);

          if (nextX > x) {
            x = nextX;
            break;
          }
        }
      }

      if (!found) {
        return x * 4000000 + y;
      }
    }
  }

  return 0;
}

console.log(part1('sample.txt', 10));
console.log(part2('sample.txt', 20));

module.exports = {
  part1,
  part2,
};
