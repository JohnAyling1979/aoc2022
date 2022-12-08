const fs = require('fs');
const data = fs.readFileSync('data.txt', 'utf8').split(/\r?\n/);

const limit = 100000

let fileStructure = null;
let fileStructurePointer = null;

for (let index = 0; index < data.length; index++) {
	const line = data[index];
	const isCommand = line.startsWith('$ ')
	const isDirectory = line.startsWith('dir');

	if (isCommand) {
		if (line.includes('cd')) {
			const [,,to] = line.split(' ');
			if (to === '..') {
				fileStructurePointer = fileStructurePointer.parent;
			} else {
				if (!fileStructurePointer || !fileStructurePointer.directories.includes(to)) {
					const newDir = {
						name: to,
						size: 0,
						directories: [],
						files: [],
						parent: fileStructurePointer,
					};

					if (fileStructurePointer) {
						fileStructurePointer.directories.push(newDir)
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
		pointer.directories.forEach(directory => sum = traverseTree(directory, sum));

		if (pointer.size <= limit) {
			sum += pointer.size;
		}
	}

	return sum;
}

console.log(traverseTree(fileStructure, 0));