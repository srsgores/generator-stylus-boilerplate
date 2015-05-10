"use strict";

var path = require("path");
var assert = require("yeoman-generator").assert;
var helpers = require("yeoman-generator").test;
var os = require("os");

describe("stylus-boilerplate:app", function () {
	before(function (done) {
		helpers.run(path.join(__dirname, "../app"))
			.withOptions({skipInstall: true})
			.withPrompts({useJade: true})
			.on("end", done);
	});
	it("Generates jade files when jade is enabled", function () {
		assert.file([
			"mixins",
			"layout.jade",
			"index.jade"
		]);
	});
});
