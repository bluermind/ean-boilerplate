String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
};


var routes = require('../public/routes.js');
var appRoutes = [];

routes.forEach(function(routeDefinition){
    if (routeDefinition.route === '/') {
        return;
    }

    var tokenArray = routeDefinition.route.split('/');
    if (tokenArray.length > 1) {
        var index = tokenArray.length;
        while (index--) {
            if (tokenArray[index][0] == ':' || tokenArray[index][0] === undefined) {  //variable token, discard it from route tokens array
                tokenArray.splice(index, 1);
            }
        }
        if (tokenArray.length > 1) {
            appRoutes.push(tokenArray);
        }
    }

});

/**
 *
 * @param {Array<String>} path
 * @param {Array<String>} route
 * @returns {boolean}
 */
var pathMatchesRoute = function (path, route) {
    var i = route.length;
    while(i--) {
        var token = route[i];
        if (path.indexOf(token) === -1) {
            return false;
        }
    }
    return true;
};

/**
 *
 * @param {String} path
 * @returns {Boolean} true when path is found in
 */
var pathIsValid = function(path){
    if(path === '/'){
        return true;
    }

    var pathArray = path.split('/');
    var index = appRoutes.length;

    while(index--) {
        var routeArray = appRoutes[index];

        if (pathMatchesRoute(pathArray, routeArray)) {
            return true;
        }
    }
    return false;
};

module.exports = pathIsValid;
