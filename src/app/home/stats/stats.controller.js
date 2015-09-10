/**
 * CONTROLLER: StatsController
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .controller('StatsController', StatsController);

    function StatsController(StatsCacheService) {
        var vm = this;

        vm.stats = StatsCacheService.getStats();
    }

})();
