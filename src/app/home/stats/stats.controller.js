/**
 * CONTROLLER: StatsController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('StatsController', StatsController);

    function StatsController($scope, StatsCacheService) {
        var req_chart60 = createChartRequests('#req_chart60'),
            req_chart3600 = createChartRequests('#req_chart3600'),
            flow_chat60 = createChartFlow('#flow_chart60')

        StatsCacheService.addListener(updateStats);

        $scope.$on('$destroy', function () {
            StatsCacheService.removeListener(updateStats);
        });

        updateStats();


        /////////

        function createChartRequests(doc) {
            return c3.generate({
                bindto: doc,
                data: {
                    x: 'x',
                    columns: buildColumnsRequests([]),
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

        function createChartFlow(doc) {
            return c3.generate({
                bindto: doc,
                data: {
                    x: 'x',
                    columns: buildColumnsFlow([]),
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
                            text: 'KB received',
                            position: 'outer-middle',
                        },
                    },
                    y2: {
                        show: true,
                        label: {
                            text: 'KB sent',
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
            req_chart60.load({
                columns: buildColumnsRequests(StatsCacheService.getStats(60)),
            });

            req_chart3600.load({
                columns: buildColumnsRequests(StatsCacheService.getStats(3600)),
            });

            flow_chat60.load({
                columns: buildColumnsFlow(StatsCacheService.getStats(60)),
            });
        }

        function buildColumnsRequests(stats) {
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

        function buildColumnsFlow(stats) {
            var columns = [
                ['x'],
                ['KB received'],
                ['KB sent'],
            ];

            stats.forEach(function (stat) {
                columns[0].push(stat.date);
                columns[1].push(stat.kbytes_received);
                columns[2].push(stat.kbytes_sent);
            });

            return columns;
        }
    }

})();
