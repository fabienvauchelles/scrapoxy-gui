/**
 * CONTROLLER: HomeController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('HomeController', HomeController);

    function HomeController($log, $scope, EventsService, ToastService) {
        $scope.$on('$destroy', function () {
            EventsService.stop();
        });

        EventsService
            .start()
            .then(function () {
                ToastService.success('GUI is connected.');
            })
            .catch(function (err) {
                $log.error(err);

                ToastService.error('Cannot connect to daemon.<br/>Please reload GUI.');
            })
    }

})();
