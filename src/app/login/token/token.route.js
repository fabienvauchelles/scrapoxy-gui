/**
 * ROUTE: Token
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .run(TokenRouting);

    function TokenRouting($state, $rootScope, LoginService) {
        $rootScope.$on('$stateChangeStart', function (event, toState) {
            if (toState.name ==='login') {
                return;
            }

            var requireAuth = toState.data.requireAuth;
            if (!requireAuth) {
                return;
            }

            var token = LoginService.getToken();
            if (token) {
                return;
            }

            event.preventDefault();

            $state.go('login');
        });
    }
})();
