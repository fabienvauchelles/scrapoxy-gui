export default class Controller {
    constructor($log, $scope, EventsService, InstancesCacheService, AuthService, ScalingCacheService, ToastService) {
        'ngInject';

        $scope.$on('$destroy', () => {
            InstancesCacheService.stop();
            ScalingCacheService.stop();

            EventsService.stop();
        });

        EventsService
            .start(AuthService.getToken())
            .then(() => ToastService.success('GUI is connected.'))
            .catch((err) => {
                $log.error(err);

                ToastService.error('Cannot connect to daemon.<br/>Please reload GUI.');
            });

        // Cache data
        ScalingCacheService.getScaling();
        InstancesCacheService.getAllInstances();
    }
}
