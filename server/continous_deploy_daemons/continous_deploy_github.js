var gith = require('gith');
var fs = require('fs');

var cp = require('child_process');
var child = cp.fork('./../../server.js');
var repo = 'capaj/ean-boilerplate';

try {
    process.chdir('./../../autodeploys/');
    console.log('Now in path: ' + process.cwd());
}
catch (err) {
    console.log('chdir: ' + err);
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
                        console.error("Failed npm install for tag " + payload.tag);

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

//gith({
//    repo: repo,
//    branch: 'master'
//}).on( 'tag:add', onNewTag);

setTimeout(function () {
    onNewTag({tag: '0.2.0'});
}, 10000);

