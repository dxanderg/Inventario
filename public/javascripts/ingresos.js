$( document ).ready(function(){
	for (var i =1; i< 10; i++){
		$('select[name="select-bodega' + i + '"]').hide()
	}
	$('select[name="select-bodega1"]').show()
	$('select[name="select-bodega1"]').addClass('active')

	for (var j =1; j< 15; j++){
		$('select[name="select-posicion' + j + '"]').hide()
	}	
	$('select[name="select-posicion1"]').show()
	$('select[name="select-posicion1"]').addClass('active')

})

$('#select-sede').change(function(){
    $('select[name="select-bodega' + $(this).val() + '"]').show()
    $('select[name="select-bodega' + $(this).val() + '"]').addClass('active')
    
    $('.select-bodegas[name!="select-bodega' + $(this).val() + '"]').hide()
		$('.select-bodegas[name!="select-bodega' + $(this).val() + '"]').removeClass('active')
})

$('.select-bodegas').change(function(){
	var bod = $('#contenido').find('.active').val()
	$('select[name="select-posicion' + bod + '"]').show()
	$('select[name="select-posicion' + bod + '"]').addClass('active')

	$('.select-posiciones[name!="select-posicion' + bod + '"]').hide()
	$('.select-posiciones[name!="select-posicion' + bod + '"]').removeClass('active')	

})

$('#btn-registrar').click(function(){
		var a = $('#select-articulo :selected').val()
		var b = $('#inputSerial').val()
		var c = $('#inputPlaqueta').val()
		var d = $("#select-estado :selected").val()
    var e = $("#select-sede :selected").val()
    var f = $(".select-bodegas.active :selected").val()
    var g = $(".select-posiciones.active :selected").val()

    alert(a + ' ' + b +' ' + c + ' ' + d + ' ' + e +' ' + f + ' ' + g)
})