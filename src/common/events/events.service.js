/**
 * SERVICE: Events
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .factory('EventsService', EventsService);

    function EventsService($rootScope) {
        var socket;

        var factory = {
            start: start,
            stop: stop,
        };

        return factory;


        ////////////

        function start() {
            if (socket) {
                socket.close();
                socket = void 0;
            }

            socket = io.connect('', {path: '/api/socket.io'});

            socket.on('event', function(data){
                var data = JSON.parse(data);

                $rootScope.$apply(function() {
                    $rootScope.$emit(data.event, data.payload);
                });
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



