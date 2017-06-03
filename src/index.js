import './stylesheets/index.scss'
var d3 = require('d3')
var $ = require('jquery')

barChartGDP()

//BARCHART

function barChartGDP() {

    var gdp = [],
        dates = [],
        gdpWithDates = [],
        formatTime = d3.timeFormat('%B %Y');


    //get GDP data from server
    $.getJSON("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(data) {

        var parseTime = d3.timeParse("%Y-%m-%d");

        for (var i = 0; i < data.data.length; i++) {
            gdpWithDates.push([(data.data[i][1]), (parseTime(data.data[i][0]))])
            gdp.push(data.data[i][1])
            dates.push(parseTime(data.data[i][0]));
        }

        /*
        gdp = [];
        for (i=0;i<400;i++) {

          gdp.push(Math.round(Math.random()*300))
        }
        */

        plotChart(gdp, dates);
    });



    function plotChart(gdp, dates) {

        var margin = {
            top: 30,
            bottom: 50,
            right: 30,
            left: 45
        };

        var graphWidth = 700 - margin.left - margin.right,
            graphHeight = 600 - margin.top - margin.bottom,

            barWidth = d3.scaleBand()
            .domain(d3.range(0, gdp.length))
            .range([0, graphWidth])
            .padding(0),
            barHeight = d3.scaleLinear()
            .domain([0, d3.max(gdp)])
            .range([0, graphHeight]),
            colors = d3.scaleLinear()
            .domain([0, d3.max(gdp)])
            .range(['#259286', '#2176C7']),
            tooltip = d3.select('body')
            .append('div')
            .style('background', 'white')
            .style('position', 'absolute')
            .style('padding', '5px')
            .style('border-radius', '3px')
            .style('opacity', '0')


        var theChart = d3.select("#chart")
            .append('svg')
            .attr('width', graphWidth + margin.left + margin.right)
            .attr('height', graphHeight + margin.top + margin.bottom)

            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('width', graphWidth)
            .attr('height', graphHeight)
            .selectAll('rect')

            .data(gdpWithDates)
            .enter() // http://alignedleft.com/tutorials/d3/binding-data
            .append('rect')
            .attr('width', Math.ceil(barWidth.bandwidth()))
            .attr('height', 0)
            .attr('x', function(d, i) {
                return barWidth(i);
            })
            .attr('y', graphHeight)
            .attr('fill', function(d, i) {
                return colors(d[0])
            })
            .on('mouseover', function(d, i) {
                d3.select(this)
                    .style('opacity', '0.5')

                tooltip.transition()
                    .style('opacity', '1')
                tooltip.html(d[0] + '<br>' + formatTime(d[1]))
                    .style('left', d3.event.pageX + 8 + 'px')
                    .style('top', d3.event.pageY - 65 + 'px')


            })
            .on("mousemove", function() {
                return tooltip.style("top", (d3.event.pageY - 65) + "px").style("left", (d3.event.pageX + 8) + "px");
            })
            .on('mouseout', function(d, i) {
                d3.select(this)
                    .style('opacity', '1')

                tooltip.transition().style('opacity', '0')
            })



        // Add vertical axis
        var yAxisScale = d3.scaleLinear()
            .domain([0, d3.max(gdp)])
            .range([graphHeight, 0]),

            yAxis = d3.axisLeft()
            .scale(yAxisScale)
            .ticks(20),

            yAxisSelect = d3.select('svg').append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
            .attr('class', 'axisWhite')


        var yAxisLabel = d3.select('svg')
            .append("text") // text label for the x axis
            .style("fill", "white")
            .text("US Gross Domestic Product, In Billions")
            .attr('transform', 'translate(' + (margin.left + 22) + ',' + (graphHeight / 2 + 85) + ') rotate(-90)')



        yAxis(yAxisSelect); //insert axis


        // Add horizontal axis

        var xAxisScale = d3.scaleTime()
            .domain([d3.max(dates), d3.min(dates)])
            .range([graphWidth, 0]),

            xAxis = d3.axisBottom()
            .scale(xAxisScale)
            .ticks(10)


        var xAxisSelect = d3.select('svg').append('g')
            .attr('transform', 'translate(' + margin.left + ',' + (graphHeight + margin.top) + ')')
            .attr('class', 'axisWhite')


        var xAxisLabel = d3.select('svg')
            .append("text") // text label for the x axis
            .style("fill", "white")
            .text("Date")
            .attr('transform', 'translate(' + (graphWidth / 2 + margin.left / 2) + ',' + (graphHeight + 70) + ')')


        xAxis(xAxisSelect) //Insert Axis


        //Animate graph

        theChart.transition()
            .attr('y', function(d, i) {
                return graphHeight - barHeight(d[0]);
            })
            .attr('height', function(d, i) {
                return barHeight(d[0]);
            })
            .delay(function(d, i) {
                return i * (2000 / gdp.length)
            })
            .duration(400)




    }
}




