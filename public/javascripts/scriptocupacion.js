var id = 0

$('.editar').click(function(){
	id = this.children[0].id
	$("#confirmCampaign").modal()
})

$('#confirmCampaign').on('show.bs.modal', function(e) {
	$.ajax({
      url: '/api-ocupacion/' + id,
      contentType: 'application/json',
      success: function(response) {
      	console.log(response)

      	var tablaModal = $('#tableModal')
      	var row = tableModal.insertRow(0)
      	var cell1 = row.insertCell(0)
				var cell2 = row.insertCell(1)
				var cell3 = row.insertCell(2)
				var cell4 = row.insertCell(3)
				var cell5 = row.insertCell(4)

      	// var opt = document.createElement('label')
      	// opt.innerHTML = response.data[0].nombre_bodega
      	
      	cell1.innerHTML = response.data[0].nombre_sede
      	cell2.innerHTML = response.data[0].nombre_bodega
      	cell3.innerHTML = response.data[0].posicion
      	cell4.innerHTML = response.data[0].nombre_bodega
      	cell5.innerHTML = response.data[0].nombre_bodega
      	// tablaModal.append(opt)
        // var selectItems = $(pos + id);
        // selectItems.html('');
        // for(i=0; i<response.data.length; i++){
        // 	var opt = document.createElement('option');
        // 	opt.value = response.data[i].id_articulos;
        // 	opt.innerHTML = response.data[i].nombre_item + ': ' + response.data[i].plaqueta_art;
        // 	selectItems.append(opt);
        // }
        // renderSelects(selectItems)
      }
    })
})