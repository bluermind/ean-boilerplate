var fs = require('fs');
var cp = require('child_process');
var child = cp.fork('./server.js');

var bower = require('bower');
var isWin = /^win/.test(process.platform);

try{
	fs.mkdirSync('./autodeploys/');
}catch(e){

}

process.chdir('./autodeploys/');
/**
 *
 * @param {String} dirName
 * @param {String} gitRepo
 */
module.exports = function deploy( dirName, gitRepo ) {
	fs.mkdir(dirName, function (err) {
		if (err) {
			console.error("Failed to create new dir " + dirName);
		} else {
			var cloneProcess = cp.spawn('git', ['clone', gitRepo, '.'], { cwd: './' + dirName + '/' });
			cloneProcess.stdout.pipe(process.stdout);
			cloneProcess.stderr.pipe(process.stderr);

			cloneProcess.on('close', function (code) {
				console.log('child process exited with code ' + code);
				if (code === 0) {
					console.log('cloned');

					cp.exec('npm install', { cwd: './' + dirName + '/' }, function (err, stdout, stderr) {
						if (err) {
							console.error("Failed npm install for tag " + dirName + ' error: ' + err);
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

									cp.exec(gruntCmd + ' --env=production', { cwd: './' + dirName + '/' }, function (err, stdout, stderr) {
										if (err) {
											console.error(err);
										} else {
											child.kill();
											child = cp.fork('server.js', { cwd: './' + dirName + '/' });
										}
									});

								})
								.on('error', function (err) {
									console.error('bower install error: ', err);
								});

						}

					});
				} else {
					console.error('cloning git repoUrl failed, autodeploy for this tag is ignored');
				}
			});

		}
	});

};