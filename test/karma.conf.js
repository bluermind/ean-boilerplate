// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

var pjson = require('../package.json');

module.exports = function(config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '../',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			'public/built/*.js',
			'public/lib/angular-mocks/angular-mocks.js',
			'test/unit/**/*.js'
		],

		// list of files / patterns to exclude
		exclude: ['public/built/*.min.js'],

		// web server port
		port: 8066,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,

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
