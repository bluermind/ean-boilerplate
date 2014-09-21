require('../lib/angular/angular');
require('../lib/angular-route/angular-route');

app = angular.module('app',
	[]
).config(
	function($locationProvider) {
		$locationProvider.html5Mode(true);  //Setting HTML5 Location Mode
		console.log("445f");
		debugger
	}
);

requireGlob('./controllers/*.js');
