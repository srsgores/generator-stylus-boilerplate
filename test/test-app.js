"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("stylus-boilerplate:app", function () {
	before(function (done) {
		helpers.run(path.join(__dirname, "../app"))
			.withOptions({skipInstall: true})
			.withPrompts({someOption: true})
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

	it("creates the index html file", function () {
		assert.file([
			"index.html"
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
			"crossdomain.xml"
		]);
	});

	it("creates a 404", function () {
		assert.file([
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
