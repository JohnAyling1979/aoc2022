const fs = require('fs');

function part1(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  const limit = 100000;

  let fileStructure = null;
  let fileStructurePointer = null;

  for (let index = 0; index < data.length; index++) {
    const line = data[index];
    const isCommand = line.startsWith('$ ');
    const isDirectory = line.startsWith('dir');

    if (isCommand) {
      if (line.includes('cd')) {
        const [, , to] = line.split(' ');
        if (to === '..') {
          fileStructurePointer = fileStructurePointer.parent;
        } else {
          if (
            !fileStructurePointer ||
            !fileStructurePointer.directories.includes(to)
          ) {
            const newDir = {
              name: to,
              size: 0,
              directories: [],
              files: [],
              parent: fileStructurePointer,
            };

            if (fileStructurePointer) {
              fileStructurePointer.directories.push(newDir);
            } else {
              fileStructure = newDir;
            }

            fileStructurePointer = newDir;
          }
        }
      }
    } else if (isDirectory) {
      // Do nothing
    } else {
      const [size, file] = line.split(' ');

      if (fileStructurePointer.files.includes(file)) {
        continue;
      }

      const sizeAsNumber = +size;

      fileStructurePointer.size += sizeAsNumber;
      fileStructurePointer.files.push(file);

      let traversePointer = fileStructurePointer.parent;
      while (traversePointer) {
        traversePointer.size += sizeAsNumber;

        traversePointer = traversePointer.parent;
      }
    }
  }

  const traverseTree = (pointer, sum) => {
    if (pointer) {
      pointer.directories.forEach(
        (directory) => (sum = traverseTree(directory, sum))
      );

      if (pointer.size <= limit) {
        sum += pointer.size;
      }
    }

    return sum;
  };

  return traverseTree(fileStructure, 0);
}

function part2(dataFile) {
  const data = fs
    .readFileSync(`${__dirname}/${dataFile}`, 'utf8')
    .split(/\r?\n/);

  const limit = 30000000;
  const max = 70000000;

  let fileStructure = null;
  let fileStructurePointer = null;

  for (let index = 0; index < data.length; index++) {
    const line = data[index];
    const isCommand = line.startsWith('$ ');
    const isDirectory = line.startsWith('dir');

    if (isCommand) {
      if (line.includes('cd')) {
        const [, , to] = line.split(' ');
        if (to === '..') {
          fileStructurePointer = fileStructurePointer.parent;
        } else {
          if (
            !fileStructurePointer ||
            !fileStructurePointer.directories.includes(to)
          ) {
            const newDir = {
              name: to,
              size: 0,
              directories: [],
              files: [],
              parent: fileStructurePointer,
            };

            if (fileStructurePointer) {
              fileStructurePointer.directories.push(newDir);
            } else {
              fileStructure = newDir;
            }

            fileStructurePointer = newDir;
          }
        }
      }
    } else if (isDirectory) {
      // Do nothing
    } else {
      const [size, file] = line.split(' ');

      if (fileStructurePointer.files.includes(file)) {
        continue;
      }

      const sizeAsNumber = +size;

      fileStructurePointer.size += sizeAsNumber;
      fileStructurePointer.files.push(file);

      let traversePointer = fileStructurePointer.parent;
      while (traversePointer) {
        traversePointer.size += sizeAsNumber;

        traversePointer = traversePointer.parent;
      }
    }
  }

  const canidates = [];

  const traverseTree = (pointer) => {
    if (pointer) {
      pointer.directories.forEach((directory) => traverseTree(directory));

      if (pointer.size >= limit - (max - fileStructure.size)) {
        canidates.push(pointer);
      }
    }
  };

  traverseTree(fileStructure);

  return canidates.sort((a, b) => a.size - b.size)[0].size;
}

module.exports = {
  part1,
  part2,
};
