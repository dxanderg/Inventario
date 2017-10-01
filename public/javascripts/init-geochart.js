      google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['Pais', 'Sedes', 'Posiciones'],
          ['Peru', 1, 354],
          ['United States', 1, 14],
          ['Colombia', 8, 7750],
          ['Chile', 1, 456],
          ['Spain', 4, 2750],
          ['Brazil', 1, 651],
          ['Mexico', 1, 980],
          ['Guatemala', 1, 340],
          ['Salvador', 1, 560]
        ]);

        var options = {
          colorAxis: {colors: ['#0098D8','#0098D8','#0098D8','red']},
          datalessRegionColor: '#949494',
          height: 350
        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }