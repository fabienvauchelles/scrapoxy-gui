/**
 * CONTROLLER: StatsController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('StatsController', StatsController);

    function StatsController($rootScope, $scope, StatsService) {
        var vm = this;

        // Global
        vm.global = {};

        // Default scaling
        vm.scale = 60000;

        $scope.$watch('vm.scale', function (newscale) {
            loadScale(newscale);
        });

        // Charts
        vm.requests = {
            columns: {
                label1: 'Requests count',
                label2: 'Requests delay (in seconds)',
            },
            data: new timeWindowHelper.TimeWindow(vm.scale, 60, false, true),
        };

        vm.flow = {
            columns: {
                label1: 'KB received',
                label2: 'KB sent',
            },
            data: new timeWindowHelper.TimeWindow(vm.scale, 60, false, false),
        };

        // Live stats
        var unwatch = $rootScope.$on('stats', function (ev, d) {
            addData(d);
        });

        $scope.$on('$destroy', unwatch);


        ////////////

        function loadScale(scale) {
            StatsService
                .getAll(scale)
                .then(function (data) {
                    vm.requests.data.clear(scale);
                    vm.flow.data.clear(scale);

                    data.forEach(addData);
                });
        }

        function addData(data) {
            if (vm.requests.data) {
                vm.requests.data.add({
                    ts: data.ts,
                    label1: data.rq.count,
                    label2: data.rq.duration,
                });
            }

            if (vm.flow.data) {
                vm.flow.data.add({
                    ts: data.ts,
                    label1: b2kb(data.flow.bytes_received),
                    label2: b2kb(data.flow.bytes_sent),
                });
            }

            data.global.kbytes_received = b2kb(data.global.bytes_received);
            delete data.global.bytes_received;

            data.global.kbytes_sent = b2kb(data.global.bytes_sent);
            delete data.global.bytes_received;

            _.merge(vm.global, data.global);
        }

        function b2kb(v) {
            return Math.floor(v / 1024);
        }
    }

})();
