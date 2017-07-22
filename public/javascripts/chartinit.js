// var res = sedesA.replace(/&quot;/g, '\"')
// for(var prop in ob)
// var ala = #{prop}
//         ola=#{ob[prop]}
// console.log(res)
obj = eval('({' + chartdata + '})');
console.log(obj)

// var ctx = document.getElementById("myDonutChart");
// var data = {
// 	labels: [],
//     datasets: [{
//         backgroundColor: "rgba(75,192,192,0.4)",
//         borderColor: "rgba(75,192,192,1)",
//         data: []
//     }]
// };

// Chart.pluginService.register({
//     beforeInit: function(chart) {
//         var data = chart.config.data;
//         for (var key in obj) {
//             if (obj.hasOwnProperty(key)) {
//             	data.labels.push(key);
//                 data.datasets[0].data.push(obj[key]);
//             }
//         }
//     }
// });

// var myBarChart = new Chart(ctx, {
//     type: 'bar',
//     data: data,
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });
	// https://www.dyclassroom.com/chartjs/chartjs-how-to-draw-bar-graph-using-data-from-mysql-table-and-php



var ctx = document.getElementById("myDonutChart").getContext('2d');
var datas = {
  labels: [],
  datasets: [{
        backgroundColor: ['#F44336','#2196F3','#CDDC39','#FFC107','#4CAF50','#FF9800','#673AB7','#FFEB3B','#880E4F', '#795548','#607D8B','#00BCD4', '#E91E63', '#E040FB', '#01579B'],
	      borderColor: ['white'],
	      borderWidth: 2,
				data: [],
	}]
}

Chart.pluginService.register({
    beforeInit: function(chart) {
        var data = chart.config.data;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
            		data.labels.push(key);
                data.datasets[0].data.push(obj[key]);
            }
        }
    }
});

// var myBarChart = new Chart(ctx, {
//     type: 'bar',
//     data: data,
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });

var myBarChart = new Chart(ctx, {
    type: 'doughnut',
    data: datas,
    options: {
    	legend: {display: true}
    }
});