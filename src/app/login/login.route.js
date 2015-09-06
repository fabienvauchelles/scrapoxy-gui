/**
 * ROUTE: login
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .config(Routing);

    function Routing($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                data: {
                    requireAuth: false,
                },
                templateUrl: 'app/login/login.html',
                controller: 'LoginController as vm'
            });
    }

})();
