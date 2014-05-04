var gith = require('gith').create( 9001 );
var fs = require('fs');
var pkgJSON = require('./../../package.json');
var cp = require('child_process');
var child = cp.fork('./server.js');
var repo = pkgJSON.repository.url.substring(19).split('.')[0];
var bower = require('bower');
var isWin = /^win/.test(process.platform);


console.log('Repo: ' + repo);
try{
    fs.mkdirSync('./../../autodeploys/');
}catch(e){

}

process.chdir('./../../autodeploys/');

function onNewTag( payload ) {
    console.log("Version " + payload.tag + " has just been pushed, ");

    fs.mkdir(payload.tag, function (err) {
        if (err) {
            console.error("Failed to create new dir " + payload.tag);
        } else {
            var cloneProcess = cp.spawn('git', ['clone', 'git://github.com/' + repo, '.'], { cwd: './' + payload.tag + '/' });
            cloneProcess.stdout.pipe(process.stdout);
            cloneProcess.stderr.pipe(process.stderr);

            cloneProcess.on('close', function (code) {
                console.log('child process exited with code ' + code);
                if (code === 0) {
                    console.log('cloned');

                    cp.exec('npm install', { cwd: './' + payload.tag + '/' }, function (err, stdout, stderr) {
                        if (err) {
                            console.error("Failed npm install for tag " + payload.tag + ' error: ' + err);
                        } else {
                            console.log('npm installed');

                            bower.commands
                                .install(null, {}, {interactive: false})
                                .on('end', function (installed) {
                                    console.log(installed);
                                    console.log('bower installed');

                                    var gruntCmd = 'grunt';
                                    if (isWin) {
                                        gruntCmd += '.cmd';
                                    }

                                    cp.exec(gruntCmd + ' --env=production', { cwd: './' + payload.tag + '/' }, function (err, stdout, stderr) {
                                        if (err) {
                                            console.error(err);
                                        } else {
                                            child.kill();
                                            child = cp.fork('server.js', { cwd: './' + payload.tag + '/' });
                                        }
                                    });

                                })
                                .on('error', function (err) {
                                    console.error('bower install error: ', err);
                                });

                        }

                    });
                } else {
                    console.error('cloning git repo failed, autodeploy for this tag is ignored');
                }
            });

        }
    });

}

gith({
    repo: repo,
    branch: 'master'
}).on( 'tag:add', onNewTag);


