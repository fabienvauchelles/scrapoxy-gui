/**
 * ROUTE: home.dashboard
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .config(Routing);

    function Routing($stateProvider) {
        $stateProvider
            .state('home.dashboard', {
                url: '/',
                data: {
                    requireAuth: true,
                },
                templateUrl: 'app/home/dashboard/dashboard.html',
                controller: 'DashboardController as vm'
            });
    }

})();
