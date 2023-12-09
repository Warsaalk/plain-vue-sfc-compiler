import minimist from 'minimist';

/**
 *
 * @param {Object} defaults
 * @returns {*|{_: []}}
 */
export function getArguments (defaults)
{
	const args = minimist(process.argv.slice(2));

	for (const defaultParameter in defaults) {
		if (args[defaultParameter] === void 0) {
			args[defaultParameter] = defaults[defaultParameter];
		}
	}

	return args;
}