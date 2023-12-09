import fs from "fs";

import { compileSFCs } from '../index.js';

import { getArguments } from "../src/cliArguments.js";

const cliArguments = getArguments({
	source: "src/",
	destination: "dist/"
});

fs.rmSync(cliArguments.destination, {recursive: true, force: true});

await compileSFCs(cliArguments.source, cliArguments.destination, {globalCssFile: 'dist/global.css', useRawTemplate: false, minify: false});