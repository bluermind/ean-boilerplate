
/**
 * Module dependencies.
 */
var logger = require('winston');

var pjson = require('./package.json');
var env = process.env.NODE_ENV = pjson.env || 'development';

var express = require('express');
var pathChecker = require('./server/path_checker.js');
var app = module.exports = express();

if (env === 'production') {
    app.use(require('prerender-node').set('prerenderServiceUrl', 'http://localhost:3000/'));
    app.use(require('compression')({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    require('./server/sitemap_from_routes')(app, 'http://localhost:8080');  //simple sitemap generated from angular routes definition
}

app.use(require('static-favicon')());
app.set('showStackError', true);

app.use(express.static('./public/'));
app.use(require('morgan')('dev'));

app.use(require('body-parser')()); 						// pull information from html in POST
app.use(require('method-override')()); 					// simulate DELETE and PUT

var port = process.env.PORT || pjson.port;
var server = app.listen(port, function () {
    app.get('/config.js', function(req, res) {
       res.sendFile('config.js', {root:'./'});  //JSPM config file for frontend
    });
    app.get('*', function(req, res){
        var pathName = req._parsedUrl.pathname;

        if(pathChecker(pathName)){
            res.sendfile('./public/index.html');
        } else {
            res.status(404);
            res.sendfile('./public/index.html');
        }

    });
    logger.info("Express server listening on port %d in %s mode", this.address().port, env);
});

