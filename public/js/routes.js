(function(exports){

    //application routing
    exports.routes = [
        { route:'/', resolve: {templateUrl:'templates/home.html'}},
        { route:'/login/success', resolve: {templateUrl:'/templates/loggedIn.html'}},
        { route:'/profile', resolve: {templateUrl:'/templates/profile.html'}},
        { route:'/pulls', resolve: {templateUrl:'/templates/pulls.html', reloadOnSearch: false}},
        { route:'/users', resolve: {templateUrl:'/templates/users.html', reloadOnSearch: false}},
        { route:'/repos', resolve: {templateUrl:'/templates/repos.html', reloadOnSearch: false}},
        { route:'/issues', resolve: {templateUrl:'/templates/issues.html', reloadOnSearch: false}}

    ];

})(typeof exports === 'undefined'? this['routesModule']={}: exports);

