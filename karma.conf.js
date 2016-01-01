/* License: MIT.
 * Copyright (C) 2015, Gil Fink.
 */

'use strict';

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        autoWatch: true,
        reporters: ['dots', 'coverage'],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'ngConfig.js',
            'tests.js'
        ],
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
        }
    });
};