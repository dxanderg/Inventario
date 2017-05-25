// $('#addr1').addClass('hidden-xs-up')
// $('#addr2').addClass('hidden-xs-up')
// $('#addr3').addClass('hidden-xs-up')
// $('#addr4').addClass('hidden-xs-up')
// $('#addr5').addClass('hidden-xs-up')
// $('#addr6').addClass('hidden-xs-up')
// $('#addr7').addClass('hidden-xs-up')
// $('#addr8').addClass('hidden-xs-up')
// $('#addr9').addClass('hidden-xs-up')


// for (var i =2; i< 20; i++){
// 		$('#dropdown' + i).hide()
// 		$('#uldrop' + i).hide()
// 		$('#itemInicio' + i).hide()
// 		$('#itemDestino' + i).hide()
// 	}
var f = 2

$('#add_row').click(function(){
	$('#dropdown2, #uldrop, #itemInicio2, #itemDestino2').dropdown()		
	
	// $('#addr2').removeClass('hidden-xs-up')
})


(function($) {
	$(function() {
		$('#dropdown1, #uldrop, #itemInicio1, #itemDestino1').dropdown()
	})
}(jQuery));





// $('#dropdown1, #uldrop, .selectItem').dropdown()