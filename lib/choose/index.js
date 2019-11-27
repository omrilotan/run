const { prompt } = require('inquirer');
require('colors');

module.exports = async function choose(pkg, { executables }) {
	const { scripts, 'scripts:descriptions': descriptions = {} } = pkg;

	if (!scripts) { return executables ? 'executables' : null; }

	const entries = Object.entries(scripts);

	if (!entries.length) { return executables ? 'executables' : null; }

	const choices = entries.map(
		([value, content]) => ({
			name: `${value.yellow.bold}: ${descriptions[value] || content}`,
			value,
		}),
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
