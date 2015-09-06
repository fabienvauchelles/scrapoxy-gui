/**
 * DIRECTIVE: instance
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .directive('instance', instance);

    function instance() {
        var directive = {
            restrict: 'E',
            scope: {},
            bindToController: {
                container: '=',
            },
            controller: controllerFunc,
            controllerAs: 'vm',
            templateUrl: 'app/home/dashboard/instances/instance/instance.html',
        };

        return directive;


        ////////////

        /* @ngInject */
        function controllerFunc(InstancesService, ToastService) {
            var vm = this;

            vm.kill = kill;


            ////////////

            function kill() {
                InstancesService
                    .deleteInstance(vm.container.content.name)
                    .then(function () {
                        ToastService.success('Remove ' + vm.container.content.name + ' asked.');
                    })
                    .catch(function () {
                        ToastService.error('Cannot ask to remove ' + vm.container.content.name);
                    });
            }
        }
    }

})();
