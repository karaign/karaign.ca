module.exports = function (eleventyConfig) {
	// Passthrough for static content
	eleventyConfig.addPassthroughCopy({
		"./public": "/"
	})
}
