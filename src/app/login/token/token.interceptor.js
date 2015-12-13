export default function config($httpProvider) {
    'ngInject';

    $httpProvider.interceptors.push(interceptor);


    ////////////

    function interceptor($injector, $q) {
        'ngInject';

        const intcp = {
            request,
            responseError,
        };

        return intcp;


        ////////////

        function request(cfg) {
            const AuthService = $injector.get('AuthService'),
                token = AuthService.getToken();

            if (token) {
                cfg.headers.Authorization = token;
            }

            return cfg;
        }

        function responseError(rejection) {
            if (rejection.status === 401 || rejection.status === 403) {
                const AuthService = $injector.get('AuthService'),
                    $state = $injector.get('$state');

                // Force logout and redirect to login page
                AuthService
                    .logout()
                    .finally(() => $state.go('login'));
            }

            return $q.reject(rejection);
        }
    }
}
