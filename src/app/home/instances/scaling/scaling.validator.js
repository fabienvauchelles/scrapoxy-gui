/**
 * DIRECTIVE: scaling validator
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .directive('scalingValidator', scalingValidator);

    function scalingValidator() {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                scmin: '=',
                scmax: '=',
            },
            link: linkFunc,
        };

        return directive;


        ////////////

        function linkFunc($scope, element, attrs, ngModel) {
            ngModel.$validators.scmin = scmin;
            ngModel.$validators.scmax = scmax;

            $scope.$watch('scmin', function () {
                ngModel.$validate();
            });

            $scope.$watch('scmax', function () {
                ngModel.$validate();
            });


            ////////////

            function scmin(modelValue) {
                return modelValue >= $scope.scmin;
            }

            function scmax(modelValue) {
                return modelValue <= $scope.scmax;
            }
        }
    }

})();
