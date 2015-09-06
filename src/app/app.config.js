/**
 * CONFIG: Global parameters
 */

(function () {
    'use strict';


    var parameters = {
        transporter: 'idtgv',
        comform_title: 'iDTGV',
    };

    angular
        .module('myApp')
        .value('GlobalParameters', parameters);
})();
