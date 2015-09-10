/**
 * CONTROLLER: StatsController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('StatsController', StatsController);

    function StatsController($scope, StatsCacheService) {
        var chart60 = createChart('#chart60'),
            chart3600 = createChart('#chart3600');

        StatsCacheService.addListener(updateStats);

        $scope.$on('$destroy', function () {
            StatsCacheService.removeListener(updateStats);
        });

        updateStats();


        /////////

        function createChart(doc) {
            return c3.generate({
                bindto: doc,
                data: {
                    x: 'x',
                    columns: buildColumns([]),
                    axes: {
                        data2: 'y2',
                    },
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%H:%M:%S'
                        }
                    },
                    y: {
                        label: {
                            text: 'Requests count',
                            position: 'outer-middle',
                        },
                    },
                    y2: {
                        show: true,
                        label: {
                            text: 'Requests delay (in seconds)',
                            position: 'outer-middle',
                        }
                    }
                },
                transition: {
                    duration: 0,
                }
            });
        }

        function updateStats() {
            chart60.load({
                columns: buildColumns(StatsCacheService.getStats(60)),
            });

            chart3600.load({
                columns: buildColumns(StatsCacheService.getStats(3600)),
            });
        }

        function buildColumns(stats) {
            var columns = [
                ['x'],
                ['Requests count'],
                ['Requests delay']
            ];

            stats.forEach(function (stat) {
                columns[0].push(stat.date);
                columns[1].push(stat.requests_finished);
                columns[2].push(stat.requests_time_average);
            });

            return columns;
        }
    }

})();
