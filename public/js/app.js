module.exports = angular.module('app',
    [
        'ngRoute',
        'ngTouch',
        'angularMoment',
        'angularLocalStorage'
        // included, but by default not loaded, if you need it, just add it to script manifest
        // 'angular-gestures'
    ]
).config(
    function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);  //Setting HTML5 Location Mode

        require('../routes').forEach(function(routeDef){
            $routeProvider.when(routeDef.route, routeDef.resolve);
        });

        $routeProvider.otherwise({redirectTo:'/404'});
    }
).config(function ($compileProvider) {
    //$compileProvider.debugInfoEnabled(false);
});