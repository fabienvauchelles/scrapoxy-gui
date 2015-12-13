import Controller from './home.controller.js';

export default function route($stateProvider) {
    'ngInject';

    $stateProvider
        .state('home', {
            abstract: true,
            data: {
                requiredAuth: true,
            },
            url: '/home',
            templateUrl: 'app/home/home.html',
            controller: Controller,
            controllerAs: 'vm',
        });
}
