$(function(){

	$( document ).ready(function(e){
		consultaBodegas()
		bloquearSelect()
	})

	//Devuelve el numero del Id de bodega seleccionado para consultar los puestos
	$('#tab_logic').on('change', 'select', function(){
	  var selectEnUso = this;
	  if (selectEnUso.id.match(/^itembodegaI.*$/)){
	  	// uso de bodega inicial para llamar a puestos I
	  	id = selectEnUso.id.match(/(\d+)/)[0]
	  	val = selectEnUso.value
			pos = '#puestoI-'
	  	$(pos + id).removeAttr('disabled', '')
	  	consultarPuestos(val, id, pos)
	  }
	  else if (selectEnUso.id.match(/^itembodegaF.*$/)){
	  	// uso de bodega final  para llamar a puestos F
	  	id = selectEnUso.id.match(/(\d+)/)[0]
	  	val = selectEnUso.value
	  	pos = '#puestoF-'
	  	$(pos + id).removeAttr('disabled', '')
	  	consultarPuestos(val, id, pos)
	  }
	  else if (selectEnUso.id.match(/^puestoI.*$/)){
	  	// uso de puestos iniciales para llamar articulos
	  	id = selectEnUso.id.match(/(\d+)/)[0];
	  	val = selectEnUso.value
	  	pos = '#itemI-'
	  	$(pos + id).removeAttr('disabled', '')
	  	consultarArticulos(val, id, pos)
	  }
	  else if (selectEnUso.id.match(/^puestoF.*$/)){
	  	// uso de puestos finales para llamar articulos
	  	id = selectEnUso.id.match(/(\d+)/)[0];
	  	val = selectEnUso.value
	  	pos = '#itemF-'
	  	$(pos + id).removeAttr('disabled', '')
	  	consultarArticulos(val, id, pos)
	  }
	})
})

//API request para consultar los articulos de un puesto X
function consultarArticulos(val, id, pos){
	$.ajax({
      url: '/api-articulos/' + val,
      contentType: 'application/json',
      success: function(response) {
        var selectItems = $(pos + id);
          selectItems.html('');
          for(i=0; i<response.data.length; i++){
          	var opt = document.createElement('option');
          	opt.value = response.data[i].id_articulos;
          	opt.innerHTML = response.data[i].nombre_item + ' ' + response.data[i].plaqueta_art;
          	selectItems.append(opt);
          }
      }
    })
}

//API request para consultar los puestos de la bodega X
function consultarPuestos(val, id, pos){
	$.ajax({
      url: '/api-puestos/' + val,
      contentType: 'application/json',
      success: function(response) {
        var selectItems = $(pos + id);
          selectItems.html('');
          for(i=0; i<response.data.length; i++){
          	var opt = document.createElement('option');
          	opt.value = response.data[i].id_puesto;
          	opt.innerHTML = 'Puesto ' + response.data[i].posicion;
          	opt.className = 'opcionPuesto';
          	selectItems.append(opt);
          }
      }
    })
}

//API request para consultar las bodegas de la sede X
function consultaBodegas(i){
	$.ajax({
    url: '/api-bodegas',
    contentType: 'application/json',
    success: function(response) {
      var selectItems = $('#itembodegaI-' + i);
      var selectItems2 = $('#itembodegaF-' + i);
        selectItems.html('');
        for(i=0; i<response.data.length; i++){
        	var opt = document.createElement('option');
        	var opt2 = document.createElement('option');
        	opt.value = response.data[i].id_bodega;
        	opt2.value = response.data[i].id_bodega;
        	opt.innerHTML = response.data[i].nombre_bodega;
        	opt2.innerHTML = response.data[i].nombre_bodega;
        	selectItems.append(opt);
        	selectItems2.append(opt2);
        }
    }
  })
}

//Bloquea los selects que no tiene informacion
function bloquearSelect(i){
	$('#puestoI-' + i).attr('disabled', '')
	$('#itemI-' + i).attr('disabled', '')
	$('#puestoF-' + i).attr('disabled', '')
	$('#itemF-' + i).attr('disabled', '')
}
