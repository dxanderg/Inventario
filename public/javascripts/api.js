$(function(){
	//API request para consultar los articulos en un posicion X(Posicion Inicial)
	$('#puestoI').on('change', function(e){
   	var parameters = $(this).val()
		$.ajax({
	      url: '/api/' + parameters,
	      contentType: 'application/json',
	      success: function(response) {
	        var selectItems = $('#itemI');
	          selectItems.html('');
	          for(i=0; i<response.data.length; i++){
	          	var opt = document.createElement('option');
            	opt.value = response.data[i].id_posicion;
            	opt.innerHTML = response.data[i].nombre_item + ' ' + response.data[i].plaqueta_art;
            	selectItems.append(opt);
	          }
	      }
	    })
	})
		//API request para consultar los articulos en un posicion X(Posicion Final)
	$('#puestoF').on('change', function(e){
   	var parameters = $(this).val()
		$.ajax({
	      url: '/api/' + parameters,
	      contentType: 'application/json',
	      success: function(response) {
	        var selectItems = $('#itemF');
	          selectItems.html('');
	          for(i=0; i<response.data.length; i++){
	          	var opt = document.createElement('option');
            	opt.value = response.data[i].id_posicion;
            	opt.innerHTML = response.data[i].nombre_item + ' ' + response.data[i].plaqueta_art;
            	selectItems.append(opt);
	          }
	      }
	    })
	})

	//API request para consultar los puestos en una bodega X(Posicion Inicial)
	$('#itembodegaI').on('change', function(e){
   	var parameters1 = $(this).val()
		$.ajax({
	      url: '/api-puestos/' + parameters1,
	      contentType: 'application/json',
	      success: function(response) {
	        var selectItems = $('#puestoI');
	          selectItems.html('');
	          for(i=0; i<response.data.length; i++){
	          	var opt = document.createElement('option');
            	opt.value = response.data[i].id_puesto;
            	opt.innerHTML = 'Puesto ' + response.data[i].posicion;
            	selectItems.append(opt);
	          }
	      }
	    })
	})
	//API request para consultar los puestos en una bodega X(Posicion Final)
	$('#itembodegaF').on('change', function(e){
   	var parameters1 = $(this).val()
		$.ajax({
	      url: '/api-puestos/' + parameters1,
	      contentType: 'application/json',
	      success: function(response) {
	        var selectItems = $('#puestoF');
	          selectItems.html('');
	          for(i=0; i<response.data.length; i++){
	          	var opt = document.createElement('option');
            	opt.value = response.data[i].id_puesto;
            	opt.innerHTML = 'Puesto ' + response.data[i].posicion;
            	selectItems.append(opt);
	          }
	      }
	    })
	})
})





//Example
	// $('#id_posicion').on('keyup', function(e){
 //   if(e.keyCode === 13) {
 //   	var parameters = $(this).val()
	// 	$.ajax({
	//       url: '/api/' + parameters,
	//       contentType: 'application/json',
	//       success: function(response) {
	//         var selectItems = $('#results');
	//           selectItems.html('');
	//           for(i=0; i<response.data.length; i++){
	//           	console.log(response.data[i].nombre_item)
	//           	selectItems.append('<option>' + response.data[i].nombre_item + ': ' + response.data[i].plaqueta_art + '</option>');
	//           }
	//       }
	//     })
	//   }
	// })