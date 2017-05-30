(function($) {
	$(function() {
		$('#dropdown1, #uldrop, #itemInicio1, #itemDestino1').dropdown()
	})
}(jQuery));

$('#add_row').click(function(){
	if ($('#addr1').hasClass('hidden-xs-up')){
		$('#dropdown2, #uldrop, #itemInicio2, #itemDestino2').dropdown()
		$('#addr1').removeClass('hidden-xs-up')	
	}
	else if ($('#addr2').hasClass('hidden-xs-up')){
		$('#dropdown3, #uldrop, #itemInicio3, #itemDestino3').dropdown()
		$('#addr2').removeClass('hidden-xs-up')	
	}
	else if ($('#add3').hasClass('hidden-xs-up')){
		$('#dropdown4, #uldrop, #itemInicio4, #itemDestino4').dropdown()
		$('#addr3').removeClass('hidden-xs-up')	
	}
	else if ($('#addr4').hasClass('hidden-xs-up')){
		$('#dropdown5, #uldrop, #itemInicio5, #itemDestino5').dropdown()
		$('#addr4').removeClass('hidden-xs-up')	
	}
	else if ($('#addr5').hasClass('hidden-xs-up')){
		$('#dropdown6, #uldrop, #itemInicio6, #itemDestino6').dropdown()
		$('#addr5').removeClass('hidden-xs-up')	
	}
	else if ($('#addr6').hasClass('hidden-xs-up')){
		$('#dropdown7, #uldrop, #itemInicio7, #itemDestino7').dropdown()
		$('#addr6').removeClass('hidden-xs-up')	
	}
	else if ($('#addr7').hasClass('hidden-xs-up')){
		$('#dropdown8, #uldrop, #itemInicio8, #itemDestino8').dropdown()
		$('#addr7').removeClass('hidden-xs-up')	
	}
	else if ($('#addr8').hasClass('hidden-xs-up')){
		$('#dropdown9, #uldrop, #itemInicio9, #itemDestino9').dropdown()
		$('#addr8').removeClass('hidden-xs-up')	
	}
	else if ($('#addr9').hasClass('hidden-xs-up')){
		$('#dropdown10, #uldrop, #itemInicio10, #itemDestino10').dropdown()
		$('#addr9').removeClass('hidden-xs-up')	
	}
})


$('#delete_row').click(function(){
	if (!$('#addr9').hasClass('hidden-xs-up')){
		$('#addr9').addClass('hidden-xs-up')	
	}
	else if ($('#addr2').hasClass('hidden-xs-up')){
		$('#dropdown3, #uldrop, #itemInicio3, #itemDestino3').dropdown()
		$('#addr2').removeClass('hidden-xs-up')	
	}
	else if ($('#add3').hasClass('hidden-xs-up')){
		$('#dropdown4, #uldrop, #itemInicio4, #itemDestino4').dropdown()
		$('#addr3').removeClass('hidden-xs-up')	
	}
	else if ($('#addr4').hasClass('hidden-xs-up')){
		$('#dropdown5, #uldrop, #itemInicio5, #itemDestino5').dropdown()
		$('#addr4').removeClass('hidden-xs-up')	
	}
	else if ($('#addr5').hasClass('hidden-xs-up')){
		$('#dropdown6, #uldrop, #itemInicio6, #itemDestino6').dropdown()
		$('#addr5').removeClass('hidden-xs-up')	
	}
	else if ($('#addr6').hasClass('hidden-xs-up')){
		$('#dropdown7, #uldrop, #itemInicio7, #itemDestino7').dropdown()
		$('#addr6').removeClass('hidden-xs-up')	
	}
	else if ($('#addr7').hasClass('hidden-xs-up')){
		$('#dropdown8, #uldrop, #itemInicio8, #itemDestino8').dropdown()
		$('#addr7').removeClass('hidden-xs-up')	
	}
	else if ($('#addr8').hasClass('hidden-xs-up')){
		$('#dropdown9, #uldrop, #itemInicio9, #itemDestino9').dropdown()
		$('#addr8').removeClass('hidden-xs-up')	
	}
	else if ($('#addr9').hasClass('hidden-xs-up')){
		$('#dropdown10, #uldrop, #itemInicio10, #itemDestino10').dropdown()
		$('#addr9').removeClass('hidden-xs-up')	
	}
})

$('#addr1').addClass('hidden-xs-up')
$('#addr2').addClass('hidden-xs-up')
$('#addr3').addClass('hidden-xs-up')
$('#addr4').addClass('hidden-xs-up')
$('#addr5').addClass('hidden-xs-up')
$('#addr6').addClass('hidden-xs-up')
$('#addr7').addClass('hidden-xs-up')
$('#addr8').addClass('hidden-xs-up')
$('#addr9').addClass('hidden-xs-up')



// $('#dropdown1, #uldrop, .selectItem').dropdown()