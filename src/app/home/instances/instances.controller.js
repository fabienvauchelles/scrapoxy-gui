/**
 * CONTROLLER: InstancesController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('InstancesController', InstancesController);

    function InstancesController(InstancesCacheService, ScalingCacheService, ToastService) {
        var vm = this;

        // Instances
        vm.instances = [];

        // Scaling
        vm.updateScaling = updateScaling;

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
                });

            ScalingCacheService
                .getScaling()
                .then(function (scaling) {
                    vm.scaling = scaling;
                });
        }

        function updateScaling() {
            vm.scaling.min = Math.max(0, vm.scaling.min || 0);
            vm.scaling.required = Math.max(0, vm.scaling.required || 0);
            vm.scaling.max = Math.max(0, vm.scaling.max || 0);

            if (vm.scaling.min > vm.scaling.required) {
                vm.scaling.required = vm.scaling.min;
            }

            if (vm.scaling.max < vm.scaling.required) {
                vm.scaling.max = vm.scaling.required;
            }

            ScalingCacheService
                .updateScaling(vm.scaling)
                .catch(function (err) {
                    ToastService.error('Cannot update scaling: ' + err);
                });
        }
    }

})();
