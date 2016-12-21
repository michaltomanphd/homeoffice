
var resultImageWidth = 200;
var resultImageHeight = 200;

var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(resultImageWidth, resultImageHeight)
  , ctx = canvas.getContext('2d'),
  Chart = require('nchart');
 
var fs = require('fs');

var dataSeries = [[100,4,3,],[6,30,2],[16,3,2]];
var labels = ["January","August","December"];
var colors = [[100, 250, 100], [200, 200, 0], [200, 100, 100]];

var barChartData = {
    labels : labels,
    datasets : []
}

for (var i=0;i<dataSeries.length;i++) {
	barChartData.datasets.push({
							            fillColor : "rgba(" + colors[i][0] + "," + colors[i][1] + "," + colors[i][2] + ",0.5)",
							            strokeColor : "rgba(" + colors[i][0] + "," + colors[i][1] + "," + colors[i][2] + ",0.8)",
							            highlightFill: "rgba(" + colors[i][0] + "," + colors[i][1] + "," + colors[i][2] + ",0.75)",
							            highlightStroke: "rgba(" + colors[i][0] + "," + colors[i][1] + "," + colors[i][2] + ",1)",
							            data : dataSeries[i]	
							         });
}

new Chart(ctx).Bar(barChartData, {responsive : false});
 
canvas.toBuffer(function (err, buf) {
  if (err) throw err;
  fs.writeFile(__dirname + '/bar_chart.png', buf);
});
