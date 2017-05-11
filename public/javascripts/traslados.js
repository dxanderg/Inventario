$( document ).ready(function(){
	
	for (var j =1; j< 15; j++){
		$('select.sp' + j).hide()
		$('select.sp' + j).attr('disabled', '')
	}	
	$('select.sp1').show()
	$('select.sp1').addClass('active')

})

$('#select-bodega').change(function(){
		$('.select-posiciones.sp' + $(this).val()).show()
		$('.select-posiciones.sp' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posiciones:not(.sp' + $(this).val()).hide()
    $('select.select-posiciones:not(.sp' + $(this).val()).removeClass('active')
    $('select.select-posiciones:not(.sp' + $(this).val()).attr('disabled', '')
})

$('.select-bodegas').change(function(){
		var bod = $('select.select-bodegas :selected').val()
		$('select.sp' + bod).show()
		$('select.sp' + bod).removeAttr('disabled', '')

		$('select.select-posiciones:not(.sp' + $(this).val()).hide()
    $('select.select-posiciones:not(.sp' + $(this).val()).removeClass('active')
    $('select.select-posiciones:not(.sp' + $(this).val()).attr('disabled', '')
})

