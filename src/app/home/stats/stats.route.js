import Controller from './stats.controller.js';

export default function route($stateProvider) {
    'ngInject';

    $stateProvider
        .state('home.stats', {
            url: '/stats',
            templateUrl: 'app/home/stats/stats.html',
            controller: Controller,
            controllerAs: 'vm',
        });
}
