// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

var pjson = require('../package.json');

module.exports = function(config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '../',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jspm', 'jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'test/unit/**/*.js'
		],
		jspm: {
			// Edit this to your needs
			loadFiles: ['public/main.js'],
			serveFiles: ['public/**', 'test/**/*.js'],
			config: "public/config.js",
			packages: "public/jspm_packages"
		},
		// list of files / patterns to exclude
		exclude: ['public/built/*.min.js'],
		proxies: {
			'/base': 'http://localhost:8067/public'
		},
		// web server port
		port: 8067,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,

		preprocessors: {},
		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['Chrome']
        //    browsers: ['Chrome','Safari','Firefox','Opera','ChromeCanary'],

	});
};
