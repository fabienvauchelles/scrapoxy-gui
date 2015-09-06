/**
 * ROUTE: home
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .config(Routing);

    function Routing($stateProvider) {
        $stateProvider
            .state('home', {
                abstract: true,
                url: '',
                data: {
                    requireAuth: true,
                },
                templateUrl: 'app/home/home.html',
                controller: 'HomeController as vm'
            });
    }

})();
