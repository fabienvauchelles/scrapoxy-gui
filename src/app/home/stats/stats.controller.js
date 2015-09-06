/**
 * CONTROLLER: StatsController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('StatsController', StatsController);

    function StatsController($rootScope, $scope) {
        var vm = this;

        // Config chart: Requests Time Average
        vm.dataTimeAverage = [];

        vm.configTimeAverage = {
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
        vm.dataFinished = [];

        vm.configFinished = {
            axis: {
                x: {
                    max_items: 50,
                },
                y: {
                    legend: 'count',
                },
            },
        };

        // Listen data changed
        var unwatchStats = $rootScope.$on('stats', updateStats);

        // Unwatch
        $scope.$on('$destroy', function() {
            unwatchStats();
        });


        ////////////

        function updateStats(ev, stats) {
            // Add data: Requests Time Average
            while (vm.dataTimeAverage.length > vm.configTimeAverage.axis.x.max_items) {
                vm.dataTimeAverage.shift();
            }

            vm.dataTimeAverage.push(stats.requests_time_average);

            // Add data: Requests Time Average
            while (vm.dataFinished.length > vm.configFinished.axis.x.max_items) {
                vm.dataFinished.shift();
            }

            vm.dataFinished.push(stats.requests_finished);
        }
    }

})();
