module.exports = function(grunt) {
    // Project Configuration
    var concatJSFile = 'public/built/<%= pkg.name %>-<%= pkg.version %>.js';
    var pkgJSON = grunt.file.readJSON('package.json');
    var env = pkgJSON.env;
    grunt.initConfig({
        pkg: pkgJSON,
        watch: {
            options: {
                livereload: true
            },
            files: ['public/**/*.html'],
            compile: {
                files: ['public/**/*.js', '!public/lib'],
                tasks: [] //TODO add tasks
            },
            less: {
                files: 'public/less/**/*.less',
                tasks: ['less:' + env]
            },
            replace: {
                files: 'src/resource/index.html',
                tasks: ['replace:indexMain']
            },
            manifest: {
                files: 'src/loadOrder.js',
                tasks: ['smg']
            },
            JSfileAddedDeleted: {
                files: 'src/js/**/*.js',
                tasks: ['smg'],
                options: {
                    event: ['added', 'deleted']
                }
            },
            bower: {
                files: 'bower.json',
                tasks: ['clean']
            }
        },
        cssmin: {

        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        uglify: {
            dist: {
                files: {
                    'public/built/<%= pkg.name %>-<%= pkg.version %>.min.js': concatJSFile
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
            dev: {
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
            dev: {
                src:  './public/less/bootstrap.less',
                dest: './public/built/<%= pkg.name %>-<%= pkg.version %>.css'
            }
        },
        nodemon: {
            production: {
                options: {
                    file: 'server.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 2,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });
    var compile = ['less', 'replace'];

    compile.forEach(function (step, i) {
       compile[i] = step + ':' + env;
    });

    //Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    //Making grunt default to force in order not to break the project.
//    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('compile', compile);

    //Test task.
    grunt.registerTask('test', ['mochaTest']);
};
