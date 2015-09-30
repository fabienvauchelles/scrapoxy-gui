/**
 * CONFIG: Restangular
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .config(config);

    function config(RestangularProvider) {
        //RestangularProvider.setBaseUrl('/api/api'); // DEV mode
        RestangularProvider.setBaseUrl('/api'); // PROD mode
    }

})();