//PIECHART

function pie() {

    var margin = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    };

    var width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        radius = 200,
        colors = d3.scaleOrdinal(d3.schemeCategory20c);

    var piedata = [{
        label: "Barot",
        value: '50'
    }, {
        label: "Gerard",
        value: '50'
    }, {
        label: "Jen",
        value: '50'
    }, {
        label: "Gerard",
        value: '50'
    }, {
        label: "Gerard",
        value: '50'
    }, {
        label: "Gerard",
        value: '50'
    }, {
        label: "Gerard",
        value: '50'
    }, {
        label: "Gerard",
        value: '50'
    }];

    var pie = d3.pie()
        .value(function(d) {
            return d.value;
        });

    console.log()

    var arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius - 90)

    var myChart2 = d3.select('#chart2').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width - radius) + ',' + (height - radius) + ')')
        .selectAll('path')
        .data(pie(piedata))
        .enter().append('g')
        .attr('class', 'slice')




    var slices = d3.selectAll('g.slice')
        .append('path')
        .attr('fill', function(d, i) {
            return colors(i);
        })
        .attr('d', arc)

    var text = d3.selectAll('g.slice')
        .append('text')
        .text(function(d, i) {
            return d.data.label;
        })
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('transform', function(d) {

            return 'translate(' + arc.centroid(d) + ')'
        })







}









//

///

//
//
//




function testForce1() {

    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        color = d3.scaleOrdinal(d3.schemeCategory10);

    var a = {
            id: "a"
        },
        b = {
            id: "b"
        },
        c = {
            id: "c"
        },
        d = {
            id: "d"
        },
        nodes = [a, b, c],
        links = [];

    var simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("link", d3.forceLink(links).distance(200))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .alphaTarget(1)
        .on("tick", ticked);

    var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
        link = g.append("g").attr("stroke", "#000").attr("stroke-width", 1.5).selectAll(".link"),
        node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node");

    restart();

    d3.timeout(function() {
        links.push({
            source: a,
            target: b
        }); // Add a-b.
        links.push({
            source: b,
            target: c
        }); // Add b-c.
        links.push({
            source: c,
            target: a
        }); // Add c-a.
        restart();
    }, 1000);

    d3.interval(function() {
        nodes.pop(); // Remove c.
        links.pop(); // Remove c-a.
        links.pop(); // Remove b-c.
        restart();
    }, 2000, d3.now());

    d3.interval(function() {
        nodes.push(c); // Re-add c.
        links.push({
            source: b,
            target: c
        }); // Re-add b-c.
        links.push({
            source: c,
            target: a
        }); // Re-add c-a.
        restart();
    }, 2000, d3.now() + 1000);

    function restart() {

        // Apply the general update pattern to the nodes.
        node = node.data(nodes, function(d) {
            return d.id;
        });
        node.exit().remove();
        node = node.enter().append("circle").attr("fill", function(d) {
            return color(d.id);
        }).attr("r", 8).merge(node);

        // Apply the general update pattern to the links.
        link = link.data(links, function(d) {
            return d.source.id + "-" + d.target.id;
        });
        link.exit().remove();
        link = link.enter().append("line").merge(link);

        // Update and restart the simulation.
        simulation.nodes(nodes);
        simulation.force("link").links(links);
        simulation.alpha(1).restart();
    }

    function ticked() {
        node.attr("cx", function(d) {
                return d.x;
            })
            .attr("cy", function(d) {
                return d.y;
            })

        link.attr("x1", function(d) {
                return d.source.x;
            })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });
    }


}



