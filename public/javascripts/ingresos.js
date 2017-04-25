$( document ).ready(function(){
	for (var i =1; i< 10; i++){
		$('select.sb' + i).hide()
		$('select.sb' + i).attr('disabled', '')
	}
	$('select.sb1').show()
	$('select.sb1').addClass('active')
	
	for (var j =1; j< 15; j++){
		$('select.sp' + j).hide()
		$('select.sp' + j).attr('disabled', '')
	}	
	$('select.sp1').show()
	$('select.sp1').addClass('active')

	//******************************************//

	for (var a =1; a< 10; a++){
		$('select.sba' + a).hide()
		$('select.sba' + a).attr('disabled', '')
	}
	$('select.sba1').show()
	$('select.sba1').addClass('active')
	$('select.sba1').removeAttr('disabled', '')
	
	for (var b =1; b< 15; b++){
		$('select.spa' + b).hide()
		$('select.spa' + b).attr('disabled', '')
	}	
	$('select.spa1').show()
	$('select.spa1').addClass('active')
	$('select.spa1').removeAttr('disabled', '')
})

$('#select-sede').change(function(){
		$('select.sb' + $(this).val()).show()
		$('select.sb' + $(this).val()).removeAttr('disabled', '')

		//*******************************************************************
		$('select.sba' + $(this).val()).show()
		$('select.sba' + $(this).val()).removeAttr('disabled', '')
		//*******************************************************************
    
    $('select.select-bodegas:not(.sb' + $(this).val()).hide()
    $('select.select-bodegas:not(.sb' + $(this).val()).removeClass('active')
    $('select.select-bodegas:not(.sb' + $(this).val()).attr('disabled', '')	

    //*******************************************************************
    $('select.select-bodegasa:not(.sba' + $(this).val()).hide()
    $('select.select-bodegasa:not(.sba' + $(this).val()).removeClass('active')
    $('select.select-bodegasa:not(.sba' + $(this).val()).attr('disabled', '')	
    //*******************************************************************
})

$('.select-bodegas').change(function(){
		var bod = $('select.select-bodegas :selected').val()
		$('select.sp' + bod).show()
		$('select.sp' + bod).removeAttr('disabled', '')

		$('select.select-posiciones:not(.sp' + $(this).val()).hide()
    $('select.select-posiciones:not(.sp' + $(this).val()).removeClass('active')
    $('select.select-posiciones:not(.sp' + $(this).val()).attr('disabled', '')
})

$('.select-bodegasa').change(function(){
		var bod = $('select.select-bodegasa :selected').val()
		
		$('select.spa' + bod).show()
		$('select.spa' + bod).removeAttr('disabled', '')
		
		$('select.select-posiciones:not(.spa' + $(this).val()).hide()
    $('select.select-posiciones:not(.spa' + $(this).val()).removeClass('active')
    $('select.select-posiciones:not(.spa' + $(this).val()).attr('disabled', '')
		
})

$('#btn-registrar').click(function(){

})