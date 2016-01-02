/* License: MIT.
 * Copyright (C) 2015, Gil Fink.
 */

/* global describe, inject, module, beforeEach, afterEach, it, expect, spyOn, jasmine */

'use strict';

describe('module ngConfig', function () {
    var $http, configSvr, configObj = {
        "config1": 15,
        "config2": false,
        "config3": "config3",
        "config4": [],
        "config5": {}
    };

    beforeEach(module('ngConfig'));

    beforeEach(inject(function ($httpBackend, config) {
        $http = $httpBackend;
        configSvr = config;

        $http.whenGET('config/config.json').respond(configObj);
    }));

    describe('config service ', function () {
        it('isInitialized should return false if the configuration object is not initialized', function () {
            expect(configSvr.isInitialized()).toBe(false);
        });

        it('isInitialized should return true if the configuration object was initialized', function() {
            configSvr.init().then(function() {
               expect(configSvr.isInitialized()).toBe(true);
            });

            $http.flush();
        });

        it('getConfigByKey should return relevant value for key', function() {
            configSvr.init().then(function() {
                expect(configSvr.getConfigByKey('config3')).toBe('config3');
            });

            $http.flush();
        });

        it('setConfigOfKey should set the value for the given key', function() {
            configSvr.init().then(function() {
                expect(configSvr.getConfigByKey('config3')).toBe('config3');

                configSvr.setConfigOfKey('config3', 'newValue');

                expect(configSvr.getConfigByKey('config3')).toBe('newValue');
            });

            $http.flush();
        });
    });
});
