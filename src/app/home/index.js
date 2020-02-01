import instances from './instances';
import stats from './stats';
import trafficmap from './trafficmap';

const app = angular.module('myApp.home', [
    'ui.router',
    instances.name,
    stats.name,
    trafficmap.name,
]);


/*
 * Route
 */
import route from './home.route';

app
    .config(route);


/*
 * Directives
 */
import NavbarDirective from './navbar';

app
    .directive('navbar', NavbarDirective);


export default app;
