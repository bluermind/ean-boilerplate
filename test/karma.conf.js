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
		files: [],
		jspm: {
			// Edit this to your needs
			loadFiles: [
				'public/jspm_packages/github/angular/bower-angular-mocks@1.3.0-rc.5/angular-mocks.js',
				'test/unit/**/*.js'
			],
			serveFiles: ['public/**'],
			config: "config.js",
			packages: "public/jspm_packages"
		},
		// list of files / patterns to exclude
		exclude: ['public/**/build.js'],
		proxies: {
			'/base/': 'http://localhost:8077/'
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
		browsers: ['PhantomJS']
        //    browsers: ['Chrome','Safari','Firefox','Opera','ChromeCanary'],

	});
};
