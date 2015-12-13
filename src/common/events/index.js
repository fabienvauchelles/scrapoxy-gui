export default class Service {
    constructor($q, $log, $rootScope) {
        'ngInject';

        this.$q = $q;
        this.$log = $log;
        this.$rootScope = $rootScope;
    }


    start(token) {
        this.$log.debug('[EventService] start');

        return this.$q((resolve, reject) => {
            if (!window.io) {
                return reject(new Error('Cannot find socket.io'));
            }

            try {
                this._socket = window.io.connect('', {
                    path: '/socket.io',
                    query: `token=${encodeURIComponent(token)}`,
                    'force new connection': true,
                });

                this._socket.on('event', (data) => {
                    data = angular.fromJson(data);

                    this.$log.debug("[EventService] event '%s': ", data.event, data.payload);

                    this.$rootScope.$apply(
                        () => this.$rootScope.$emit(data.event, data.payload)
                    );
                });

                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }


    stop() {
        this.$log.debug('[EventService] stop');

        this._socket.disconnect();
    }
}
