import * as fs from 'fs';

import * as path from 'path';

/**
 *
 * @param {String} dir Path to get all the files from
 * @param {Object=} options
 * @param {RegExp=} options.filePattern
 * @param {Array=} fileList
 * @return {*[]}
 */
export function getAllFiles (dir, options, fileList = []) {
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const
			filePath = path.join(dir, file),
			stat = fs.statSync(filePath);

		if (stat.isDirectory())
			fileList = getAllFiles(filePath, options, fileList);
		else if (options.filePattern === void 0 || options.filePattern.test(filePath)) {
			fileList.push(filePath);
		}
	}

	return fileList;
}