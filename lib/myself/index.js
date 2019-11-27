const { bin } = require('../../package.json');

const executables = Object.keys(bin);

module.exports = executable => executables.includes(executable);
