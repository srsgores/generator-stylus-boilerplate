"use strict";
var yeoman = require("yeoman-generator"),
	chalk = require("chalk"),
	yosay = require("yosay"),
	s = require("underscore.string");

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require("../package.json");
	},

	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			"Welcome to the super " + chalk.red("StylusBoilerplate") + " generator!"
		));

		var prompts = [
			{
				name: "appname",
				message: "What's the name of your app?",
				"default": this.appname
			},
			{
				type: "list",
				name: "script",
				"default": 1,
				message: "What would you like to write scripts with?",
				choices: [
					"JavaScript",
					"CoffeeScript"
				],
				filter: function (val) {
					var filterMap;
					filterMap = {
						JavaScript: "js",
						CoffeeScript: "coffee"
					};
					return filterMap[val];
				}
			},
			{
				type: "list",
				name: "markup",
				message: "What would you like to write markup with?",
				"default": 1,
				choices: [
					"HTML",
					"Jade"
				],
				filter: function (val) {
					return val.toLowerCase();
				}
			},
			{
				type: "list",
				name: "build",
				message: "Which build tool do you want to use?",
				"default": 1,
				choices: [
					"Gulp",
					"Grunt"
				],
				filter: function (val) {
					return val.toLowerCase();
				}
			},
			{
				type: "list",
				name: "testFramework",
				"default": 1,
				message: "Which testing framework do you want to use?",
				choices: [
					"Mocha",
					"Jasmine",
					"QUnit"
				],
				filter: function (val) {
					return val.toLowerCase();
				}
			},
			{
				type: "confirm",
				name: "includejQuery",
				"default": true,
				message: "Use jQuery?"
			},
			{
				type: "confirm",
				name: "includeModernizr",
				"default": true,
				message: "Use Modernizr?"
			},
			{
				name: "description",
				message: "Describe your app",
				"default": "A sample description"
			},
			{
				name: "authorName",
				message: "What's your name?",
				"default": "Author name"
			},
			{
				name: "authorEmail",
				message: "What's your e-mail?",
				"default": "email@somedomain.com"
			},
			{
				name: "authorURL",
				message: "What's your website?",
				"default": "somedomain.com"
			},
			{
				name: "license",
				message: "What's the copyright license?",
				"default": "MIT"
			}
		];

		this.prompt(prompts, function (props) {
			this.props = props;
			// To access props later use this.props.someOption;

			done();
		}.bind(this));
	},

	writing: {
		init: function() {
			this.props.sluggedAppName = s.slugify(this.appname);
			this.props.sluggedAuthorName = s.slugify(this.authorName);
			this.props.safeDescription = this.description.replace(/ /g, ", ");
		},
		configFiles: function () {
			console.dir(this);
			this.fs.copyTpl(
				this.templatePath("_package.json"),
				this.destinationPath("package.json"),
				this.props
			);
			this.fs.copyTpl(this.templatePath("_bower.json"), this.destinationPath("bower.json"), this.props);
			this.fs.copy(this.templatePath("gitattributes"), this.destinationPath(".gitattributes"));
			this.fs.copy(this.templatePath("gitignore"), this.destinationPath(".gitignore"));
		},

		browserFiles: function() {
			this.fs.copy(this.templatePath("robots.txt"), this.destinationPath("robots.txt"));
			this.fs.copy(this.templatePath("humans.txt"), this.destinationPath("humans.txt"));
			this.fs.copy(this.templatePath(".htaccess"), this.destinationPath(".htaccess"));
			this.fs.copy(this.templatePath("crossdomain.xml"), this.destinationPath("crossdomain.xml"));
			this.fs.copy(this.templatePath("browserconfig.xml"), this.destinationPath("browserconfig.xml"));
			this.fs.copy(this.templatePath("apple-touch-icon-precomposed.png"), this.destinationPath("apple-touch-icon-precomposed.png"));
			this.fs.copy(this.templatePath("favicon.ico"), this.destinationPath("favicon.ico"));
			this.fs.copy(this.templatePath("tile.png"), this.destinationPath("tile.png"));
			this.fs.copy(this.templatePath("tile-wide.png"), this.destinationPath("tile-wide.png"));
		},

		projectfiles: function () {
			this.fs.copy(
				this.templatePath("editorconfig"),
				this.destinationPath(".editorconfig")
			);
			this.fs.copy(
				this.templatePath("jshintrc"),
				this.destinationPath(".jshintrc")
			);
		}
	},

	install: function () {
		this.installDependencies();
	}
});
