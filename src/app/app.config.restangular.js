/**
 * CONFIG: Restangular
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .config(config);

    function config(RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');
    }

})();
