$(document).ready(function() {
	$('#opt-serial').prop('disabled', true)
	$('#opt-plaqueta').prop('disabled', true)
	$('#opt-propietario').prop('disabled', true)
	$('#opt-responsable').prop('disabled', true)
	$('#select-articulo').prop('disabled', true)
	$('#select-tipoarticulo').prop('disabled', true)
	$('#opt-estado').prop('disabled', true)
	$('#opt-sede').prop('disabled', true)

	$('#btn-reporte1').hide()
	$('#btn-reporte2').hide()
	$('#btn-reporte3').hide()
	$('#btn-reporte4').hide()
	$('#btn-reporte5').hide()
	$('#btn-reporte6').hide()
	$('#btn-reporte7').hide()
	$('#btn-reporte8').hide()
})


$('#chk-serial').on('change', function(){
	$('#opt-serial').prop('disabled', false)
	$('#opt-plaqueta').prop('disabled', true)
	$('#opt-propietario').prop('disabled', true)
	$('#opt-responsable').prop('disabled', true)
	$('#select-articulo').prop('disabled', true)
	$('#select-tipoarticulo').prop('disabled', true)
	$('#opt-estado').prop('disabled', true)
	$('#opt-sede').prop('disabled', true)

	$('#btn-reporte1').show()
	$('#btn-reporte2').hide()
	$('#btn-reporte3').hide()
	$('#btn-reporte4').hide()
	$('#btn-reporte5').hide()
	$('#btn-reporte6').hide()
	$('#btn-reporte7').hide()
	$('#btn-reporte8').hide()
})

$('#chk-plaqueta').on('change', function(){
	$('#opt-serial').prop('disabled', true)
	$('#opt-plaqueta').prop('disabled', false)
	$('#opt-propietario').prop('disabled', true)
	$('#opt-responsable').prop('disabled', true)
	$('#select-articulo').prop('disabled', true)
	$('#select-tipoarticulo').prop('disabled', true)
	$('#opt-estado').prop('disabled', true)
	$('#opt-sede').prop('disabled', true)

	$('#btn-reporte1').hide()
	$('#btn-reporte2').show()
	$('#btn-reporte3').hide()
	$('#btn-reporte4').hide()
	$('#btn-reporte5').hide()
	$('#btn-reporte6').hide()
	$('#btn-reporte7').hide()
	$('#btn-reporte8').hide()
})

$('#chk-propietario').on('change', function(){
	$('#opt-serial').prop('disabled', true)
	$('#opt-plaqueta').prop('disabled', true)
	$('#opt-propietario').prop('disabled', false)
	$('#opt-responsable').prop('disabled', true)
	$('#select-articulo').prop('disabled', true)
	$('#select-tipoarticulo').prop('disabled', true)
	$('#opt-estado').prop('disabled', true)
	$('#opt-sede').prop('disabled', true)

	$('#btn-reporte1').hide()
	$('#btn-reporte2').hide()
	$('#btn-reporte3').hide()
	$('#btn-reporte4').show()
	$('#btn-reporte5').hide()
	$('#btn-reporte6').hide()
	$('#btn-reporte7').hide()
	$('#btn-reporte8').hide()
})

$('#chk-responsable').on('change', function(){
	$('#opt-serial').prop('disabled', true)
	$('#opt-plaqueta').prop('disabled', true)
	$('#opt-propietario').prop('disabled', true)
	$('#opt-responsable').prop('disabled', false)
	$('#select-articulo').prop('disabled', true)
	$('#select-tipoarticulo').prop('disabled', true)
	$('#opt-estado').prop('disabled', true)
	$('#opt-sede').prop('disabled', true)

	$('#btn-reporte1').hide()
	$('#btn-reporte2').hide()
	$('#btn-reporte3').show()
	$('#btn-reporte4').hide()
	$('#btn-reporte5').hide()
	$('#btn-reporte6').hide()
	$('#btn-reporte7').hide()
	$('#btn-reporte8').hide()
})

$('#chk-articulo').on('change', function(){
	$('#opt-serial').prop('disabled', true)
	$('#opt-plaqueta').prop('disabled', true)
	$('#opt-propietario').prop('disabled', true)
	$('#opt-responsable').prop('disabled', true)
	$('#select-articulo').prop('disabled', false)
	$('#select-tipoarticulo').prop('disabled', true)
	$('#opt-estado').prop('disabled', true)
	$('#opt-sede').prop('disabled', true)

	$('#btn-reporte1').hide()
	$('#btn-reporte2').hide()
	$('#btn-reporte3').hide()
	$('#btn-reporte4').hide()
	$('#btn-reporte5').show()
	$('#btn-reporte6').hide()
	$('#btn-reporte7').hide()
	$('#btn-reporte8').hide()
})


$('#chk-item').on('change', function(){
	$('#opt-serial').prop('disabled', true)
	$('#opt-plaqueta').prop('disabled', true)
	$('#opt-propietario').prop('disabled', true)
	$('#opt-responsable').prop('disabled', true)
	$('#select-articulo').prop('disabled', true)
	$('#select-tipoarticulo').prop('disabled', false)
	$('#opt-estado').prop('disabled', true)
	$('#opt-sede').prop('disabled', true)

	$('#btn-reporte1').hide()
	$('#btn-reporte2').hide()
	$('#btn-reporte3').hide()
	$('#btn-reporte4').hide()
	$('#btn-reporte5').hide()
	$('#btn-reporte6').show()
	$('#btn-reporte7').hide()
	$('#btn-reporte8').hide()
})

$('#chk-estado').on('change', function(){
	$('#opt-serial').prop('disabled', true)
	$('#opt-plaqueta').prop('disabled', true)
	$('#opt-propietario').prop('disabled', true)
	$('#opt-responsable').prop('disabled', true)
	$('#select-articulo').prop('disabled', true)
	$('#select-tipoarticulo').prop('disabled', true)
	$('#opt-estado').prop('disabled', false)
	$('#opt-sede').prop('disabled', true)

	$('#btn-reporte1').hide()
	$('#btn-reporte2').hide()
	$('#btn-reporte3').hide()
	$('#btn-reporte4').hide()
	$('#btn-reporte5').hide()
	$('#btn-reporte6').hide()
	$('#btn-reporte7').show()
	$('#btn-reporte8').hide()
})

$('#chk-sede').on('change', function(){
	$('#opt-serial').prop('disabled', true)
	$('#opt-plaqueta').prop('disabled', true)
	$('#opt-propietario').prop('disabled', true)
	$('#opt-responsable').prop('disabled', true)
	$('#select-articulo').prop('disabled', true)
	$('#select-tipoarticulo').prop('disabled', true)
	$('#opt-estado').prop('disabled', true)
	$('#opt-sede').prop('disabled', false)

	$('#btn-reporte1').hide()
	$('#btn-reporte2').hide()
	$('#btn-reporte3').hide()
	$('#btn-reporte4').hide()
	$('#btn-reporte5').hide()
	$('#btn-reporte6').hide()
	$('#btn-reporte7').hide()
	$('#btn-reporte8').show()
})