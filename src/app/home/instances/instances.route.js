/**
 * ROUTE: home.instances
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .config(Routing);

    function Routing($stateProvider) {
        $stateProvider
            .state('home.instances', {
                url: '/instances',
                templateUrl: 'app/home/instances/instances.html',
                controller: 'InstancesController as vm'
            });
    }

})();
