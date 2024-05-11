"use strict";

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
	eleventyConfig.addFilter("hrdate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('LLLL d, y');
	})

	eleventyConfig.addFilter("shortdate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('LLLL d');
	})

	eleventyConfig.addFilter("isodate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toISODate();
	})

	function tagLink(tag) {
		return `<a href="/category/${tag}">${tag}</a>`
	}

	eleventyConfig.addFilter("taglink", tagLink)

	eleventyConfig.addFilter("lstags", tags => {
		return tags.filter(t => t != "post").map(tagLink).join(", ");
	})

	eleventyConfig.addFilter("alltags", coll => {
		// this would be horrendously inefficient
		// if not for the fact that this is pre-rendered anyway
		return coll.reduce((tags, item) => {
			return tags.concat(item.data.tags.filter(
				t => tags.indexOf(t) == -1 && t != "post"
			))
		}, []);
	});

	eleventyConfig.addFilter("topn", (coll, n) => {
		if (coll.length <= n) {
			return coll;
		} else {
			return coll.slice(0, n);
		}
	})	

}
