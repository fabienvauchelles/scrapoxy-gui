const app = angular.module('myApp.home.instances', [
    'ui.router',
]);


/*
 * Route
 */
import route from './instances.route';

app
    .config(route);


/*
 * Directives
 */
import InstanceDirective from './instance';
import ScalingValidatorDirective from './scaling/scaling.validator';

app
    .directive('instance', InstanceDirective)
    .directive('scalingValidator', ScalingValidatorDirective);


export default app;
