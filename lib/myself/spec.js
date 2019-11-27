const { expect } = require('chai');
const myself = require('.');

describe('lib/myself', () => {
	it('Should recognise "run" commands', () => {
		[
			'run',
			'lets-run',
		].forEach(
			command => expect(myself(command), command).to.be.true,
		);
		expect(myself('run')).to.be.true;
	});
	it('Should recognise script with arguments', () => {
		[
			'run --',
			'run --color',
		].forEach(
			command => expect(myself(command), command).to.be.true,
		);
	});
	it('Should ignore other scripts', () => {
		[
			'runs',
			'running',
			'npm run',
			'rerun',
		].forEach(
			command => expect(myself(command), command).to.be.false,
		);
	});
});
