$( document ).ready(function(){
	
	for (var j =1; j< 17; j++){
		$('select.spI' + j).hide()
		$('select.spF' + j).hide()
		$('select.spI' + j).attr('disabled', '')
		$('select.spF' + j).attr('disabled', '')
	}	
	$('select.spI1').show()
	$('select.spF1').show()
	$('select.spI1').addClass('active')
	$('select.spF1').addClass('active')

})

$('#itembodegaI').change(function(){
		$('.select-posicionesI.spI' + $(this).val()).show()
		$('.select-posicionesI.spI' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesI:not(.spI' + $(this).val()).hide()
    $('select.select-posicionesI:not(.spI' + $(this).val()).removeClass('active')
    $('select.select-posicionesI:not(.spI' + $(this).val()).attr('disabled', '')
})

$('#itembodegaF').change(function(){
		$('.select-posicionesF.spF' + $(this).val()).show()
		$('.select-posicionesF.spF' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesF:not(.spF' + $(this).val()).hide()
    $('select.select-posicionesF:not(.spF' + $(this).val()).removeClass('active')
    $('select.select-posicionesF:not(.spF' + $(this).val()).attr('disabled', '')
})


