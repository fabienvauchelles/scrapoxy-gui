/**
 * DIRECTIVE: navbar
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .directive('navbar', navbar);

    function navbar() {
        var directive = {
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: controllerFunc,
            controllerAs: 'vm',
            templateUrl: 'app/home/navbar/navbar.html',
        };

        return directive;


        ////////////

        /* @ngInject */
        function controllerFunc($state, LoginService) {
            var vm = this;

            vm.logout = logout;


            ////////////

            function logout() {
                LoginService
                    .logout()
                    .then(function() {
                        $state.go('login');
                    });
            }
        }
    }

})();
