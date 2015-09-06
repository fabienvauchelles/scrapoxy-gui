/**
 * DIRECTIVE: linechart
 */

(function () {
    'use strict';


    angular
        .module('myApp')
        .directive('linechart', linechart);

    function linechart() {
        var directive = {
            restrict: 'E',
            scope: {},
            bindToController: {
                config: '=',
                data: '=',
            },
            controller: controllerFunc,
            controllerAs: 'vm',
            link: linkFunc,
        };

        return directive;


        ////////////

        function linkFunc(scope, element, attrs, vm) {
            element.addClass('linechart');

            var margin = {top: 20, right: 50, bottom: 30, left: 50},
                width = parseInt(d3.select(element[0]).style('width'), 10),
                width = width - margin.left - margin.right,
                height = 300 - margin.top - margin.bottom;


            // Create container
            var svg = d3
                .select(element[0])
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg
                .append('defs')
                .append('clipPath')
                .attr('id', 'clip')
                .append('rect')
                .attr('width', width)
                .attr('height', height);

            // Create X axis
            var x = d3.scale.linear()
                .range([0, width])
                .domain([0, vm.config.axis.x.max_items - 1]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .tickFormat("")
                .ticks(10);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Create Y axis
            var y = d3.scale.linear()
                .range([height, 0])
                .domain(d3.extent(vm.data));

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(8);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(vm.config.axis.y.legend);

            // Create line
            var line = d3.svg.line()
                .x(function(d, i) { return x(i); })
                .y(function(d) { return y(d); });

            var path = svg
                .append('g')
                .attr('clip-path', 'url(#clip)')
                .append("path")
                .datum(vm.data)
                .attr("class", "line")
                .attr("d", line);

            // Watch data changes
            scope.$watchCollection('vm.data', dataUpdated);

            // Watch resize
            window.addEventListener('resize', resize);


            ////////////

            function dataUpdated() {
                y.domain(d3.extent(vm.data));

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

                svg
                    .selectAll(".y.axis")
                    .call(yAxis);

                path
                    .attr("d", line);

                if (vm.data.length > vm.config.axis.x.max_items) {
                    path
                        .attr('transform', 'translate(' + x(-1) + ',0)');
                }
            }

            function resize() {
                // Update width
                width = parseInt(d3.select(element[0]).style('width'), 10);
                width = width - margin.left - margin.right;

                // Resize the chart
                x.range([0, width]);

                d3
                    .select(svg.node().parentNode)
                    .style('width', (width + margin.left + margin.right) + 'px')

                // Update axes
                svg
                    .select('.x.axis')
                    .call(xAxis);

                // Update line
                path
                    .attr("d", line);
            }
        }

        /* @ngInject */
        function controllerFunc() {
            //var vm = this;
        }
    }

})();
