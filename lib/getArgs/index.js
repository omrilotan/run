const { prompt } = require('inquirer');

module.exports = async function getArgs(rest) {
	let args = rest.filter(Boolean).join(' ');

	args || ({ args } = await prompt([{
		name: 'args',
		message: '[optional] args string',
		type: 'input',
	}]));

	return args;
};
