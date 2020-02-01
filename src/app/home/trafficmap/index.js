const app = angular.module('myApp.home.trafficmap', [
    'ui.router',
]);


/*
 * Route
 */
import route from './trafficmap.route';

app
    .config(route);


/*
 * Directives
 */
import MapDirective from './map';

app
    .directive('map', MapDirective);


export default app;
