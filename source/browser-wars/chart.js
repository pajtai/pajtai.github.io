(function(c3, d3, getData) {
    var h = window.innerHeight;
    var data = getData();
    var size = h/5;
    var chart1 = c3.generate({
        bindto: '#chart1',
        responsive: true,
        size: {
            height: 300
        },
        position: {
            top: 0,
            right: 0
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
            type : 'pie',
            order: null,
            transition: {
                duration: 1000
            },
            tooltip: {
                show: false
            }
        },
    });
    d3.select('#chart1').style('position', 'fixed').style('top', 0).style('right', 0);
    var lineChartConfigs = {
        bindto: '#chart2',
        size: {
            height: size
        },
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
    d3.select('#chart2').style('position', 'fixed').style('bottom', 0).style('right', 0);
    chart2.tooltip.show({ x: 1 });

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
        })
        .on('mouseout', function() {
        });

    function update (index) {
        if (index > data.length - 1) { index = 0; }

        var datum = data[index];
        d3.select('#chart1 .c3-chart-arcs-title').node().innerHTML = datum.title;
        chart1.load({ columns: datum.data });
        chart2.tooltip.show({ data: { x: new Date(datum.title + '-01')}});
        document.getElementsByClassName('c3-tooltip')[0].style.visibility = 'hidden';
    }

    function getDocHeight() {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }

    var docheight = getDocHeight();
    function amountscrolled(){
        var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight;
        var docheight = getDocHeight();
        var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        var trackLength = docheight - winheight;
         // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
        var pctScrolled = Math.floor(scrollTop/trackLength * 100);
        console.log(pctScrolled + '% scrolled');
        var size = data.length;
        var index = Math.floor(size * pctScrolled / 100);
        update(index);
    }

    window.addEventListener("scroll", function(){
        amountscrolled();
    }, false);
}(window.c3, window.d3, window.getData));
