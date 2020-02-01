import Controller from './trafficmap.controller.js';

export default function route($stateProvider) {
    'ngInject';

    $stateProvider
        .state('home.trafficmap', {
            url: '/trafficmap',
            templateUrl: 'app/home/trafficmap/trafficmap.html',
            controller: Controller,
            controllerAs: 'vm',
        });
}
