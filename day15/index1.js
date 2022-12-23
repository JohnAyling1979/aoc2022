console.time('startEX');
const fs = require('fs');
const data = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

const goalRow = 2000000;
let minY = 0;
let maxY = 1;
let minX = 0;
let maxX = 1;

const log = () => {
  for (let y = minY; y < maxY + 1; y++) {
    let line = [];

    for (let x = minX; x < maxX; x++) {
      let character = '.';

      Object.values(sensors).forEach((sensor) => {
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

data.forEach((line) => {
  const [sensor, beacon] = line
    .replace('Sensor at ', '')
    .replace(' closest beacon is at ', '')
    .replaceAll('x=', '')
    .replaceAll(' y=', '')
    .split(':');

  const [sensorX, sensorY] = sensor.split(',').map((str) => +str);
  const [beaconX, beaconY] = beacon.split(',').map((str) => +str);

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
const locations = {};

for (let x = minX; x < maxX; x++) {
  const key = JSON.stringify({ x, y: goalRow });
  if (sensors[key] || beacons[key]) {
    continue;
  }

  Object.values(sensors).forEach((sensor) => {
    if (!locations[key] && isInRange(sensor, x, goalRow)) {
      locations[key] = true;
      count++;
    }
  });
}
console.log(count);
console.timeEnd('startEX');
