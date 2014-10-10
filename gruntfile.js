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
				livereload: 35729
			},
			files: ['public/**/*.html', '!public/index.html', '!public/index_build_template.html'],
			JSSources: {
				files: ['public/**/*.js', '!public/built/**.*'],
				tasks: []
			},
			less: {
				files: 'public/less/**/*.less',
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
                src: 'public/index_build_template.html',
                dest: 'public/index.html',
                replacements: [
                    {
                        from: '<script src="http://localhost:35729/livereload.js"></script>',
                        to: ''
                    },
					{
						from: '<-- bundlePath -->',
						to: minifiedJSFile
					}
                ]
            },
            development: {
                src: 'public/index_build_template.html',
                dest: 'public/index.html',
                replacements: [
					{
						from: '<-- bundlePath -->',
						to: debugBundlePath
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
		}
    };
    //compile task customization
    var steps = ['replace'];

    steps = steps.map(function (step) {
        return step + ':' + env;
    });
    if (env == 'production') {
        //steps.push('ngtemplates');
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
    grunt.registerTask('compile', steps);

    if (env == 'production') {
        grunt.registerTask('default', ['compile']);
        gCfg.watch.JSSources.tasks = ['compile'];
    } else {
        grunt.registerTask('default', ['compile', 'watch']);
    }

    grunt.initConfig(gCfg);

};
