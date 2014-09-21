module.exports = function(grunt) {
    // Project Configuration
    var concatJSFile = 'public/built/<%= pkg.name %>-<%= pkg.version %>.js';
    var annJSFile = 'public/built/<%= pkg.name %>-<%= pkg.version %>.annotated.js';
    var pkgJSON = grunt.file.readJSON('package.json');
	//Load all NPM tasks
	require('load-grunt-tasks')(grunt);

    var env = grunt.option('env') || pkgJSON.env;

    var SM = require('./public/script-manifest.js');
    var mainFileName = 'main-' + env + '-<%= pkg.version %>.js';
    var appScripts = 'public/js/**/*.js';

    var gCfg = {
        pkg: pkgJSON,
		browserify: {
			development: {
				// A single entry point for our app
				src: 'public/js/main.js',
				// Compile to a single file to add a script tag for in your HTML
				dest: 'public/built/<%= pkg.name %>.js',

				options: {
					browserifyOptions: {
						debug: true
					},
					transform: ['require-globify']
				}
			}
		},
        watch: {
            options: {
                livereload: 35729
            },
            files: ['public/**/*.html', '!public/index.html', '!public/index_build_template.html'],
			JSSources: {
                files: [appScripts, '!public/lib'],
                tasks: ['browserify']
            },
            less: {
                files: 'public/less/**/*.less',
                tasks: ['less:' + env]
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
        smg:{   //generates main.js
            mainInit: {
                steps: SM[env],
                relativeTo: 'public',  // this path will be omitted from all url paths,
                dest: 'public/built/' + mainFileName
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
        concat: {
            app: {
                src: SM.concat,
                dest: concatJSFile
            }
        },
        ngAnnotate: {
            app: {
                src: concatJSFile,
                dest: annJSFile
            }
        },
        uglify: {
            dist: {
                files: {
                    'public/built/<%= pkg.name %>-<%= pkg.version %>.min.js': annJSFile
                }
            }
        },
        replace: {
            production: {
                src: 'public/index_build_template.html',
                dest: 'public/index.html',
                replacements: [
                    {
                        from: '<--built css-->',
                        to: '<%= pkg.name %>-<%= pkg.version %>.min.css'
                    },
                    {
                        from: '<script src="http://localhost:35729/livereload.js"></script>',
                        to: ''
                    }
                ]
            },
            development: {
                src: 'public/index_build_template.html',
                dest: 'public/index.html',
                replacements: [
                    {
                        from: '<--built css-->',
                        to: '<%= pkg.name %>-<%= pkg.version %>.css'
                    }
                ]
            }
        },
        less: {
            development: {
                src:  './public/less/bootstrap.less',
                dest: './public/built/<%= pkg.name %>-<%= pkg.version %>.css'
            },
            production: {
                options: {
                    compress: true,
                    yuicompress: true,
                    report: 'min'
                },
                src:  './public/less/bootstrap.less',
                dest: './public/built/<%= pkg.name %>-<%= pkg.version %>.min.css'
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
		}
    };
    //compile task customization
    var compile = ['less', 'replace', 'browserify'];

    compile = compile.map(function (step) {
        return step + ':' + env;
    });
    if (env == 'production') {
        compile = compile.concat(['concat', 'ngAnnotate', 'uglify'])
    }

    // compile task end

	grunt.registerTask('test', [
		'ngtemplates',
		'karma:unit'
	]);

    grunt.registerTask('tdd', [
		'ngtemplates',
		'karma:tdd'
	]);
    //Making grunt default to force in order not to break the project.
//    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('compile', compile);

    if (env == 'production') {
        grunt.registerTask('default', ['compile']);
        gCfg.watch.JSSources.tasks = ['compile'];
    } else {
        grunt.registerTask('default', ['compile', 'watch']);
    }

    grunt.initConfig(gCfg);

};
