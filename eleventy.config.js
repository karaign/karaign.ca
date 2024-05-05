const sass = require("sass");
const path = require("node:path");

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

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsedPath.dir || ".",
					this.config.dir.includes,
					"node_modules/@picocss/pico/scss"
				]
			});
			return async (data) => result.css;
		}
	})


}
