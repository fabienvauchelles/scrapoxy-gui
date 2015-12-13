import Controller from './instances.controller.js';

export default function route($stateProvider) {
    'ngInject';

    $stateProvider
        .state('home.instances', {
            url: '/instances',
            templateUrl: 'app/home/instances/instances.html',
            controller: Controller,
            controllerAs: 'vm',
        });
}
