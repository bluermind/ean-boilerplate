var fs = require('fs');
var pkgJSON = require('./../../package.json');
var repoUrl = pkgJSON.repository.url;

var deploy = require('./deploy.js');

console.log('Repo: ' + repoUrl);

function onPush( payload ) {
	var commit = payload.commits[0];
	var node = commit.node; //sha hash
	console.log("Commit " + node + " has just been pushed, ");
	deploy(node, repoUrl)

}

require('bitbucket-githook')(onPush, 9001, ['POST_HOOK_KEY'], 'AUTODEPLOY');


