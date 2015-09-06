/**
 * SERVICE: Scaling
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .factory('ScalingService', ScalingService);

    function ScalingService(Restangular) {
        var BASE = Restangular.one('scaling');

        var factory = {
            getScaling: getScaling,
            updateScaling: updateScaling,
        };

        return factory;


        ////////////

        function getScaling() {
            return BASE
                .get()
                .then(function (data) {
                    return data.plain();
                });
        }

        function updateScaling(newScaling) {
            return BASE
                .patch(newScaling)
                .then(function (data) {
                    if (!data) {
                        return newScaling;
                    }
                    else {
                        return data.plain();
                    }
                });
        }
    }

})();



