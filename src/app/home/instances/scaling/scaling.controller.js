/**
 * CONTROLLER: InstancesScalingController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('InstancesScalingController', InstancesScalingController);

    function InstancesScalingController($modalInstance, scaling) {
        var vm = this;

        vm.scaling = scaling;

        vm.ok = ok;
        vm.cancel = cancel;


        ////////////

        function ok() {
            $modalInstance.close(vm.scaling);
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    }

})();
