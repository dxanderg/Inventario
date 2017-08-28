$(function(){

	$('#select-articulo').on('change', function(){
	  var val = this.value;
	  $.ajax({
      url: '/api-items/' + val,
      contentType: 'application/json',
      success: function(response) {
        var selectItems = $('#select-tipoarticulo');
          selectItems.html('');
          for(i=0; i<response.data.length; i++){
          	var opt = document.createElement('option');
          	opt.value = response.data[i].id_item;
          	opt.innerHTML = response.data[i].nombre_fabricante + ' - ' + response.data[i].modelo_item;
          	selectItems.append(opt);
          }
      }
    })
	})

	$('#select-sede').on('change', function(){
	  var val = this.value;
	  $.ajax({
      url: '/api-bodegas',
      contentType: 'application/json',
      success: function(response) {
        var selectBodegas = $('#select-bodegas');
          selectBodegas.html('');
          for(i=0; i<response.data.length; i++){
          	var opt = document.createElement('option');
          	opt.value = response.data[i].id_bodega;
          	opt.innerHTML = response.data[i].nombre_bodega;
          	selectBodegas.append(opt);
          }
      }
    })
	})


	$('#select-bodegas').on('change', function(){
	  var val = this.value;
	  $.ajax({
      url: '/api-puestos/' + val,
      contentType: 'application/json',
      success: function(response) {
        var selectPuestos = $('#select-posiciones');
          selectPuestos.html('');
          for(i=0; i<response.data.length; i++){
          	var opt = document.createElement('option');
          	opt.value = response.data[i].id_puesto;
          	opt.innerHTML = 'Puesto ' + response.data[i].posicion;
          	selectPuestos.append(opt);
          }
      }
    })
	})

})

