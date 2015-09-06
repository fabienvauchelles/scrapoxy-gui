/**
 * DIRECTIVE: instanceType
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .directive('instanceType', instanceType);

    function instanceType() {
        var directive = {
            restrict: 'E',
            scope: {},
            bindToController: {
                type: '@',
            },
            controller: controllerFunc,
            controllerAs: 'vm',
            templateUrl: 'app/home/dashboard/instances/instance/instance-type/instance-type.html',
        };

        return directive;


        ////////////

        /* @ngInject */
        function controllerFunc() {
            //var vm = this;
        }
    }

})();
