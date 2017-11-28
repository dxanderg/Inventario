$(document).ready(function() {
	$('#opt-serial').prop('disabled', true)	
	$('#opt-plaqueta').prop('disabled', true)	
	$('#opt-propietario').prop('disabled', true)	
	$('#opt-responsable').prop('disabled', true)	
	$('#select-articulo').prop('disabled', true)	
	$('#select-tipoarticulo').prop('disabled', true)	
	$('#opt-estado').prop('disabled', true)	
	$('#opt-sede').prop('disabled', true)
})

// $("input[type='radio']").on('click', function(){
// 	alert('ok')
// })

$('#chk-serial').on('change', function(){
	console.log(this)
	if ($(this).is(':checked')) {
		$('#opt-serial').prop('disabled', false)
  }
  else{
  	$('#opt-serial').prop('disabled', true)	
  }
})

$('#chk-plaqueta').on('change', function(){
	if ($(this).is(':checked')) {
		$('#opt-plaqueta').prop('disabled', false)
  }
  else{
  	$('#opt-plaqueta').prop('disabled', true)	
  }
})

$('#chk-propietario').on('change', function(){
	if ($(this).is(':checked')) {
		$('#opt-propietario').prop('disabled', false)
  }
  else{
  	$('#opt-propietario').prop('disabled', true)	
  }
})

$('#chk-responsable').on('change', function(){
	if ($(this).is(':checked')) {
		$('#opt-responsable').prop('disabled', false)
  }
  else{
  	$('#opt-responsable').prop('disabled', true)	
  }
})

$('#chk-articulo').on('change', function(){
	if ($(this).is(':checked')) {
		$('#select-articulo').prop('disabled', false)
  }
  else{
  	$('#select-articulo').prop('disabled', true)	
  }
})


$('#chk-item').on('change', function(){
	if ($(this).is(':checked')) {
		$('#select-tipoarticulo').prop('disabled', false)
  }
  else{
  	$('#select-tipoarticulo').prop('disabled', true)	
  }
})

$('#chk-estado').on('change', function(){
	if ($(this).is(':checked')) {
		$('#opt-estado').prop('disabled', false)
  }
  else{
  	$('#opt-estado').prop('disabled', true)	
  }
})

$('#chk-sede').on('change', function(){
	if ($(this).is(':checked')) {
		$('#opt-sede').prop('disabled', false)
  }
  else{
  	$('#opt-sede').prop('disabled', true)	
  }
})