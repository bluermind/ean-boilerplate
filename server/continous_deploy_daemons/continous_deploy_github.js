var gith = require('gith').create( 9001 );
var fs = require('fs');
var pkgJSON = require('./../../package.json');
var cp = require('child_process');
var child = cp.fork('./server.js');
var repo = pkgJSON.repository.url.substring(19).split('.')[0];
var bower = require('bower');
var deploy = require('./deploy.js');

console.log('Repo: ' + repo);

function onNewTag( payload ) {
    console.log("Version " + payload.tag + " has just been pushed, ");
    deploy(payload.tag, 'git://github.com/' + repo);
}

gith({
    repo: repo,
    branch: 'master'
}).on( 'tag:add', onNewTag);


