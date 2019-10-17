#!/usr/bin/env node

const { resolve } = require('path');
const { prompt } = require('inquirer');
const exec = require('async-execute');
const exist = require('@does/exist');
require('colors');

const { argv: [ , , ...rest ] } = process;
process.on('unhandledRejection', console.error);

(async() => {
	const path = resolve('.', 'package.json');

	if (!(await exist(path))) {
		console.log(`Could not find package.json file at ${path.yellow}.`.red.bold);
		return;
	}

	const { scripts } = require(path);

	if (!scripts) {
		console.log('There are no scripts in this package.json file.'.bold);
		return;
	}

	const choices = Object.entries(scripts).map(
		([value, content]) => ({
			name: `${value.yellow.bold}: ${content}`,
			value,
		}),
	);

	const { script } = await prompt([{
		name: 'script',
		message: 'Select script to run',
		type: 'list',
		pageSize: '20',
		choices,
	}]);

	let args = rest.filter(Boolean).join(' ');

	args || ({ args } = await prompt([{
		name: 'args',
		message: '[optional] args string',
		type: 'input',
	}]));

	const command = [
		'npm',
		'run',
		`"${script}"`,
		args ? '--' : '',
		args,
	].filter(Boolean).join(' ');

	console.log(`Executing: ${command.bold}`);
	await exec(command, {pipe: true, exit: true});
})();
