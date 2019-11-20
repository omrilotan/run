const { resolve } = require('path');
const { promises: { readdir, realpath } } = require('fs');
const { prompt } = require('inquirer');
const exist = require('@does/exist');
require('colors');
const choose = require('../choose');

module.exports = async function getCommand({scripts}) {
	const bins = resolve('.', 'node_modules', '.bin');
	const script = await choose(scripts, {
		executables: await exist(bins),
	});

	if (script === null) {
		console.log('No scripts or executables found'.bold);
		process.exit(0);
	}

	if (script !== 'executables') {
		return `npm run "${script}"`;
	}

	const files = (
		await readdir(bins)
	).filter(
		file => !file.startsWith('_'),
	);

	if (!files.length) {
		console.warn('There are no executable options.'.bold);
		return;
	}

	const choices = await Promise.all(files.map(choice));

	const { bin } = await prompt(
		[{
			name: 'bin',
			message: 'Select bin to run',
			type: 'list',
			pageSize: '20',
			choices,
		}],
	);

	return bin;
};

async function choice(file) {
	const value = await realpath(
		resolve('.', 'node_modules', '.bin', file),
	);

	return {
		name: file.yellow.bold,
		value,
	};
}
