/**
 * CONTROLLER: DashboardController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('DashboardController', DashboardController);

    function DashboardController($scope, EventsService) {
        $scope.$on('$destroy', function() {
            EventsService.stop();
        });

        EventsService.start();
    }

})();
