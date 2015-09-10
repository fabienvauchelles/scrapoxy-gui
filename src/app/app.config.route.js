/**
 * CONFIG: Route
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .config(Config);

    function Config($urlRouterProvider) {
        // Default route
        $urlRouterProvider.otherwise(function($injector, $location) {
            var $state = $injector.get('$state');

            $state.go('home.instances');
        });
    }

})();
