var gith = require('gith').create( 9001 );
var fs = require('fs');
var pkgJSON = require('./../../package.json');
var cp = require('child_process');
var child = cp.fork('./../../server.js');
var repo = pkgJSON.repository.url.substring(19).split('.')[0];

console.log('Repo: ' + repo);
fs.mkdirSync('./../../autodeploys/');

try {
    process.chdir('./../../autodeploys/');
}
catch (err) {
    console.log('chdir failed: ' + err);
}

function onNewTag( payload ) {
    console.log("Version " + payload.tag + " has just been pushed, ");

    fs.mkdir(payload.tag, function (err) {
        if (err) {
            console.error("Failed to create new dir " + payload.tag);
        } else {
            cp.exec('git clone git://github.com/' + repo + ' .', { cwd: './' + payload.tag + '/' }, function (err, stdout, stderr) {
                console.log('cloned');

                cp.exec('npm install', { cwd: './' + payload.tag + '/' }, function (err, stdout, stderr) {
                    if (err) {
                        console.error("Failed npm install for tag " + payload.tag + ' error: ' + err);
                    } else {
                        console.log('npm installed, restarting');
                        child.kill();
                        child = cp.fork('server.js', { cwd: './' + payload.tag + '/' });
                    }

                });
            });
        }
    });

}

gith({
    repo: repo,
    branch: 'master'
}).on( 'tag:add', onNewTag);