function testChart() {

    var width, height
    var chartWidth, chartHeight
    var margin
    var svg = d3.select("#graph").append("svg")
    var chartLayer = svg.append("g").classed("chartLayer", true)

    main()

    function main() {
        var range = 100
        var data = {
            nodes: d3.range(0, range).map(function(d) {
                return {
                    label: "l" + d,
                    r: ~~d3.randomUniform(8, 28)()
                }
            }),
            links: d3.range(0, range).map(function() {
                return {
                    source: ~~d3.randomUniform(range)(),
                    target: ~~d3.randomUniform(range)()
                }
            })
        }

        setSize(data)
        drawChart(data)
    }

    function setSize(data) {
        width = document.querySelector("#graph").clientWidth
        height = document.querySelector("#graph").clientHeight

        margin = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }


        chartWidth = width - (margin.left + margin.right)
        chartHeight = height - (margin.top + margin.bottom)

        svg.attr("width", width).attr("height", height)


        chartLayer
            .attr("width", chartWidth)
            .attr("height", chartHeight)
            .attr("transform", "translate(" + [margin.left, margin.top] + ")")


    }

    function drawChart(data) {

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) {
                return d.index
            }))
            .force("collide", d3.forceCollide(function(d) {
                return d.r + 8
            }).iterations(16))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(chartWidth / 2, chartWidth / 2))
            .force("y", d3.forceY(0))
            .force("x", d3.forceX(0))

        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(data.links)
            .enter()
            .append("line")
            .attr("stroke", "black")

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(data.nodes)
            .enter().append("circle")
            .attr("r", function(d) {
                return d.r
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));


        var ticked = function() {
            link
                .attr("x1", function(d) {
                    return d.source.x;
                })
                .attr("y1", function(d) {
                    return d.source.y;
                })
                .attr("x2", function(d) {
                    return d.target.x;
                })
                .attr("y2", function(d) {
                    return d.target.y;
                });

            node
                .attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                });
        }

        simulation
            .nodes(data.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(data.links);



        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

    }
}




//FORCE CHART

function forceLayout() {

    var width = 700,
        height = 700,
        circleWidth = 5;

    var palette = {
        "lightgray": "#819090",
        "gray": "#708284",
        "mediumgray": "#536870",
        "darkgray": "#475B62",
        "darkblue": "#0A2933",
        "darkerblue": "#042029",
        "paleryellow": "#FCF4DC",
        "paleyellow": "#EAE3CB",
        "yellow": "#A57706",
        "orange": "#BD3613",
        "red": "#D11C24",
        "pink": "#C61C6F",
        "purple": "#595AB7",
        "blue": "#2176C7",
        "cyan": "#259286",
        "green": "#738A05"
    }

    var nodes = [{
        name: "Parent"
    }, {
        name: "child3",
        target: [0]
    }, {
        name: "child3",
        target: [0]
    }, {
        name: "child3",
        target: [0, 4]
    }, {
        name: "child3",
        target: [0, 2]
    }, {
        name: "child3",
        target: [0, 1, 2, 3]
    }]

    var links = [];


    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].target !== undefined) {
            for (var j = 0; j < nodes[i].target.length; j++) {
                links.push({
                    source: nodes[i],
                    target: nodes[nodes[i].target[j]]
                })
            }
        }

    }


    var myChart = d3.select("#chart3")
        .append('svg')
        .attr('width', width)
        .attr('height', height)


    var force = d3.forceSimulation()
        .nodes(nodes)
        .force("link", d3.forceLink(links).distance(200))
        .force("collide", d3.forceCollide(12))
        .force('charge', d3.forceManyBody())
        //.force("center", d3.forceCenter(width/2, height/2))
        .force("y", d3.forceY(height / 2))
        .force("x", d3.forceX(width / 2))


    var link = myChart.selectAll('line')
        .data(links).enter().append('line')
        .attr('stroke', palette.gray)

    console.log(nodes)
    console.log(links)

    var node = myChart.selectAll('circle')
        .data(nodes).enter()
        .append('g')
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));


    node.append('circle')
        .attr('r', circleWidth)
        .attr('fill', palette.pink)


    //how it is animated over time. tick is the timing of javascript.
    //Whenever time passes, dots must be animated
    force.on('tick', function(e) {
        node.attr('transform', function(d, i) {
            return 'translate(' + d.x + ', ' + d.y + ')';
        })
        link
            .attr('x1', function(d) {
                return d.source.x
            })
            .attr('y1', function(d) {
                return d.source.y
            })
            .attr('x2', function(d) {
                return d.target.x
            })
            .attr('y2', function(d) {
                return d.target.y
            })


    })


    node.append('text')
        .text(function(d) {
            return d.name
        })
        .attr('fill', function(d, i) {
            if (i > 0) {
                return palette.mediumgray
            } else {
                return palette.yellow
            }
        })
        .attr('text-anchor', function(d, i) {
            if (i > 0) {
                return 'end'
            } else {
                return 'beginning'
            }
        })
        .attr('font-size', function(d, i) {
            if (i > 0) {
                return '1em'
            } else {
                return '1.8em'
            }
        })
        .attr('x', function(d, i) {
            if (i > 0) {
                return circleWidth - 10
            } else {
                return circleWidth + 5
            }
        })

    function dragstarted(d) {
        if (!d3.event.active) force.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) force.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }



}
