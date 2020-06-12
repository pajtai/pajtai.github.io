(function(c3, d3, getData) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var data = getData();
    var size = Math.min(w,h)/2;
    var chart1 = c3.generate({
        bindto: '#chart1',
        responsive: true,
        size: {
            // width: w,
            height: size
        },
        donut: {
            title: 'Browser Usage'
        },
        data: {
            columns: [
                ['Chrome', 1.38],
                ['IE', 65.41],
                ['Firefox', 27.03],
                ['Safari', 2.57],
                ['Opera', 2.92],
                ['Edge Legacy', 0],
                ['Other', 0],
            ],
            type : 'donut',
            order: null,
            transition: {
                duration: 1000
            },
            tooltip: {
                show: false
            }
        },
    });

    var lineChartConfigs = {
        bindto: '#chart2',
        data: {
            x: 'x',
            columns: [
                ['x'],
                ['Chrome'],
                ['IE'],
                ['Firefox'],
                ['Safari'],
                ['Opera'],
                ['Edge Legacy'],
                ['Other'],
            ]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d'
                }
            }
        },
        legend: {
            show: false
        },
        point: {
            show: false
        },
        tooltip: {
            show: true
        }
    };

    data.forEach(function(datum) {
        lineChartConfigs.data.columns[0].push(datum.title + '-1');
        for (var i=0; i<7; ++i) {
            lineChartConfigs.data.columns[i + 1].push(datum.data[i][1]);
        }
    });
    var chart2 = c3.generate(lineChartConfigs);
    var index = 0;
    chart2.tooltip.show({ x: 1 });

    var interval = setInterval(update, 1000);
    chart1.internal.config.interaction_enabled = false;
    chart1.internal.config.onmouseover = function() {};
    chart1.internal.config.onmouseout = function() {};
    chart1.internal.config.data_onmouseover = function() {};
    chart1.internal.config.click = function() {};
    chart1.internal.config.hover = function() {};
    chart1.internal.expandArc = function() {};
    chart1.internal.showTooltip = function() {};

    d3
        .select('#chart2')
        .on('mouseover', function() {
            clearInterval(interval);
        })
        .on('mouseout', function() {
            interval = setInterval(update, 1000);
        });

    function update () {
        if (index > data.length - 1) { index = 0; }

        var datum = data[index];
        d3.select('#chart1 .c3-chart-arcs-title').node().innerHTML = datum.title;
        chart1.load({ columns: datum.data });
        chart2.tooltip.show({ data: { x: new Date(datum.title + '-01')}});
        document.getElementsByClassName('c3-tooltip')[0].style.visibility = 'hidden';
        index += 3;

    }
}(window.c3, window.d3, window.getData));
