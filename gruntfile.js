module.exports = function(grunt) {
    // Project Configuration
    var minifiedJSFile = '/built/<%= pkg.name %>-<%= pkg.version %>.min.js';
    var annJSFile = 'public/built/<%= pkg.name %>-<%= pkg.version %>.annotated.js';
    var pkgJSON = grunt.file.readJSON('package.json');
	//Load all NPM tasks
	require('load-grunt-tasks')(grunt);

    var env = grunt.option('env') || pkgJSON.env;

    var mainFile = 'public/main.js';

	var pathToCss = 'built/<%= pkg.name %>-<%= pkg.version %>.min.css';
	var debugBundlePath = '/built/<%= pkg.name %>.js';

	var gCfg = {
		pkg: pkgJSON,
		watch: {
			options: {
                interrupt: true,
                debounceDelay: 500,
				livereload: 35729
			},
			files: ['public/**/*.html', '!public/index.html', '!public/index_build_template.html'],
			JSSources: {
				files: ['public/**/*.js', '!public/built/**.*'],
				tasks: []
			},
			less: {
				files: 'public/**/*.less',
				tasks: ['less']
			},
			replace: {
				files: 'public/index_build_template.html',
                tasks: ['replace:' + env]
            },

            bower: {
                files: 'bower.json',
                tasks: []
            }
        },
        karma: {
            options: {
                configFile: './test/karma.conf.js'
            },
            unit: {
                autoWatch: false,
                singleRun: true
            },
            tdd: {
                autoWatch: true,
                singleRun: false
            }
        },
        replace: {
            production: {
                src: 'public/index.html',
                dest: 'public/index.html',
                replacements: [
                    {
                        from: '<script src="http://localhost:35729/livereload.js"></script>',
                        to: '<script src="build.js"></script>'
                    }
                ]
            }
        },
		ngtemplates:  {
			app:        {
				options:{
					module: 'ngTemplates',
					prefix: '/',
					standalone: true
				},
				cwd: 'public',
				src: ['templates/directives/**.html'],
				dest: 'public/built/ng-templates.js'
			}
		},
        connect: {
            proxyServer: {
                options: {
                    debug: true,
                    port: 8077,
                    base: 'public'
                }
            }
        },
        exec:{
            bundle:{
                cmd: 'jspm bundle main',
                cwd: './public'
            }
        },
        concurrent: {
            tdd: {
                tasks: ['tdd_karma', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }

    };

    // compile task end

	grunt.registerTask('test', [
		'ngtemplates',
		'connect:proxyServer',
		'karma:unit'
	]);
    grunt.registerTask('tdd_karma', [
		'ngtemplates',
        'connect:proxyServer',
		'karma:tdd'
	]);
    grunt.registerTask('tdd', ['concurrent:tdd']);
    //Making grunt default to force in order not to break the project.
//    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('bundle', [
        'replace',
        'exec:bundle'
    ]);

    if (env == 'production') {
        grunt.registerTask('default', ['bundle']);
        gCfg.watch.JSSources.tasks = ['bundle'];
    } else {
        grunt.registerTask('default', ['watch']);
    }

    grunt.initConfig(gCfg);

};
