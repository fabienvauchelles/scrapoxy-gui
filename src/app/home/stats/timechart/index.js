export default function Directive() {
    'ngInject';

    const directive = {
        restrict: 'E',
        scope: {},
        controller: Controller,
        controllerAs: 'vm',
        bindToController: {
            columns: '=',
            data: '=',
        },
        link: linkFunc,
    };

    return directive;


    ////////////

    function linkFunc($scope, element, attrs, ctrl) {
        element.css('display', 'block');

        const chart = c3.generate({
            bindto: element[0],
            data: {
                x: 'x',
                columns: [
                    ['x'],
                    [ctrl.columns.label1],
                    [ctrl.columns.label2],
                ],
                axes: {
                    data2: 'y2',
                },
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%H:%M:%S',
                    },
                },
                y: {
                    label: {
                        text: ctrl.label1,
                        position: 'outer-middle',
                    },
                },
                y2: {
                    show: true,
                    label: {
                        text: ctrl.label2,
                        position: 'outer-middle',
                    },
                },
            },
            transition: {
                duration: 0,
            },
        });

        $scope.$watchCollection(
            () => ctrl.data.getItems(),
            buildColumns
        );


        ////////////

        function buildColumns(data) {
            if (!data || data.length <= 0) {
                chart.unload({
                    ids: ['x', ctrl.columns.label1, ctrl.columns.label2],
                });
            }
            else {
                const columns = [
                    ['x'],
                    [ctrl.columns.label1],
                    [ctrl.columns.label2],
                ];

                data.forEach((d) => {
                    columns[0].push(moment(d.ts).toDate());

                    columns[1].push(d.label1);
                    columns[2].push(d.label2);
                });

                chart.load({
                    columns,
                });
            }
        }
    }
}


////////////

class Controller {
    constructor() {
        'ngInject';
    }
}
