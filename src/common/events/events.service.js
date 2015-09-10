/**
 * SERVICE: Events
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .factory('EventsService', EventsService);

    function EventsService($q, $rootScope) {
        var socket;

        var factory = {
            start: start,
            stop: stop,
        };

        return factory;


        ////////////

        function start(token) {
            //$log.debug('[EventService] start');

            return $q(function (resolve, reject) {
                if (!window.io) {
                    reject(new Error('Cannot find socket.io'));
                }

                try {
                    socket = io.connect('', {
                        path: '/api/socket.io',
                        query: 'token=' + token,
                        'force new connection': true,
                    });

                    socket.on('event', function (data) {
                        data = JSON.parse(data);

                        //$log.debug("[EventService] event '%s': ", data.event, data.payload);

                        $rootScope.$apply(function () {
                            $rootScope.$emit(data.event, data.payload);
                        });
                    });

                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            });
        }

        function stop() {
            //$log.debug('[EventService] stop');

            socket.disconnect();
        }
    }

})();



