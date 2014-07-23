var gith = require('gith').create( 9001 );
var fs = require('fs');
var pkgJSON = require('./../../package.json');

var repoUrl = pkgJSON.repository.url;
var repo = repoUrl.substring(19).split('.')[0];

var deploy = require('./deploy.js');

console.log('Watching repo: ' + repo);

function onNewTag( payload ) {
	console.log("Version " + payload.tag + " has just been pushed, ");
	deploy(payload.tag, repoUrl);
}

gith({
	repo: repo,
	branch: 'master'
}).on( 'tag:add', onNewTag);

