/**
 * Application configuration
 */

(function () {
    'use strict';


    angular
        .module('myApp', [
            'ngMessages',
            'ui.router',
            'restangular',
        ])
        .config(Config);

    function Config($urlRouterProvider) {
        // Default route
        $urlRouterProvider.otherwise('/');
    }

})();
