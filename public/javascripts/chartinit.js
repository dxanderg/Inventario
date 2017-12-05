Chart.defaults.global.defaultFontFamily = "Catamaran"
Chart.defaults.global.defaultFontSize = 14

var barGraph1 = null
var barGraph2 = null

$(document).ready(function(){
    $.ajax({
        url: '/api-chart/'+ datosUser,
        method: "GET",
        success: function(datas) {
            var freza = datas.data
            data = eval('({' + freza + '})')
            var player = []
            var score = []

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    player.push(key)
                    score.push(data[key])
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


            var ctx = $("#myDonutChart");
            // var ctx2 = $("#myBarChart");

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

            // barGraph2 = new Chart(ctx2, {
            //     type: 'pie',
            //     data: chartdata,
            //     options: {
            //         legend: {
            //                 display: true,
            //                 position: 'bottom',
            //             labels: {
            //                 // This more specific font property overrides the global property
            //                 fontFamily: 'Ubuntu',
            //             }
            //         }
            //     }
            // })
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
    // $('#titleChart2').html('OCUPACION ' + actual)
    //****************************

    var val = this.value
    $.ajax({
        url: '/api-chart/'+ val,
        method: "GET",
        success: function(datas) {
            var freza = datas.data
            data = eval('({' + freza + '})')
            var player = []
            var score = []


            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    player.push(key)
                    score.push(data[key])
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

            var ctx = $("#myDonutChart");
            // var ctx2 = $("#myBarChart");

            if (barGraph1) barGraph1.destroy();
            // if (barGraph2) barGraph2.destroy();

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

            // barGraph2 = new Chart(ctx2, {
            //     type: 'pie',
            //     data: chartdata,
            //     options: {
            //         legend: {
            //                 display: true,
            //                 position: 'bottom',
            //             labels: {
            //                 // This more specific font property overrides the global property
            //                 fontFamily: 'Ubuntu',
            //             }
            //         }
            //     }
            // })
        },
        error: function(data) {
            console.log(data);
        }
    })
})