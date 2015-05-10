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
			"Welcome to the super " + chalk.red("StylusBoilerplate") + " generator!  We'll get you up and running with an actually decent project in just a few seconds..."
		));

		var prompts = [
			{
				name: "appname",
				message: "What's the name of your app/site?",
				"default": this.appname
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
				"default": 0,
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
				name: "useJade",
				"default": true,
				message: "Use jade instead of normal HTML?"
			},
			{
				type: "confirm",
				name: "useBuild",
				"default": true,
				message: "Would you like to minify/build your HTML, CSS, and scripts?"
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
				type: "list",
				name: "license",
				message: "What's the copyright license?",
				choices: [
					"MIT",
					"Copyright",
					"Apache License 2.0",
					"GNU General Public License 2.0",
					"Artistic License 2.0",
					"BSD 2-clause \"Simplified\" License",
					"BSD 3-clause \"New\" or \"Revisited\" License",
					"Creative Commons Zero 1.0 Universal",
					"Eclipse Public License 1.0",
					"Do What the Fuck You Want License (WTFPL)"
				],
				"default": "Do What the Fuck You Want License (WTFPL)"
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
			this.props.currentDate = new Date().getDate();
			this.props.currentYear = new Date().getYear();
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
		},

		htmlFiles: function() {
			if (this.props.useJade) {
				this.fs.copyTpl(
					this.templatePath("_index.jade"),
					this.destinationPath("index.jade"),
					this.props
				);
				this.fs.copyTpl(
					this.templatePath("_layout.jade"),
					this.destinationPath("layout.jade"),
					this.props
				);
				this.fs.copyTpl(
					this.templatePath("_404.jade"),
					this.destinationPath("404.jade"),
					this.props
				);
				this.fs.copy(this.templatePath("mixins"), this.destinationPath("mixins"));
			}
			else {
				this.fs.copyTpl(
					this.templatePath("_index.html"),
					this.destinationPath("index.html"),
					this.props
				);
				this.fs.copy(this.templatePath("404.html"), this.destinationPath("404.html"));
			}
		},

		stylusFiles: function() {
			this.fs.copyTpl(
				this.templatePath("styles/app.styl"),
				this.destinationPath("styles/app.styl"),
				this.props
			);
			this.fs.copy(
				this.templatePath("styles/helpers/*"),
				this.destinationPath("styles/helpers")
			);
			this.fs.copyTpl(
				this.templatePath("styles/components/*"),
				this.destinationPath("styles/components"),
				this.props
			);
			this.fs.copy(
				this.templatePath("styles/components/animations/**/*"),
				this.destinationPath("styles/components/animations")
			);
			this.fs.copyTpl(
				this.templatePath("styles/layout/*"),
				this.destinationPath("styles/layout"),
				this.props
			);
		}
	},

	install: function () {
		this.installDependencies();
	}
});
