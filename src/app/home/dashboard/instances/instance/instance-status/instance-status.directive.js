/**
 * DIRECTIVE: instanceStatus
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .directive('instanceStatus', instanceStatus);

    function instanceStatus() {
        var directive = {
            restrict: 'E',
            scope: {},
            bindToController: {
                status: '@',
            },
            controller: controllerFunc,
            controllerAs: 'vm',
            templateUrl: 'app/home/dashboard/instances/instance/instance-status/instance-status.html',
        };

        return directive;


        ////////////

        /* @ngInject */
        function controllerFunc() {
            //var vm = this;
        }
    }

})();
