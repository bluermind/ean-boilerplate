window.app = angular.module('app',
    [
        'ngTouch',
        'angularMoment',
        'angularLocalStorage'
        // included, but by default not loaded, if you need it, just add it to script manifest
        // 'angular-gestures'
    ]
).config(
    function($locationProvider) {
        $locationProvider.html5Mode(true);  //Setting HTML5 Location Mode
    }
);

