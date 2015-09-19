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
            templateUrl: 'app/home/instances/instance/instance.html',
        };

        return directive;


        ////////////

        /* @ngInject */
        function controllerFunc(InstancesCacheService, ToastService) {
            var vm = this;

            vm.kill = kill;
            vm.getCloudType = iconsHelper.getCloudType;
            vm.getStatus = iconsHelper.getStatus;
            vm.getAlive = iconsHelper.getAlive;


            ////////////

            function kill() {
                InstancesCacheService
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
