export default function Directive() {
    'ngInject';

    const directive = {
        restrict: 'E',
        scope: {},
        controller: Controller,
        controllerAs: 'vm',
        bindToController: {
            instances: '=',
            connexions: '=',
        },
        link: linkFunc,
    };

    return directive;


    ////////////

    function linkFunc($scope, element, attrs, ctrl) {
        element.css('display', 'block');

        const
            osm = new L.TileLayer(
                'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    minZoom: 1,
                    maxZoom: 12,
                }
            );

        const map = L.map(element[0], {
            center: [48.866667, 2.333333],
            zoom: 4,
            layers: [osm],
        });


        const group = new L.layerGroup();
        map.addLayer(group);

        /*
        var pointA = new L.LatLng( 51.5073509, -0.1277583);
        var pointB = new L.LatLng(48.866667, 2.333333);
        var pointList = [pointA, pointB];

        var firstpolyline = new L.Polyline(pointList, {
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1

        });

        var circle = new L.circle(pointA, {radius: 20000});


        const group = new L.layerGroup([firstpolyline, circle]);

        map.addLayer(group);
        */

        /*
        map.on('zoomend', function() {
            console.log('hello')
        });
        */


        $scope.$watchCollection(
            'vm.instances',
            buildInstances
        );


        /////////

        function buildInstances(instances) {
            group.clearLayers();

            const circles = new Map();
            _(instances)
                .filter((instance) => !!instance.content.latlng)
                .forEach((instance) => {
                    const key = `${instance.content.latlng[0]}:${instance.content.latlng[1]}`;
                    const circle = circles.get(key);
                    if (circle) {
                        ++circle.size;
                    }
                    else {
                        circles.set(key, {size: 1, instance});
                    }
                })
                .value();
            ;

            circles.forEach((circle) => {
                const c = new L.circle(
                    new L.LatLng(
                        circle.instance.content.latlng[0],
                        circle.instance.content.latlng[1]
                    ),
                    {radius: circle.size * 20000},
                );
                group.addLayer(c);
            });
        }
    }
}


////////////

class Controller {
    constructor() {
        'ngInject';
    }
}
