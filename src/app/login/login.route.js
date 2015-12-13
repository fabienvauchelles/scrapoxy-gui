import Controller from './login.controller.js';

export default function route($stateProvider) {
    'ngInject';

    $stateProvider
        .state('login', {
            data: {
                requiredAuth: false,
            },
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: Controller,
            controllerAs: 'vm',
        });
}
