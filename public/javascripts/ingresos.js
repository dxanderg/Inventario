$( document ).ready(function(){
	for (var i =1; i< 10; i++){
		$('select.sb' + i).hide()
		$('select.sb' + i).attr('disabled', '')
		//$('select[name="select-bodega' + i + '"]').hide()
		//$('select[name="select-bodega' + i + '"]').attr('disabled', '')
	}
	$('select.sb1').show()
	$('select.sb1').addClass('active')
	//$('select[name="select-bodega1"]').show()
	//$('select[name="select-bodega1"]').addClass('active')

	for (var j =1; j< 15; j++){
		$('select.sp' + j).hide()
		$('select.sp' + j).attr('disabled', '')
		// $('select[name="select-posicion' + j + '"]').hide()
		// $('select[name="select-posicion' + j + '"]').attr('disabled', '')
	}	
	$('select.sp1').show()
	$('select.sp1').addClass('active')

	// $('select[name="select-posicion1"]').show()
	// $('select[name="select-posicion1"]').addClass('active')

})

$('#select-sede').change(function(){
		$('select.sb' + $(this).val()).show()
		$('select.sb' + $(this).val()).removeAttr('disabled', '')
    // $('select[name="select-bodega' + $(this).val() + '"]').show()
    // $('select[name="select-bodega' + $(this).val() + '"]').addClass('active')
    // $('select[name="select-bodega' + $(this).val() + '"]').removeAttr('disabled', '')
    
    $('select.select-bodegas:not(.sb' + $(this).val()).hide()
    $('select.select-bodegas:not(.sb' + $(this).val()).removeClass('active')
    $('select.select-bodegas:not(.sb' + $(this).val()).attr('disabled', '')
  	// $('.select-bodegas[name!="select-bodega' + $(this).val() + '"]').hide()
		// $('.select-bodegas[name!="select-bodega' + $(this).val() + '"]').removeClass('active')
		// $('.select-bodegas[name!="select-bodega' + $(this).val() + '"]').attr('disabled', '')
	
})

$('.select-bodegas').change(function(){
		var bod = $('select.select-bodegas :selected').val()
		$('select.sp' + bod).show()
		$('select.sp' + bod).removeAttr('disabled', '')
	// $('select[name="select-posicion' + bod + '"]').show()
	// $('select[name="select-posicion' + bod + '"]').addClass('active')
	// $('select[name="select-posicion' + bod + '"]').removeAttr('disabled', '')
		
		$('select.select-posiciones:not(.sp' + $(this).val()).hide()
    $('select.select-posiciones:not(.sp' + $(this).val()).removeClass('active')
    $('select.select-posiciones:not(.sp' + $(this).val()).attr('disabled', '')
	// $('.select-posiciones[name!="select-posicion' + bod + '"]').hide()
	// $('.select-posiciones[name!="select-posicion' + bod + '"]').removeClass('active')	
	// $('.select-posiciones[name!="select-posicion' + bod + '"]').attr('disabled', '')
	
})

$('#btn-registrar').click(function(){
		var a = $('#select-articulo :selected').val()
		var b = $('#inputSerial').val()
		var c = $('#inputPlaqueta').val()
		var d = $("#select-estado :selected").val()
    var e = $("#select-sede :selected").val()
    var f = $(".select-bodegas.active :selected").val()
    var g = $(".select-posiciones.active :selected").val()

    //alert(a + ' ' + b +' ' + c + ' ' + d + ' ' + e +' ' + f + ' ' + g)
})