/**
 * CONTROLLER: LoginController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('LoginController', LoginController);

    function LoginController($state, LoginService, ToastService) {
        var vm = this;

        vm.login = login;

        // Credentials
        vm.password = '';


        ////////////

        function login() {
            LoginService.login(vm.password)
                .then(function () {
                    $state.go('home.instances');
                })
                .catch(function () {
                    ToastService.error('Invalid password');
                });
        }
    }

})();
