var sm = require('sitemap');
var routesModule = require('../public/js/routes.js');

var sitemapUrls = [];
var addedStrings = [];
routesModule.routes.forEach(function(routeDefinition){
    var prefix = routeDefinition.route.split('/:')[0];

    if (prefix.length > 1 && addedStrings.indexOf(prefix) === -1) {
        sitemapUrls.push({url: prefix});
        addedStrings.push(prefix);
    }
});

/**
 *
 * @param {Object} app express app handle
 * @param {String} hostname, for example "https://www.google.com"
 */
module.exports = function (app, hostname) {
    var sitemap = sm.createSitemap ({
        hostname: hostname,
        cacheTime: 600000,  // 600 sec cache period
        urls: sitemapUrls
    });

    app.get('/sitemap.xml', function(req, res) {
        res.header('Content-Type', 'application/xml');
        res.send( sitemap.toString() );
    });

    return sitemap;
};