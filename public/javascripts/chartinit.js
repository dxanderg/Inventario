Chart.defaults.global.defaultFontFamily = "Catamaran"
Chart.defaults.global.defaultFontSize = 14

var barGraph1 = null
var lineGraph1 = null

$(document).ready(function(){
    $.ajax({
        url: '/api-chart/'+ datosUser,
        method: "GET",
        success: function(datas) {
            var freza = datas.data
            var freza2 = datas.data2
            data = eval('({' + freza + '})')
            data2 = eval('({' + freza2 + '})')
            var player = []
            var player2 = []
            var score = []
            var score2 = []

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    player.push(key)
                    score.push(data[key])
                }
            }
            for (var key in data2) {
                if (data2.hasOwnProperty(key)) {
                    player2.push(key)
                    score2.push(data2[key])
                }
            }

            var chartdata = {
              labels: player,
              datasets: [{
                    backgroundColor: ['#F44336','#2196F3','#CDDC39','#FFC107','#4CAF50','#FF9800','#673AB7','#FFEB3B','#880E4F', '#795548','#607D8B','#00BCD4', '#E91E63', '#E040FB', '#01579B', '#F74C07', '#687EC3'],
                    borderColor: ['white'],
                    borderWidth: 2,
                    data: score,
                    dataLabels: player
                }]  
            }

            var chartdata2 = {
              labels: player2,
              datasets: [{
                    // backgroundColor: ['#F44336','#2196F3','#CDDC39','#FFC107','#4CAF50','#FF9800','#673AB7','#FFEB3B','#880E4F', '#795548','#607D8B','#00BCD4', '#E91E63', '#E040FB', '#01579B', '#F74C07', '#687EC3'],
                    // borderColor: ['white'],
                    // borderWidth: 2,
                    lineTension: 0,
                    fill: false,
                    pointRadius: 6,
                    backgroundColor: "#59d0ff",
                    borderColor: "#19A2DB",
                    data: score2,
                    dataLabels: player2
                }]  
            }

            var ctx = $("#myDonutChart");
            var ctx2 = $("#myPolarChart");

            barGraph1 = new Chart(ctx, {
                type: 'horizontalBar',
                data: chartdata,
                options: {
                    legend: {
                            display: false,
                            position: 'right',
                        labels: {
                            // This more specific font property overrides the global property
                            fontFamily: 'Ubuntu',
                        }
                    },
                    scales: {
                         yAxes: [{
                             categoryPercentage: 1,
                             barPercentage: 1
                        }]
                    }
                }
            })

            lineGraph1 = new Chart(ctx2, {
                type: 'bar',
                data: chartdata2,
                options: {
                    legend: {
                        display: false,
                        position: 'right',
                        labels: {
                            // This more specific font property overrides the global property
                            fontFamily: 'Ubuntu',
                        }
                    },
                    scales: {
                        yAxes: [{
                             categoryPercentage: 1,
                             barPercentage: 1
                        }],
                        xAxes: [{
                            ticks: {
                                autoSkip: false
                            }
                        }]
                    },
                    animation: {
                        duration: 0,
                        onComplete: function () {
                            var chartInstance = this.chart,
                            ctx2 = chartInstance.ctx;
                            ctx2.textAlign = 'center';
                            ctx2.fillStyle = "#373737";
                            ctx2.textBaseline = 'bottom';

                            this.data.datasets.forEach(function (dataset, i) {
                                var meta = chartInstance.controller.getDatasetMeta(i);
                                meta.data.forEach(function (bar, index) {
                                    var data = dataset.data[index];
                                    ctx2.fillText(data, bar._model.x, bar._model.y - 2);
                                })
                            })
                        }                       
                    }
                }
            })
        },
        error: function(data) {
            console.log(data);
        }
    });
});


document.getElementById('selectSede').addEventListener('change', function(){
    //CAMBIAR TITULO DE LAS GRAPHICS
    var actual = $("#selectSede option:selected").html()
    $('#titleChart1').html('OCUPACION ' + actual)
    $('#titleChart2').html('SUMARIO ' + actual)
    //****************************
    var val = this.value
    $.ajax({
        url: '/api-chart/'+ val,
        method: "GET",
        success: function(datas) {
            var freza = datas.data
            var freza2 = datas.data2
            data = eval('({' + freza + '})')
            data2 = eval('({' + freza2 + '})')
            var player = []
            var player2 = []
            var score = []
            var score2 = []

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    player.push(key)
                    score.push(data[key])
                }
            }
            for (var key in data2) {
                if (data2.hasOwnProperty(key)) {
                    player2.push(key)
                    score2.push(data2[key])
                }
            }

            var chartdata = {
              labels: player,
              datasets: [{
                    backgroundColor: ['#F44336','#2196F3','#CDDC39','#FFC107','#4CAF50','#FF9800','#673AB7','#FFEB3B','#880E4F', '#795548','#607D8B','#00BCD4', '#E91E63', '#E040FB', '#01579B', '#F74C07', '#687EC3'],
                    borderColor: ['white'],
                    borderWidth: 2,
                    data: score,
                    dataLabels: player
                }]  
            }

            var chartdata2 = {
              labels: player2,
              datasets: [{
                    // backgroundColor: ['#F44336','#2196F3','#CDDC39','#FFC107','#4CAF50','#FF9800','#673AB7','#FFEB3B','#880E4F', '#795548','#607D8B','#00BCD4', '#E91E63', '#E040FB', '#01579B', '#F74C07', '#687EC3'],
                    // borderColor: ['white'],
                    // borderWidth: 2,
                    lineTension: 0,
                    fill: false,
                    pointRadius: 6,
                    backgroundColor: "#59d0ff",
                    borderColor: "#19A2DB",
                    data: score2,
                    dataLabels: player2
                }]  
            }

            var ctx = $("#myDonutChart");
            var ctx2 = $("#myPolarChart");

            if (barGraph1) barGraph1.destroy();
            if (lineGraph1) lineGraph1.destroy();

            barGraph1 = new Chart(ctx, {
                type: 'horizontalBar',
                data: chartdata,
                options: {
                    legend: {
                            display: false,
                            position: 'right',
                        labels: {
                            // This more specific font property overrides the global property
                            fontFamily: 'Ubuntu',
                        }
                    },
                    scales: {
                         yAxes: [{
                             categoryPercentage: 1,
                             barPercentage: 1
                        }]
                    }
                }
            })
            lineGraph1 = new Chart(ctx2, {
                type: 'bar',
                data: chartdata2,
                options: {
                    legend: {
                            display: false,
                            position: 'right',
                        labels: {
                            // This more specific font property overrides the global property
                            fontFamily: 'Ubuntu',
                        }
                    },
                    scales: {
                        yAxes: [{
                             categoryPercentage: 1,
                             barPercentage: 1
                        }],
                        xAxes: [{
                            ticks: {
                                autoSkip: false
                            }
                        }]
                    },
                    animation: {
                        duration: 0,
                        onComplete: function () {
                            var chartInstance = this.chart,
                            ctx2 = chartInstance.ctx;
                            ctx2.textAlign = 'center';
                            ctx2.fillStyle = "#373737";
                            ctx2.textBaseline = 'bottom';

                            this.data.datasets.forEach(function (dataset, i) {
                                var meta = chartInstance.controller.getDatasetMeta(i);
                                meta.data.forEach(function (bar, index) {
                                    var data = dataset.data[index];
                                    ctx2.fillText(data, bar._model.x, bar._model.y - 2);
                                })
                            })
                        }                       
                    }
                }
            })
        },
        error: function(data) {
            console.log(data);
        }
    });
})