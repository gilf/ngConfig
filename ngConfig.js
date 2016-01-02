(function (angular) {
    'use strict';

    var mod = angular.module('ngConfig', []);

    function ConfigurationService($http, configUri) {
        var configurationObject;

        function init() {
            configurationObject = {};
            return $http.get(configUri).then(function (response) {
                configurationObject = response.data;
            });
        }

        function getConfigByKey(key) {
            return configurationObject[key];
        }

        function setConfigOfKey(key, value) {
            configurationObject[key] = value;
        }

        function isInitialized() {
            return !angular.isUndefined(configurationObject);
        }

        return {
            init: init,
            isInitialized: isInitialized,
            getConfigByKey: getConfigByKey,
            setConfigOfKey: setConfigOfKey
        };
    }

    function ConfigurationProvider() {
        var configUri = 'config/config.json';

        this.setConfigUri = function(value) {
            configUri = value;
        };

        this.$get = ['$http', function($http) {
            return new ConfigurationService($http, configUri);
        }];
    }

    mod.provider('config', ConfigurationProvider);
}(window.angular));