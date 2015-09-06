/**
 * CONTROLLER: DashboardController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('DashboardController', DashboardController);

    function DashboardController($log, $scope, EventsService, ToastService) {
        $scope.$on('$destroy', function () {
            EventsService.stop();
        });

        EventsService
            .start()
            .then(function() {
                ToastService.success('GUI is connected.');
            })
            .catch(function (err) {
                $log.error(err);

                ToastService.error('Cannot connect to daemon.<br/>Please reload GUI.');
            })
    }

})();
