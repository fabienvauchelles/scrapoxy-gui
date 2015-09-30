/**
 * DIRECTIVE: timechart
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .directive('timechart', timechart);

    function timechart() {
        var directive = {
            restrict: 'E',
            scope: {},
            bindToController: {
                columns: '=',
                data: '=',
            },
            controller: controllerFunc,
            controllerAs: 'vm',
            templateUrl: 'app/home/instances/instance/instance.html',
            link: linkFunc,
        };

        return directive;


        ////////////

        function linkFunc($scope, element, attrs, vm) {
            element.css('display', 'block');

            var chart = c3.generate({
                bindto: element[0],
                data: {
                    x: 'x',
                    columns: [
                        ['x'],
                        [vm.columns.label1],
                        [vm.columns.label2],
                    ],
                    axes: {
                        data2: 'y2',
                    },
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%H:%M:%S'
                        }
                    },
                    y: {
                        label: {
                            text: vm.label1,
                            position: 'outer-middle',
                        },
                    },
                    y2: {
                        show: true,
                        label: {
                            text: vm.label2,
                            position: 'outer-middle',
                        }
                    }
                },
                transition: {
                    duration: 0,
                }
            });

            $scope.$watchCollection(function () {
                return vm.data.getItems();
            }, buildColumns);


            ////////////

            function buildColumns(data) {
                if (!data || data.length <= 0) {
                    chart.unload({
                        ids: ['x', vm.columns.label1, vm.columns.label2],
                    });
                }
                else {
                    var columns = [
                        ['x'],
                        [vm.columns.label1],
                        [vm.columns.label2],
                    ];

                    data.forEach(function (d) {
                        columns[0].push(moment(d.ts).toDate());

                        columns[1].push(d.label1);
                        columns[2].push(d.label2);
                    });

                    chart.load({
                        columns: columns,
                    });
                }
            }
        }

        /* @ngInject */
        function controllerFunc() {
            //var vm = this;
        }
    }

})();
