/**
 * SERVICE: StatsCache
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .factory('StatsCacheService', StatsCacheService);

    function StatsCacheService($rootScope) {
        var stats;

        var unwatchStats;

        var configTimeAverage = {
            axis: {
                x: {
                    max_items: 50,
                },
                y: {
                    legend: 'secs',
                },
            },
        };

        // Config chart: Requests Finished
        var configFinished = {
            axis: {
                x: {
                    max_items: 50,
                },
                y: {
                    legend: 'count',
                },
            },
        };

        var factory = {
            stop: stop,
            getStats: getStats,
        };

        return factory;


        ////////////

        function getStats() {
            if (!stats) {
                stats = {
                    timeAverage: {
                        config: configTimeAverage,
                        data: [],
                    },
                    finished: {
                        config: configFinished,
                        data: [],
                    },
                };

                unwatchStats = $rootScope.$on('stats', updateStats);
            }

            return stats;


            ////////////

            function updateStats(ev, newstats) {
                // Add data: Requests Time Average
                while (stats.timeAverage.data.length > configTimeAverage.axis.x.max_items) {
                    stats.timeAverage.data.shift();
                }

                stats.timeAverage.data.push(newstats.requests_time_average);

                // Add data: Requests Time Average
                while (stats.finished.data.length > configFinished.axis.x.max_items) {
                    stats.finished.data.shift();
                }

                stats.finished.data.push(newstats.requests_finished);
            }
        }

        function stop() {
            if (unwatchStats) {
                unwatchStats();
                unwatchStats = void 0;
            }

            stats = void 0;
        }
    }

})();



