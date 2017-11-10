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
        $('#tableModal').html('')
        $('#tableModal').append(`<thead class="table-head thead-inverse">
                              <tr>
                                <th class="text-center">Id Puesto</th>
                                <th class="text-center">Sede</th>
                                <th class="text-center">Ubicacion</th>
                                <th class="text-center">Puesto</th>
                                <th class="text-center">Campaña</th>
                              </tr>`);

      	var tablaModal = $('#tableModal')

      	var row = tableModal.insertRow(1)
      	var cell1 = row.insertCell(0)
				var cell2 = row.insertCell(1)
				var cell3 = row.insertCell(2)
				var cell4 = row.insertCell(3)
				var cell5 = row.insertCell(4)

      	
      	cell1.innerHTML = response.data[0].id_puesto
      	cell2.innerHTML = response.data[0].nombre_sede
      	cell3.innerHTML = response.data[0].nombre_bodega
      	cell4.innerHTML = response.data[0].posicion
      	cell5.innerHTML = `<select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="selectCampaign">
                              <option selected>Campaña</option>
                          </select>`

        var listCampaign = $('#selectCampaign')
        for(i=0; i<response.data2.length; i++){
          var opt = document.createElement('option')
          opt.value = response.data2[i].id_campaign
          opt.innerHTML = response.data2[i].CECO + ' - ' + response.data2[i].nombre_campaign
          listCampaign.append(opt)
        }


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