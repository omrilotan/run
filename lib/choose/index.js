const { prompt } = require('inquirer');
require('colors');
const myself = require('../myself');

module.exports = async function choose(pkg, { executables }) {
	const { scripts, 'scripts:descriptions': descriptions = {} } = pkg;

	if (!scripts) { return executables ? 'executables' : null; }

	const entries = Object.entries(scripts);

	if (!entries.length) { return executables ? 'executables' : null; }

	const choices = entries.map(
		choice.bind({descriptions}),
	).filter(
		Boolean,
	).concat(
		executables
			? [{
				name: `${'executables'.cyan.bold}: installed node modules executables`,
				value: 'executables',
			}]
			: [],
	);

	const { script } = await prompt(
		[{
			name: 'script',
			message: 'Select script to run',
			type: 'list',
			pageSize: '20',
			choices,
		}],
	);

	return script;
};

/**
 * Build choice
 * @param  {string} value   Name of the script
 * @param  {string} content Content of the script
 * @return {object?}
 */
function choice([value, content]) {
	const { descriptions } = this;

	if (myself(content)) {
		return;
	}

	if (descriptions[value] === null) {
		return;
	}

	if (descriptions[value]) {
		return {
			name: `${value.yellow.bold}: ${descriptions[value]}`,
			value,
		};
	}

	return {
		name: `${value.yellow.bold}: ${content}`,
		value,
	};
}
