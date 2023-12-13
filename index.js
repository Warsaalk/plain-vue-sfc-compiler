import fs from "fs";

import { minify } from "terser";

import { default as replace } from "replace-in-file";

import { parse, compileTemplate, compileScript, compileStyle, rewriteDefault } from '@vue/compiler-sfc';

import { getAllFiles } from "./src/fileSystem.js";

import idGenerator from "./src/idGenerator.js";

export async function compileSFCs (sourcePath, destinationPath, options) {
	const sourceFiles = getAllFiles(sourcePath, {filePattern: /.vue$/});

	if (fs.existsSync(destinationPath) === false) {
		fs.mkdirSync(destinationPath, {recursive: true});
	}

	for (const sourceFile of sourceFiles) {
		const
			fileId = idGenerator(),
			fileContents = fs.readFileSync(sourceFile),
			fileSourceRegex = sourcePath.replace(/^\.(\\\\|\/)/, '').replaceAll(/\//g, '(\\\\|\/)'), // Support both back & forward slashes
			filePath = sourceFile.replace(new RegExp(`^${fileSourceRegex}`), ''),
			filePathParts = filePath.split(/(?:\\|\/)/),
			fileName = filePathParts.pop(),
			fileDir = filePathParts.join('/') + "/";

		const sfcResult = parse(fileContents.toString());

		let templateCode = null, templateHTML = null;

		if (sfcResult.descriptor.template !== null) {
			({code: templateCode, source: templateHTML} = compileTemplate({
				id: fileId,
				filename: fileName,
				source: sfcResult.descriptor.template.content,
				scoped: true
			}));
		}

		const componentScript = compileScript(sfcResult.descriptor, {
			id: fileId,
			inlineTemplate: true,
			genDefaultAs: "_sfc_object"
		});

		const componentStyles = [];

		for (const style of sfcResult.descriptor.styles) {
			const compiledStyle = compileStyle({
				source: style.content,
				id: fileId,
				scoped: style.scoped === true,
				preprocessLang: style.lang ? style.lang : void 0
			});

			componentStyles.push({
				type: style.module ? "module" : (style.scoped ? "scoped" : "default"),
				code: compiledStyle.code
			});
		}

		let moduleCode = componentScript.content;

		if (componentScript.setup !== true) {
			if (options.useRawTemplate === true) {
				if (templateHTML) {
					moduleCode += `_sfc_object.template = \`${templateHTML}\``;
				}
			} else {
				if (templateCode) {
					moduleCode = `${templateCode}
${moduleCode}
_sfc_object.render = render;`
				}
			}
		}

		moduleCode = `${moduleCode}
export default _sfc_object;`;

		if (options.minify === true) {
			({ code: moduleCode } = await minify(moduleCode, {mangle: {toplevel: true}}));
		}

		const fullDestinationPath = `${destinationPath}${fileDir}`;

		if (fs.existsSync(fullDestinationPath) === false) {
			fs.mkdirSync(fullDestinationPath, {recursive: true});
		}

		fs.writeFileSync(`${fullDestinationPath}${fileName}.js`, moduleCode, {});

		if (options.globalCssFile !== void 0) {
			for (const style of componentStyles) {
				fs.writeFileSync(options.globalCssFile, style.code, {flag: "a"});
			}
		}
	}

	replace.replaceInFileSync({
		files: [`${destinationPath}**/*.js`, `${destinationPath}*.js`],
		from: /\.vue(?!\.js)/g,
		to: ".vue.js"
	});
}