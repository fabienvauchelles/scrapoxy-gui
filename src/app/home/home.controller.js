/**
 * CONTROLLER: HomeController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('HomeController', HomeController);

    function HomeController($log, $scope, EventsService, InstancesCacheService, LoginService, ScalingCacheService, ToastService) {
        $scope.$on('$destroy', function () {
            InstancesCacheService.stop();
            ScalingCacheService.stop();

            EventsService.stop();
        });

        EventsService
            .start(LoginService.getToken())
            .then(function () {
                ToastService.success('GUI is connected.');
            })
            .catch(function (err) {
                $log.error(err);

                ToastService.error('Cannot connect to daemon.<br/>Please reload GUI.');
            });

        // Cache data
        ScalingCacheService.getScaling();
        InstancesCacheService.getAllInstances();
    }

})();
