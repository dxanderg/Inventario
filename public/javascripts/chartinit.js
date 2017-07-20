$(document).ready(function(){

	var element = document.querySelector('meta[name="lolo"]');
	console.log(element)
	var content = element && element.getAttribute("content");
	console.log(content)
	// var content2 = JSON.parse(content)
	// console.log(content2)

	// var array = $.map(content, function(value, index) {
	//     return [value];
	// });
	// console.log(array);

	// https://www.dyclassroom.com/chartjs/chartjs-how-to-draw-bar-graph-using-data-from-mysql-table-and-php

	var datas = {
    labels: [element],
    datasets: [
        {
          label: "My First dataset",
          data: [content],
          backgroundColor: ['#F44336','#2196F3','#CDDC39','#673AB7','#4CAF50','#FF9800','#673AB7','#FFEB3B','#795548','#607D8B','#00BCD4'],
		      borderColor: ['white'],
		      borderWidth: 2
		    }
		]
	}

	var ctx = document.getElementById("myDonutChart").getContext('2d');
	var myDoughnutChart = new Chart(ctx, {
	    type: 'doughnut',
	    data: content
	});

})