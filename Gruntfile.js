/* License: MIT.
 * Copyright (C) 2014, 2015, Gil Fink.
 */

'use strict';

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'ngConfig.js',
            ]
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: true
                },
                files: {
                    'ngConfig.min.js': 'ngConfig.js'
                }
            }
        },
        ngdocs: {
            options: {
                startPage: '/',
                title: false,
                html5Mode: false
            },
            api: {
                src: 'ngConfig.js',
                title: 'ngConfig API Documentation'
            }
        }
    });

    grunt.registerTask('test', [
        'jshint',
        'karma'
    ]);

    grunt.registerTask('build', [
        'jshint',
        'uglify'
    ]);

    grunt.registerTask('default', ['build']);
};