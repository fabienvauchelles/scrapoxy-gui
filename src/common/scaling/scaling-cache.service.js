/**
 * SERVICE: ScalingCache
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .factory('ScalingCacheService', ScalingCacheService);

    function ScalingCacheService($q, $rootScope, ScalingService, ToastService) {
        var scaling,
            scalingPromise;

        var unwatchScalingUpdated;


        var factory = {
            stop: stop,
            getScaling: getScaling,
            updateScaling: updateScaling,
        };

        return factory;


        ////////////

        function getScaling() {
            if (scaling) {
                return $q.when(scaling);
            }

            if (scalingPromise) {
                return scalingPromise;
            }

            scalingPromise = ScalingService
                .getScaling()
                .then(function(newscaling) {
                    scaling = newscaling;

                    unwatchScalingUpdated = $rootScope.$on('scaling:updated', scalingUpdated);

                    return scaling;
                });

            return scalingPromise;


            ////////////

            function scalingUpdated(ev, newscaling) {
                _.merge(scaling, newscaling);

                ToastService.success('Scaling updated.');
            }
        }

        function stop() {
            if (unwatchScalingUpdated) {
                unwatchScalingUpdated();
                unwatchScalingUpdated = void 0;
            }

            scaling = void 0;
            scalingPromise = void 0;
        }

        function updateScaling(newScaling) {
            return ScalingService.updateScaling(newScaling);
        }
    }

})();



