export default function Directive() {
    'ngInject';

    const directive = {
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
        ngModel.$validators.scmin = (modelValue) => modelValue >= $scope.scmin;
        ngModel.$validators.scmax = (modelValue) => modelValue <= $scope.scmax;

        $scope.$watch('scmin', () => ngModel.$validate());

        $scope.$watch('scmax', () => ngModel.$validate());
    }
}
