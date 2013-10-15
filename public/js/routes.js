(function(exports){

    //application routing
    exports.routes = [
        { route:'/', resolve: {templateUrl:'/templates/root.html'}},
        { route:'/route', resolve: {templateUrl:'/templates/CREATE_NEW.html', reloadOnSearch: false}}

    ];

})(typeof exports === 'undefined'? this['routesModule']={}: exports);

