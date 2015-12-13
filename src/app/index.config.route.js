export default function config($urlRouterProvider) {
    'ngInject';

    // Default route
    $urlRouterProvider.otherwise(($injector) => {
        const $state = $injector.get('$state');

        $state.go('home.instances');
    });
}
