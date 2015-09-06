/**
 * SERVICE: LoginService
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .factory('LoginService', LoginService);

    function LoginService($q, $rootScope, Restangular) {
        var factory = {
            login: login,
            logout: logout,
            getToken: getToken,
        };

        return factory;


        ////////////

        function login(password) {
            return new $q(function(resolve, reject) {
                if (!password || password.length <= 0) {
                    return reject('Password is empty');
                }

                var hash = btoa(password);

                localStorage.setItem('token', hash);

                resolve();
            });
        }

        function getToken() {
            try {
                return localStorage.getItem('token');
            }
            catch (err) {
                return;
            }
        }

        function logout() {
            try {
                localStorage.removeItem('token');
            }
            catch (err) {
                // Ignore
            }
            finally {
                return $q.resolve();
            }
        }
    }
})();
