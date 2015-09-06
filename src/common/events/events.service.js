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

        function start() {
            return new $q(function (resolve, reject) {
                if (!window.io) {
                    reject(new Error('Cannot find socket.io'));
                }

                try {
                    if (socket) {
                        socket.close();
                        socket = void 0;
                    }

                    socket = io.connect('', {path: '/api/socket.io'});

                    socket.on('event', function (data) {
                        var data = JSON.parse(data);

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
            if (!socket) {
                return;
            }

            socket.close();
            socket = void 0;
        }
    }

})();



