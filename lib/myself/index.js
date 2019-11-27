const { bin } = require('../../package.json');

const pattern = new RegExp(`^(${Object.keys(bin).join('|')})(\\s|$)`);

module.exports = executable => pattern.test(executable);
