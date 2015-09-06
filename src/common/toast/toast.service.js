/**
 * SERVICE: Toast
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .factory('ToastService', ToastService);

    function ToastService() {
        toastr.options = {
            positionClass: 'toast-bottom-right',
        };

        var factory = {
            success: success,
            warning: warning,
            error: error,
        };

        return factory;


        ////////////

        function success(text) {
            toastr.success(text);
        }

        function warning(text) {
            toastr.warning(text);
        }

        function error(text) {
            toastr.error(text);
        }
    }

})();



