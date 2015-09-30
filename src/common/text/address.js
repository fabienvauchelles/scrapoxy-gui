/**
 * FILTER: address
 */

(function() {
    'use strict';

    angular
        .module('myApp')
        .filter('address', filter);

    function filter() {
        return function(value) {
            if (!value || !value.hostname) {
                return 'no IP';
            }

            return value.hostname;
        };
    }

})();
