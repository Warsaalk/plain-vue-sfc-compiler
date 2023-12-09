import { compileSFCs } from '../index.js';

import { getArguments } from "../src/cliArguments.js";

const cliArguments = getArguments({
	source: "src/",
	destination: "dist/"
})

await compileSFCs(cliArguments.source, cliArguments.destination, {globalCssFile: 'dist/global.css', useRawTemplate: true});