/**
 * ROUTE: home.stats
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .config(Routing);

    function Routing($stateProvider) {
        $stateProvider
            .state('home.stats', {
                url: '/stats',
                templateUrl: 'app/home/stats/stats.html',
                controller: 'StatsController as vm'
            });
    }

})();
