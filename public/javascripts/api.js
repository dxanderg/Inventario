$(function(){

	$( document ).ready(function(e){
		// consultaBodegas()
		// bloquearSelect()
	})

	//Devuelve el numero del Id de bodega seleccionado para consultar los puestos
	$('#tab_logic').on('change', 'select', function(){
	  var selectEnUso = this;
    if (selectEnUso.id.match(/^itemsedeI.*$/)){
      // uso de la ciudad de usuario para llamar las bodegas I
      id = selectEnUso.id.match(/(\d+)/)[0]
      val = selectEnUso.value
      pos = '#itembodegaI-'
      $(pos + id).removeAttr('disabled', '')
      consultaBodegas(val, id, pos)
    }
    else if (selectEnUso.id.match(/^itemsedeF.*$/)){
      // uso de la ciudad de usuario para llamar las bodegas F
      id = selectEnUso.id.match(/(\d+)/)[0]
      val = selectEnUso.value
      pos = '#itembodegaF-'
      $(pos + id).removeAttr('disabled', '')
      consultaBodegas(val, id, pos)
    }
	  else if (selectEnUso.id.match(/^itembodegaI.*$/)){
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
        	// opt.value = response.data[i].id_articulos;
          opt.value = "{ id:"+response.data[i].id_articulos+", plaqueta:"+response.data[i].plaqueta_art+", serial:"+response.data[i].serial_art+"}"
        	opt.innerHTML = response.data[i].nombre_item + ': ' + response.data[i].plaqueta_art;
        	selectItems.append(opt);
        }
        renderSelects(selectItems)
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
function consultaBodegas(val, id, pos){
	$.ajax({
    url: '/api-bodegas/' + val,
    contentType: 'application/json',
    success: function(response) {
      var selectBodegas = $(pos + id);
        selectBodegas.html('');
        for(i=0; i<response.data.length; i++){
        	var opt = document.createElement('option');
        	opt.value = response.data[i].id_bodega;
        	opt.innerHTML = response.data[i].nombre_bodega;
        	selectBodegas.append(opt);
        }
    }
  })
}

//API request para consultar las sedes de usuario x
function consultaSedes(i){
  $.ajax({
    url: '/api-sedes/' + ciudadUser,
    contentType: 'application/json',
    success: function(response) {
      var selectItems = $('#itemsedeI-' + i);
      var selectItems2 = $('#itemsedeF-' + i);
        selectItems.html('');
        for(i=0; i<response.data.length; i++){
          var opt = document.createElement('option');
          var opt2 = document.createElement('option');
          opt.value = response.data[i].id_sede;
          opt2.value = response.data[i].id_sede;
          opt.innerHTML = response.data[i].nombre_sede;
          opt2.innerHTML = response.data[i].nombre_sede;
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
  $('#itembodegaI-' + i).attr('disabled', '')
  $('#itembodegaF-' + i).attr('disabled', '')
}


function renderSelects(ev){
	$(ev).multiselect('destroy')
	setTimeout(function(){ $(ev).multiselect({
		maxHeight: 200,
		buttonWidth: '150px'
	}) }, 10);
}

$('#confirmTraslado').on('show.bs.modal', function(e) {
		//Titulo
    var tck = document.getElementById('ticket').value
    $('#modalTitle').html( "Movimientos Ticket " + tck);

    $('#tableModal').append(`<thead class="table-head thead-inverse">
														  <tr>
														    <th class="text-center">N°</th>
                                <th class="text-center">Sede</th>
														    <th class="text-center">Bodega</th>
														    <th class="text-center">Puesto</th>
														    <th class="text-center">Activo</th>
														    <th class="text-center"><i class="fa fa-arrow-right"></i></th>
														    <th class="text-center">Sede</th>
                                <th class="text-center">Bodega</th>
														    <th class="text-center">Puesto</th>
														  </tr>`);

    //Cuerpo
    var indexRow = document.getElementsByName('indice').length
    for (i=1; i<=indexRow; i++){
      var itemsedeI = document.getElementById('itemsedeI-'+i)
      var itembodegaI = document.getElementById('itembodegaI-'+i)
      var puestoI = document.getElementById('puestoI-'+i)
      var itemIAll = $('select[name=articuloI-'+i+'] + .btn-group > .multiselect')
      var itemI = itemIAll[0].title
      var itemsedeF = document.getElementById('itemsedeF-'+i)
      var itembodegaF = document.getElementById('itembodegaF-'+i)
      var puestoF = document.getElementById('puestoF-'+i)
      // var itemFAll = $('select[name=articuloF-'+i+'] + .btn-group > .multiselect')
      // var itemF = itemFAll[0].title
    	$('#tableModal').append(`<tr class="addr" id="addr` + i + `">
                      <td class="table_number">` + i + `</td>
                        <td>
                          <label>` + itemsedeI.options[ itemsedeI.selectedIndex ].text + `</label>
                        </td>
                        <td>
                        	<label>` + itembodegaI.options[ itembodegaI.selectedIndex ].text + `</label>
                        </td>
                        <td>
                        	<label>` + puestoI.options[ puestoI.selectedIndex ].text + `</label>
                        </td>
                        <td>
                        	<label>` + itemI + `</label>
                        </td>
                        <td><i class="fa fa-arrow-right"></i></td>
                        <td>
                          <label>` + itemsedeF.options[ itemsedeF.selectedIndex ].text + `</label>
                        </td>
                        <td>
                        	<label>` + itembodegaF.options[ itembodegaF.selectedIndex ].text + `</label>
                        </td>
                        <td>
                        	<label>` + puestoF.options[ puestoF.selectedIndex ].text + `</label>
                        </td>
                        </tr>`);
    }
});

$('#cancel').click(function(){
	$('#tableModal').empty()
})

$('#traslado').click(function(){
	$("#confirmTraslado").modal()
})