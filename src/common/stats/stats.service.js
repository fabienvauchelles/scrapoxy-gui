/**
 * SERVICE: Stats
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .factory('StatsService', StatsService);

    function StatsService(Restangular) {
        var BASE = Restangular.one('stats');

        var factory = {
            getAll: getAll,
        };

        return factory;


        ////////////

        function getAll(retention) {
            var qs = {};

            if (retention) {
                qs.retention = retention;
            };

            return BASE
                .get(qs)
                .then(function (data) {
                    return data.plain();
                });
        }
    }

})();



