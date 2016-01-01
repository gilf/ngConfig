(function (angular) {
    'use strict';

    function configurationService($http) {
        var configurationObject;

        function init() {
            configurationObject = {};
            return $http.get('config/config.json').then(function (response) {
                configurationObject = response.data;
            });
        }

        function getConfigByKey(key) {
            return configurationObject[key];
        }

        function isInitialized() {
            return !angular.isUndefined(configurationObject);
        }

        return {
            init: init,
            isInitialized: isInitialized,
            getConfigByKey: getConfigByKey
        };
    }

    angular.module('ngConfig').factory('config', configurationService);

    configurationService.$inject = ['$http'];
}(window.angular));