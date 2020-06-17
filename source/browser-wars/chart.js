(function(c3, d3, getData) {
    var h = window.innerHeight;
    var data = getData();

    var datavars = [22, 84, 29, 3];
    var colors = ['red','orange','green','blue'];

    var svg = d3.select('#chart1')
        .append('svg')
        .attr('width', 500)
        .attr('height', 100);

    svg.selectAll('rect')
        .data(datavars)
        .enter()
        .append('rect')
        .attr('width', function(d){
            return d;})
        .attr('x',function(d, i){
            return sum(datavars, 0, i); })
        .attr('fill', function(d, i){ return colors[i]; })
        .attr('y',0)
        .attr('height', 30);

    function sum(array, start, end) {
        var total = 0;
        for(var i=start; i<end; i++) total += array[i];
        return total;
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
    }

    window.addEventListener("scroll", amountscrolled, false);
}(window.c3, window.d3, window.getData));


