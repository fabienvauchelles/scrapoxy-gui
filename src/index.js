import home from './app/home';
import login from './app/login';

const app = angular.module('myApp', [
    'restangular',
    'ngMessages',
    'ui.router',
    'ui.bootstrap',
    home.name,
    login.name,
]);


/*
 * Configuration
 */
import logConfig from './app/index.config.log';
import routeConfig from './app/index.config.route';
import restangularConfig from './app/index.config.restangular';

app
    .config(logConfig)
    .config(routeConfig)
    .config(restangularConfig);


/*
 * Common
 */
import EventsService from './common/events';
import IconsService from './common/icons';
import InstancesService from './common/instances';
import InstancesCacheService from './common/instances/cache';
import ScalingService from './common/scaling';
import ScalingCacheService from './common/scaling/cache';
import StatsService from './common/stats';
import ToastService from './common/toast';

app
    .service('EventsService', EventsService)
    .service('IconsService', IconsService)
    .service('InstancesService', InstancesService)
    .service('InstancesCacheService', InstancesCacheService)
    .service('ScalingService', ScalingService)
    .service('ScalingCacheService', ScalingCacheService)
    .service('StatsService', StatsService)
    .service('ToastService', ToastService);


/*
 * Filters
 */
import addressFilter from './common/text/address';

app
    .filter('address', addressFilter);
