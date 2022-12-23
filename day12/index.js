const fs = require('fs');
const Graph = require('./classes/Graph');

const letterMap = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
  S: 0,
  E: 25,
};

function part1(dataFile) {
  const input = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  const mapGraph = new Graph();
  const map = [];
  let pos = null;
  let end = null;

  input.forEach((line, y) => {
    map.push(
      line.split('').map((letter, x) => {
        if (letter === 'S') {
          pos = { x, y, height: letterMap[letter] };
        }

        if (letter === 'E') {
          end = { x, y, height: letterMap[letter] };
        }

        mapGraph.addNode(JSON.stringify({ x, y, height: letterMap[letter] }));

        return letterMap[letter];
      })
    );
  });

  map.forEach((row, y) => {
    row.forEach((height, x) => {
      const up = map[y - 1]?.[x];
      const down = map[y + 1]?.[x];
      const left = map[y]?.[x - 1];
      const right = map[y]?.[x + 1];

      if (!isNaN(up) && up <= height + 1) {
        mapGraph.addEdge(
          JSON.stringify({ x, y, height }),
          JSON.stringify({ x, y: y - 1, height: up }),
          1
        );
      }

      if (!isNaN(down) && down <= height + 1) {
        mapGraph.addEdge(
          JSON.stringify({ x, y, height }),
          JSON.stringify({ x, y: y + 1, height: down }),
          1
        );
      }

      if (!isNaN(left) && left <= height + 1) {
        mapGraph.addEdge(
          JSON.stringify({ x, y, height }),
          JSON.stringify({ x: x - 1, y, height: left }),
          1
        );
      }

      if (!isNaN(right) && right <= height + 1) {
        mapGraph.addEdge(
          JSON.stringify({ x, y, height }),
          JSON.stringify({ x: x + 1, y, height: right }),
          1
        );
      }
    });
  });

  return mapGraph.findPathWithDijkstra(JSON.stringify(pos), JSON.stringify(end))
    .length;
}

function part2(dataFile) {
  const input = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  let lowest = Infinity;

  const mapGraph = new Graph();
  const map = [];
  let poses = [];
  let end = null;

  input.forEach((line, y) => {
    map.push(
      line.split('').map((letter, x) => {
        if (letterMap[letter] === 0) {
          poses.push({ x, y, height: letterMap[letter] });
        }

        if (letter === 'E') {
          end = { x, y, height: letterMap[letter] };
        }

        mapGraph.addNode(JSON.stringify({ x, y, height: letterMap[letter] }));

        return letterMap[letter];
      })
    );
  });

  map.forEach((row, y) => {
    row.forEach((height, x) => {
      const up = map[y - 1]?.[x];
      const down = map[y + 1]?.[x];
      const left = map[y]?.[x - 1];
      const right = map[y]?.[x + 1];

      if (!isNaN(up) && up <= height + 1) {
        mapGraph.addEdge(
          JSON.stringify({ x, y, height }),
          JSON.stringify({ x, y: y - 1, height: up }),
          1
        );
      }

      if (!isNaN(down) && down <= height + 1) {
        mapGraph.addEdge(
          JSON.stringify({ x, y, height }),
          JSON.stringify({ x, y: y + 1, height: down }),
          1
        );
      }

      if (!isNaN(left) && left <= height + 1) {
        mapGraph.addEdge(
          JSON.stringify({ x, y, height }),
          JSON.stringify({ x: x - 1, y, height: left }),
          1
        );
      }

      if (!isNaN(right) && right <= height + 1) {
        mapGraph.addEdge(
          JSON.stringify({ x, y, height }),
          JSON.stringify({ x: x + 1, y, height: right }),
          1
        );
      }
    });
  });

  poses.forEach(pos => {
    const test = mapGraph.findPathWithDijkstra(
      JSON.stringify(pos),
      JSON.stringify(end)
    ).length;

    if (test < lowest) {
      lowest = test;
    }
  });

  return lowest;
}

module.exports = {
  part1,
  part2,
};
