const sass = require("sass");
const path = require("node:path");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
	// Passthrough for static content
	eleventyConfig.addPassthroughCopy({
		"./public": "/"
	})
	// enable sass
	eleventyConfig.addTemplateFormats("scss");
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		compile: async function (inputContent, inputPath) {
			let parsedPath = path.parse(inputPath);

			if (parsedPath.name.startsWith("_")) return;

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsedPath.dir || ".",
					this.config.dir.includes,
					"node_modules/@picocss/pico/scss"
				]
			});

			this.addDependencies(inputPath, result.loadedUrls);
			return async (data) => result.css;
		}
	})

	// filters
	eleventyConfig.addFilter("hrdate", (dateObj, fmt, tz) => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('LLLL d, y');
	})

	eleventyConfig.addFilter("isodate", (dateObj, fmt, tz) => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toISODate();
	})

}
