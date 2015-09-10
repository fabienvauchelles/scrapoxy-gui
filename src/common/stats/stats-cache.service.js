/**
 * SERVICE: StatsCache
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .factory('StatsCacheService', StatsCacheService);

    function StatsCacheService($rootScope) {

        var max = 3600;

        var buffer,
            listeners = [];

        var unwatchStats;

        var factory = {
            stop: stop,
            getStats: getStats,
            addListener: addListener,
            removeListener: removeListener,
        };

        return factory;


        ////////////

        function stop() {
            if (unwatchStats) {
                unwatchStats();
                unwatchStats = void 0;
            }

            buffer = void 0;
        }

        function getStats(count) {
            if (!buffer) {
                buffer = [];

                unwatchStats = $rootScope.$on('stats', updateStats);
            }

            count = Math.min(count, max);

            return _.takeRight(buffer, count);


            ////////////

            function updateStats(ev, newstats) {
                while (buffer.length >= max) {
                    buffer.shift();
                }

                newstats.date = new Date();
                buffer.push(newstats);

                listeners.forEach(function (listener) {
                    listener(newstats);
                });
            }
        }

        function addListener(listener) {
            listeners.push(listener);
        }

        function removeListener(listener) {
            var idx = listeners.indexOf(listener);
            if (idx >= 0) {
                listeners.splice(idx, 1);
            }
        }
    }

})();



