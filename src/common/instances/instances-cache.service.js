/**
 * SERVICE: InstancesCache
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .factory('InstancesCacheService', InstancesCacheService);

    function InstancesCacheService($q, $rootScope, InstancesService, ToastService) {
        var instances,
            instancesPromise;

        var unwatchStatusUpdated,
            unwatchAliveUpdated;

        var factory = {
            stop: stop,
            getAllInstances: getAllInstances,
            deleteInstance: deleteInstance,
        };

        return factory;


        ////////////

        function getAllInstances() {
            if (instances) {
                return $q.when(instances);
            }

            if (instancesPromise) {
                return instancesPromise;
            }

            instancesPromise = InstancesService
                .getAllInstances()
                .then(function (newinstances) {
                    instances = newinstances.map(function (d) {
                        return {
                            content: d,
                        };
                    });

                    unwatchStatusUpdated = $rootScope.$on('status:updated', instanceUpdated);
                    unwatchAliveUpdated = $rootScope.$on('alive:updated', instanceUpdated);

                    return instances;
                });

            return instancesPromise;


            ////////////

            function instanceUpdated(ev, instance) {
                var idx = _.findIndex(instances, {content: {name: instance.name}});
                if (idx >= 0) {
                    if (instance.status === 'removed') {
                        instances.splice(idx, 1);

                        ToastService.success('Instance ' + instance.name + ' removed.');
                    }
                    else {
                        instances[idx].content = instance;
                    }
                }
                else {
                    if (instance.status !== 'removed') {
                        var container = {
                            content: instance,
                        };

                        instances.push(container);

                        ToastService.success('Instance ' + instance.name + ' created.');
                    }
                }
            }
        }

        function stop() {
            if (unwatchStatusUpdated) {
                unwatchStatusUpdated();
                unwatchStatusUpdated = void 0;
            }

            if (unwatchAliveUpdated) {
                unwatchAliveUpdated();
                unwatchAliveUpdated = void 0;
            }

            instances = void 0;
            instancesPromise = void 0;
        }

        function deleteInstance(name) {
            return InstancesService.deleteInstance(name);
        }
    }

})();



