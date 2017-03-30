$( document ).ready(function(){
	for (var i =0; i< 10; i++){
		$('select[name="select-bodega' + i + '"]').hide();
	}
	$('select[name="select-bodega1"]').show();
})

$('#select-sede').change(function(){
    $('select[name="select-bodega' + $(this).val() + '"]').show();
    $('select[name="select-bodega' + $(this).val() + '"]').addClass('active');
		$('.select-bodegas[name!="select-bodega' + $(this).val() + '"]').hide();
		$('.select-bodegas[name!="select-bodega' + $(this).val() + '"]').removeClass('active');
});

$('#btn-registrar').click(function(){
    var selects = $('#contenido').find('.active').val()
    alert(selects)
});