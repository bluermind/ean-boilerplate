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
	var bundlePath = '/built/build.js';

	var gCfg = {
		pkg: pkgJSON,
        clean: ["public/built/build.js"],
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
				tasks: ['less:development']
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
        less: {
            development: {
                options: {
                    sourceMap: true,
                    sourceMapBasepath: 'public', // Sets sourcemap base path, defaults to current working directory.
                    sourceMapRootpath: '/' // adds this path onto the sourcemap filename and less file paths
                },
                src:  './public/less/bootstrap.less',
                dest: './public/built/all.css'
            },
            production: {
                options: {
                    compress: true,
                    yuicompress: true,
                    report: 'min'
                },
                src:  './public/less/bootstrap.less',
                dest: './public/built/all.gruntcss'
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
                cmd: 'jspm bundle main built/build.js',
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
        'exec:bundle'
    ]);

    if (env == 'production') {
        grunt.registerTask('default', ['less:production', 'bundle']);
        gCfg.watch.JSSources.tasks = ['bundle'];
    } else {
        grunt.registerTask('default', ['clean','less:development', 'watch']);
    }

    grunt.initConfig(gCfg);

};
