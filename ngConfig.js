(function (angular) {
    'use strict';

    var mod = angular.module('ngConfig', []);

    function ConfigurationInServerService($http, configUri) {
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

    function ConfigurationInLocalStorageService($q, localStorageKeyPrefix) {
        var configurationObject,
            lsKey = localStorageKeyPrefix + '-config';

        function init() {
            var deferred = $q.defer();
            configurationObject = JSON.parse(localStorage.getItem(lsKey));
            if (!configurationObject) {
                configurationObject = {};
                localStorage.setItem(lsKey, JSON.stringify({}));
            }
            deferred.resolve();
            return deferred.promise;
        }

        function getConfigByKey(key) {
            return configurationObject[key];
        }

        function setConfigOfKey(key, value) {
            configurationObject[key] = value;
            localStorage.setItem(lsKey, JSON.stringify(configurationObject));
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
        var configUri = 'config/config.json',
            useLocalStorage = false,
            prefix;

        this.useLocalStorageForConfig = function(appPrefix) {
            useLocalStorage = true;
            prefix = appPrefix;
        };


        this.setConfigUri = function(value) {
            configUri = value;
        };

        this.$get = ['$http', '$q', function($http, $q) {
            if (useLocalStorage) {
                return new ConfigurationInLocalStorageService($q, prefix);
            } else {
                return new ConfigurationInServerService($http, configUri);
            }
        }];
    }

    mod.provider('config', ConfigurationProvider);
}(window.angular));