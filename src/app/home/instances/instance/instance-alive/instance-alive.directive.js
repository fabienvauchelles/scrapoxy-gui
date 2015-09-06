/**
 * DIRECTIVE: instanceAlive
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .directive('instanceAlive', instanceAlive);

    function instanceAlive() {
        var directive = {
            restrict: 'E',
            scope: {},
            bindToController: {
                alive: '@',
            },
            controller: controllerFunc,
            controllerAs: 'vm',
            templateUrl: 'app/home/instances/instance/instance-alive/instance-alive.html',
        };

        return directive;


        ////////////

        /* @ngInject */
        function controllerFunc() {
            //var vm = this;
        }
    }

})();
