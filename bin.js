#!/usr/bin/env node

const { resolve } = require('path');
const exec = require('async-execute');
const exist = require('@does/exist');
require('colors');

const getCommand = require('./lib/getCommand');
const getArgs = require('./lib/getArgs');

const { argv: [ , , ...rest ] } = process;
process.on('unhandledRejection', console.error);

(async() => {
	const path = resolve('package.json');

	if (!(await exist(path))) {
		console.warn(`Could not find package.json file at ${path.yellow}.`.red.bold);
		return;
	}

	const command = await getCommand(require(path));
	const args = await getArgs(rest);

	const cmd = [
		command,
		args && !command.startsWith('/') ? '--' : '',
		args,
	].filter(Boolean).join(' ');

	console.log(`Executing: ${cmd.bold}`);
	await exec(cmd, {pipe: true, exit: true});
})();
