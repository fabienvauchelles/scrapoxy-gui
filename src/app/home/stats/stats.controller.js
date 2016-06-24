import TimeWindow from './time-window';


export default class Controller {
    constructor($rootScope, $scope, StatsService) {
        'ngInject';

        const self = this;

        // Global
        self.global = {};

        // Default scaling
        self.scale = 60000;

        $scope.$watch('vm.scale', (newScale) => loadScale(newScale));

        // Charts
        self.requests = {
            columns: {
                label1: 'Requests count',
                label2: 'Requests delay (in seconds)',
            },
            data: new TimeWindow(self.scale, 60, false, true),
        };

        self.flow = {
            columns: {
                label1: 'KB received',
                label2: 'KB sent',
            },
            data: new TimeWindow(self.scale, 60, false, false),
        };

        self.stop_order_count = {
            columns: {
                label1: 'Now',
                label2: 'Cumulated',
            },
            data: new TimeWindow(self.scale, 60, true, true),
        };

        // Live stats
        const unwatch = $rootScope.$on('stats', (ev, d) => addData(d));
        $scope.$on('$destroy', unwatch);


        ////////////

        function loadScale(scale) {
            StatsService
                .getAll(scale)
                .then((data) => {
                    self.requests.data.clear(scale);
                    self.flow.data.clear(scale);
                    self.stop_order_count.data.clear(scale);

                    data.forEach(addData);
                });
        }

        function addData(data) {
            if (self.requests.data) {
                self.requests.data.add({
                    ts: data.ts,
                    label1: data.rq.count,
                    label2: data.rq.duration,
                });
            }

            if (self.flow.data) {
                self.flow.data.add({
                    ts: data.ts,
                    label1: b2kb(data.flow.bytes_received),
                    label2: b2kb(data.flow.bytes_sent),
                });
            }

            if (self.stop_order_count.data) {
                self.stop_order_count.data.add({
                    ts: data.ts,
                    label1: data.stop_order_count.now,
                    label2: data.stop_order_count.total,
                });

                data.global.stop_order_count = data.stop_order_count.total;
            }

            data.global.kbytes_received = b2kb(data.global.bytes_received);
            delete data.global.bytes_received;

            data.global.kbytes_sent = b2kb(data.global.bytes_sent);
            delete data.global.bytes_received;

            _.merge(self.global, data.global);


            ////////////

            function b2kb(v) {
                return Math.floor(v / 1024);
            }
        }
    }
}
