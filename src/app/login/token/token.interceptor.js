/**
 * INTERCEPTOR: Token
 */


(function () {
    'use strict';


    angular
        .module('myApp')
        .config(Interceptor);

    function Interceptor($httpProvider) {
        $httpProvider.interceptors.push(interceptor);


        ////////////

        function interceptor($injector, $q) {
            var intcp = {
                'request': request,
                'responseError': responseError
            };

            return intcp;


            ////////////

            function request(config) {
                var LoginService = $injector.get('LoginService'),
                    token = LoginService.getToken();

                if (token) {
                    config.headers.Authorization = token;
                }

                return config;
            }

            function responseError(rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    var LoginService = $injector.get('LoginService'),
                        $state = $injector.get('$state');

                    // Force logout and redirect to login page
                    LoginService.logout()
                        .finally(function () {
                            $state.go('login');
                        });
                }

                return $q.reject(rejection);
            }
        }
    }

})();
