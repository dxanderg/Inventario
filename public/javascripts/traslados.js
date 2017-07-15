$( document ).ready(function(){
	
	for (var k = 1; k < 11; k++){
		for (var j =1; j< 17; j++){
			$('select.spI' + k + '-' + j).hide()
			$('select.spF' + k + '-' + j).hide()
			$('select.spI' + k + '-' + j).attr('disabled', '')
			$('select.spF' + k + '-' + j).attr('disabled', '')
		}
	}
	$('select.spI1-1').show()
	$('select.spF1-1').show()
	$('select.spI1-1').addClass('active')
	$('select.spF1-1').addClass('active')

})

$('#itembodegaI1').change(function(){
		$('.select-posicionesI1.spI1-' + $(this).val()).show()
		$('.select-posicionesI1.spI1-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesI1:not(.spI1-' + $(this).val()).hide()
    $('select.select-posicionesI1:not(.spI1-' + $(this).val()).removeClass('active')
    $('select.select-posicionesI1:not(.spI1-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaI2').change(function(){
		$('.select-posicionesI2.spI2-' + $(this).val()).show()
		$('.select-posicionesI2.spI2-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesI2:not(.spI2-' + $(this).val()).hide()
    $('select.select-posicionesI2:not(.spI2-' + $(this).val()).removeClass('active')
    $('select.select-posicionesI2:not(.spI2-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaI3').change(function(){
		$('.select-posicionesI3.spI3-' + $(this).val()).show()
		$('.select-posicionesI3.spI3-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesI3:not(.spI3-' + $(this).val()).hide()
    $('select.select-posicionesI3:not(.spI3-' + $(this).val()).removeClass('active')
    $('select.select-posicionesI3:not(.spI3-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaI4').change(function(){
		$('.select-posicionesI4.spI4-' + $(this).val()).show()
		$('.select-posicionesI4.spI4-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesI4:not(.spI4-' + $(this).val()).hide()
    $('select.select-posicionesI4:not(.spI4-' + $(this).val()).removeClass('active')
    $('select.select-posicionesI4:not(.spI4-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaI5').change(function(){
		$('.select-posicionesI5.spI5-' + $(this).val()).show()
		$('.select-posicionesI5.spI5-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesI5:not(.spI5-' + $(this).val()).hide()
    $('select.select-posicionesI5:not(.spI5-' + $(this).val()).removeClass('active')
    $('select.select-posicionesI5:not(.spI5-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaI6').change(function(){
		$('.select-posicionesI6.spI6-' + $(this).val()).show()
		$('.select-posicionesI6.spI6-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesI6:not(.spI6-' + $(this).val()).hide()
    $('select.select-posicionesI6:not(.spI6-' + $(this).val()).removeClass('active')
    $('select.select-posicionesI6:not(.spI6-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaI7').change(function(){
		$('.select-posicionesI7.spI7-' + $(this).val()).show()
		$('.select-posicionesI7.spI7-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesI7:not(.spI7-' + $(this).val()).hide()
    $('select.select-posicionesI7:not(.spI7-' + $(this).val()).removeClass('active')
    $('select.select-posicionesI7:not(.spI7-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaI8').change(function(){
		$('.select-posicionesI8.spI8-' + $(this).val()).show()
		$('.select-posicionesI8.spI8-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesI8:not(.spI8-' + $(this).val()).hide()
    $('select.select-posicionesI8:not(.spI8-' + $(this).val()).removeClass('active')
    $('select.select-posicionesI8:not(.spI8-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaI9').change(function(){
		$('.select-posicionesI9.spI9-' + $(this).val()).show()
		$('.select-posicionesI9.spI9-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesI9:not(.spI9-' + $(this).val()).hide()
    $('select.select-posicionesI9:not(.spI9-' + $(this).val()).removeClass('active')
    $('select.select-posicionesI9:not(.spI9-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaI10').change(function(){
		$('.select-posicionesI10.spI10-' + $(this).val()).show()
		$('.select-posicionesI10.spI10-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesI10:not(.spI10-' + $(this).val()).hide()
    $('select.select-posicionesI10:not(.spI10-' + $(this).val()).removeClass('active')
    $('select.select-posicionesI10:not(.spI10-' + $(this).val()).attr('disabled', '')
})

/*******************************************************************************************************************/
/*******************************************************************************************************************/
/*******************************************************************************************************************/
/*******************************************************************************************************************/
/*******************************************************************************************************************/
/*******************************************************************************************************************/


$('#itembodegaF1').change(function(){
		$('.select-posicionesF1.spF1-' + $(this).val()).show()
		$('.select-posicionesF1.spF1-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesF1:not(.spF1-' + $(this).val()).hide()
    $('select.select-posicionesF1:not(.spF1-' + $(this).val()).removeClass('active')
    $('select.select-posicionesF1:not(.spF1-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaF2').change(function(){
		$('.select-posicionesF2.spF2-' + $(this).val()).show()
		$('.select-posicionesF2.spF2-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesF2:not(.spF2-' + $(this).val()).hide()
    $('select.select-posicionesF2:not(.spF2-' + $(this).val()).removeClass('active')
    $('select.select-posicionesF2:not(.spF2-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaF3').change(function(){
		$('.select-posicionesF3.spF3-' + $(this).val()).show()
		$('.select-posicionesF3.spF3-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesF3:not(.spF3-' + $(this).val()).hide()
    $('select.select-posicionesF3:not(.spF3-' + $(this).val()).removeClass('active')
    $('select.select-posicionesF3:not(.spF3-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaF4').change(function(){
		$('.select-posicionesF4.spF4-' + $(this).val()).show()
		$('.select-posicionesF4.spF4-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesF4:not(.spF4-' + $(this).val()).hide()
    $('select.select-posicionesF4:not(.spF4-' + $(this).val()).removeClass('active')
    $('select.select-posicionesF4:not(.spF4-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaF5').change(function(){
		$('.select-posicionesF5.spF5-' + $(this).val()).show()
		$('.select-posicionesF5.spF5-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesF5:not(.spF5-' + $(this).val()).hide()
    $('select.select-posicionesF5:not(.spF5-' + $(this).val()).removeClass('active')
    $('select.select-posicionesF5:not(.spF5-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaF6').change(function(){
		$('.select-posicionesF6.spF6-' + $(this).val()).show()
		$('.select-posicionesF6.spF6-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesF6:not(.spF6-' + $(this).val()).hide()
    $('select.select-posicionesF6:not(.spF6-' + $(this).val()).removeClass('active')
    $('select.select-posicionesF6:not(.spF6-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaF7').change(function(){
		$('.select-posicionesF7.spF7-' + $(this).val()).show()
		$('.select-posicionesF7.spF7-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesF7:not(.spF7-' + $(this).val()).hide()
    $('select.select-posicionesF7:not(.spF7-' + $(this).val()).removeClass('active')
    $('select.select-posicionesF7:not(.spF7-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaF8').change(function(){
		$('.select-posicionesF8.spF8-' + $(this).val()).show()
		$('.select-posicionesF8.spF8-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesF8:not(.spF8-' + $(this).val()).hide()
    $('select.select-posicionesF8:not(.spF8-' + $(this).val()).removeClass('active')
    $('select.select-posicionesF8:not(.spF8-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaF9').change(function(){
		$('.select-posicionesF9.spF9-' + $(this).val()).show()
		$('.select-posicionesF9.spF9-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesF9:not(.spF9-' + $(this).val()).hide()
    $('select.select-posicionesF9:not(.spF9-' + $(this).val()).removeClass('active')
    $('select.select-posicionesF9:not(.spF9-' + $(this).val()).attr('disabled', '')
})
$('#itembodegaF10').change(function(){
		$('.select-posicionesF10.spF10-' + $(this).val()).show()
		$('.select-posicionesF10.spF10-' + $(this).val()).removeAttr('disabled', '')
		//alert($(this).val())
		
    $('select.select-posicionesF10:not(.spF10-' + $(this).val()).hide()
    $('select.select-posicionesF10:not(.spF10-' + $(this).val()).removeClass('active')
    $('select.select-posicionesF10:not(.spF10-' + $(this).val()).attr('disabled', '')
})


