$('#btnBuscarH').on('click', function(){
	var fechaI = $('#date1').val()
	var fechaF = $('#date2').val()
	$.ajax({
      url: '/api-notificaciones/'+fechaI+'/'+fechaF,
      contentType: 'application/json',
      success: function(response) {
      	console.log(response)
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