/**
 * SERVICE: Instances
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .factory('InstancesService', InstancesService);

    function InstancesService(Restangular) {
        var BASE = Restangular.all('instances');

        var factory = {
            getAllInstances: getAllInstances,
            deleteInstance: deleteInstance,
        };

        return factory;


        ////////////

        function getAllInstances() {
            return BASE.getList();
        }

        function deleteInstance(name) {
            var payload = {
                name: name,
            };

            return BASE
                .all('stop')
                .post(payload);
        }
    }

})();



