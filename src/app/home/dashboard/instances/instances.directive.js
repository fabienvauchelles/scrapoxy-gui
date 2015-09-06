/**
 * DIRECTIVE: instances
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .directive('instances', instances);

    function instances() {
        var directive = {
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: controllerFunc,
            controllerAs: 'vm',
            templateUrl: 'app/home/dashboard/instances/instances.html',
        };

        return directive;


        ////////////

        /* @ngInject */
        function controllerFunc($rootScope, $scope, InstancesService, ScalingService, ToastService) {
            var vm = this;

            // Instances
            vm.instances = [];

            var unwatchStatusUpdated = $rootScope.$on('status:updated', instanceUpdated),
                unwatchAlivedUpdated = $rootScope.$on('alive:updated', instanceUpdated),
                unwatchScalingUpdated = $rootScope.$on('scaling:updated', scalingUpdated);


            // Scaling
            vm.updateScaling = updateScaling;

            vm.scaling = {
                min: 0,
                required: 0,
                max: 0,
            };

            // Unwatch
            $scope.$on('$destroy', function() {
                unwatchStatusUpdated();
                unwatchAlivedUpdated();
                unwatchScalingUpdated();
            });

            // Load datas
            load();


            ////////////

            function instanceUpdated(ev, instance) {
                var idx = _.findIndex(vm.instances, {content:{name: instance.name}});
                if (idx >= 0) {
                    if (instance.status === 'removed') {
                        vm.instances.splice(idx, 1);

                        ToastService.success('Instance ' + instance.name + ' removed.');
                    }
                    else {
                        vm.instances[idx].content = instance;
                    }
                }
                else {
                    if (instance.status !== 'removed') {
                        var container = {
                            content: instance,
                        };

                        vm.instances.push(container);

                        ToastService.success('Instance ' + instance.name + ' created.');
                    }
                }
            }

            function scalingUpdated(ev, newscaling) {
                vm.scaling = newscaling;

                ToastService.success('Scaling updated.');
            }

            function load() {
                InstancesService
                    .getAllInstances()
                    .then(function (instances) {
                        vm.instances = instances.map(function (d) {
                            return {
                                content: d,
                            };
                        });
                    });

                ScalingService
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

                ScalingService
                    .updateScaling(vm.scaling)
                    .catch(function(err) {
                        ToastService.error('Cannot update scaling: ' + err);
                    });
            }

            /*
             function addInstance() {
             ++vm.scaling.min;

             if (vm.scaling.min > vm.scaling.required) {
             vm.scaling.required = vm.scaling.min;
             }

             if (vm.scaling.required > vm.scaling.max) {
             vm.scaling.max = vm.scaling.required;
             }

             var payload = {
             instance: {
             scaling: vm.scaling,
             },
             };

             CommanderService
             .updateConfig(payload)
             .then(updateFromConfig)
             .then(function() {
             ToastService.success('Instance added.');
             })
             .catch(function(err) {
             ToastService.error(err);
             });
             }

             function removeInstance() {
             if (vm.scaling.max <= 0) {
             return;
             }

             --vm.scaling.max;

             if (vm.scaling.required > vm.scaling.max) {
             vm.scaling.required = vm.scaling.max;
             }

             if (vm.scaling.min > vm.scaling.required) {
             vm.scaling.min = vm.scaling.required;
             }

             var payload = {
             instance: {
             scaling: vm.scaling,
             },
             };

             CommanderService
             .updateConfig(payload)
             .then(updateFromConfig)
             .then(function() {
             ToastService.success('Instance removed.');
             })
             .catch(function(err) {
             ToastService.error(err);
             });
             }
             */
        }
    }

})();
