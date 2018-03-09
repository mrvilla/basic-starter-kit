/**
 * Created by enrique.cantillo on 08.03.18.
 */
module.exports = function (grunt) {

    // project & task config
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'public/css/styles.css': 'dev/sass/styles.scss'
                }
            }
        },

        browserify: {
            options: {
                transform: [
                    ['babelify', {
                        presets: [
                            'stage-0',
                            'stage-1',
                            ['env', {
                                targets: {
                                    browsers: ['last 2 versions', 'ie >= 11', 'iOS >= 10', 'Android >= 6']
                                },
                                // polyfills
                                useBuiltIns: false
                            }]
                        ]
                    }]
                ]
            },
            dev: {
                options: {
                    watch: true,
                    browserifyOptions: {
                        debug: true
                    }
                },
                files: {
                    "public/js/scripts-compiled.js": ["dev/scripts/scripts.js"]
                }
            },
            dist: {
                files: {
                    "public/js/scripts-compiled.js": ["dev/scripts/scripts.js"]
                }
            }
        },

        watch: {
            sass: {
                files: [
                    'dev/sass/*.scss'
                ],
                tasks: ['sass']
            }
        }
    });

    // simpler, loads all of the above tasks
    require('load-grunt-tasks')(grunt);

    // custom tasks
    grunt.registerTask('default', [
        'sass',
        'browserify:dev',
        'watch'
    ]);
};