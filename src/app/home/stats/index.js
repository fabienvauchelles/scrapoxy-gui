const app = angular.module('myApp.home.stats', [
    'ui.router',
]);


/*
 * Route
 */
import route from './stats.route';

app
    .config(route);


/*
 * Directives
 */
import TimechartDirective from './timechart';

app
    .directive('timechart', TimechartDirective);


export default app;
