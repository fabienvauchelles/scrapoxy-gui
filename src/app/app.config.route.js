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
        $urlRouterProvider.otherwise('/instances');
    }

})();
