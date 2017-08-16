Chart.defaults.global.defaultFontFamily = "Catamaran"
Chart.defaults.global.defaultFontSize = 12
obj = eval('({' + ocupacionSede + '})');
// obj2 = eval('({' + ocupacionSitio + '})');

var datas = {
  labels: [],
  datasets: [{
        backgroundColor: ['#F44336','#2196F3','#CDDC39','#FFC107','#4CAF50','#FF9800','#673AB7','#FFEB3B','#880E4F', '#795548','#607D8B','#00BCD4', '#E91E63', '#E040FB', '#01579B'],
          borderColor: ['white'],
          borderWidth: 2,
                data: [],
    }]  
}

var datasbar = {
  labels: [],
  datasets: [{
        backgroundColor: ['#F44336','#2196F3','#CDDC39','#FFC107','#4CAF50','#FF9800','#673AB7','#FFEB3B','#880E4F', '#795548','#607D8B','#00BCD4', '#E91E63', '#E040FB', '#01579B'],
          borderColor: ['white'],
          borderWidth: 2,
          data: []
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

var ctx = document.getElementById("myDonutChart").getContext('2d');
var myBarChart = new Chart(ctx, {
    // type: 'doughnut',
    type: 'horizontalBar',
    data: datas,
    options: {
        legend: {
                display: false,
                labels: {
                // This more specific font property overrides the global property
                fontFamily: 'Ubuntu',
            }
        }
    }
})

var ctx2 = document.getElementById("myBarChart").getContext('2d');
var myBarChart2 = new Chart(ctx2, {
    // type: 'doughnut',
    type: 'doughnut',
    data: datasbar,
    options: {
        legend: {
                display: false,
            labels: {
                // This more specific font property overrides the global property
                fontFamily: 'Ubuntu',
            }
        }
    }
})