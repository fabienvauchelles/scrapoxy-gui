export default function config($state, $rootScope, AuthService) {
    'ngInject';

    /*eslint angular/on-watch: 0*/
    $rootScope.$on('$stateChangeStart', (event, toState) => {
        if (toState.name === 'login') {
            return;
        }

        const requireAuth = toState.data.requireAuth;
        if (!requireAuth) {
            return;
        }

        const token = AuthService.getToken();
        if (token) {
            return;
        }

        event.preventDefault();

        $state.go('login');
    });
}
