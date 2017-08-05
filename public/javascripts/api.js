$(function(){
	$('#id_posicion').on('keyup', function(e){
   if(e.keyCode === 13) {
		 $.ajax({
	            url: '/api',
	            contentType: 'application/json',
	            success: function(response) {
	              var tbodyEl = $('#results');
	                tbodyEl.html('');
	                tbodyEl.append('<h2>' + response.message + '<h2>');	                
	            }
	          })
	  }
	})
})

	// $('#id_posicion').on('keyup', function(e){
 //   if(e.keyCode === 13) {
 //     var parameters = { id_posicion: $(this).val() };
 //       $.get( '/api',parameters, function(data) {
 //       $('#results').html(data);
 //     });
 //    };
 // });