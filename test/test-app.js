"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("stylus-boilerplate:app", function () {
	before(function (done) {
		helpers.run(path.join(__dirname, "../app"))
			.withOptions({skipInstall: true})
			.withPrompts({includeModernizr: false})
			.on("end", done);
	});

	it("creates config files", function () {
		assert.file([
			"bower.json",
			"package.json",
			".editorconfig",
			".jshintrc",
			".gitignore",
			".gitattributes"
		]);
	});

	it("creates browser config files", function () {
		assert.file([
			"favicon.ico",
			"tile.png",
			"tile-wide.png",
			"humans.txt",
			"apple-touch-icon-precomposed.png",
			".htaccess",
			"browserconfig.xml",
			"crossdomain.xml"
		]);
	});

	it("creates html pages", function () {
		assert.file([
			"index.html",
			"404.html"
		]);
	});

	it("creates main stylus file", function () {
		assert.file([
			"styles/app.styl",
			"styles/helpers/variables.styl",
			"styles/helpers/base.styl",
			"styles/helpers/kouto-config.styl",
			"components"
		]);
	});
});
