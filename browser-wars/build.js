'use strict';
const fs = require('fs');
const hash = process.argv[2];
const file = `
<!DOCTYPE html>
<html>
<head>
    <!-- Load c3.css -->
    <link href="/browser-wars/c3-0.7.15/c3.css" rel="stylesheet">

    <!-- Load d3.js and c3.js -->
    <script src="/browser-wars/d3.v5.min.js" charset="utf-8"></script>
    <script src="/browser-wars/c3-0.7.15/c3.min.js"></script>
</head>
<body>
    <div id="chart1"></div>
    <div id="chart2"></div>
    <script src="/browser-wars/builds/data.${hash}.min.js"></script>
    <script src="/browser-wars/builds/chart.${hash}.min.js"></script>
    <a href="https://gs.statcounter.com/browser-market-share/desktop/worldwide/#monthly-200901-201807">Data Source</a>
</body>
</html>
`;

fs.writeFileSync('source/browser-wars/index.html', file);
