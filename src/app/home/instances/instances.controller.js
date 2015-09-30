/**
 * CONTROLLER: InstancesController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('InstancesController', InstancesController);

    function InstancesController($log, $modal, InstancesCacheService, ScalingCacheService, ToastService) {
        var vm = this;

        // Instances
        vm.instances = [];

        // Scaling
        vm.openScalingModal = openScalingModal;

        vm.scaling = {
            min: 0,
            required: 0,
            max: 0,
        };

        // Load datas
        load();


        ////////////

        function load() {
            InstancesCacheService
                .getAllInstances()
                .then(function (instances) {
                    vm.instances = instances;
                })
                .catch(function (err) {
                    $log.error(err);
                    ToastService.error('Cannot load instances');
                });

            ScalingCacheService
                .getScaling()
                .then(function (scaling) {
                    vm.scaling = scaling;
                })
                .catch(function (err) {
                    $log.error(err);
                    ToastService.error('Cannot load scaling');
                });
        }

        function openScalingModal() {
            var modalInstance = $modal.open({
                templateUrl: 'app/home/instances/scaling/scaling.html',
                controller: 'InstancesScalingController',
                controllerAs: 'vm',
                animation: false,
                resolve: {
                    scaling: function () {
                        return _.cloneDeep(vm.scaling);
                    },
                },
            });

            modalInstance
                .result
                .then(function (scaling) {
                    ScalingCacheService
                        .updateScaling(scaling)
                        .catch(function (err) {
                            $log.error(err);
                            ToastService.error('Cannot update scaling: ' + err);
                        });
                });
        }
    }

})();
