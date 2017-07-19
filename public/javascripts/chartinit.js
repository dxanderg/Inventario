$(document).ready(function(){
	var $row = $(this).closest("tr");    // Find the row
	var $tds = $row.find("td");
	$.each($tds, function() {
	        console.log($(this).text());
	});
})

var sedes = document.getElementById("datoschart")


var ctx = document.getElementById("myDonutChart").getContext('2d');
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: sedes
});



 var datas = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                '#F44336',
                '#2196F3',
                '#CDDC39',
                '#673AB7',
                '#4CAF50',
                '#FF9800',
                '#673AB7',
                '#FFEB3B',
                '#795548',
                '#607D8B',
                '#00BCD4'
            ],
            borderColor: [
                'white'
            ],
            borderWidth: 2
                }
            ]
        }