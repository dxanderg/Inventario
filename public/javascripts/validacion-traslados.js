$(document).ready(function () {

  $('#ingreso-form').submit(function() { 
    var respuesta = document.getElementsByClassName('selectUbicacion')
    var respuesta1 = document.getElementsByClassName('selectPuesto')
    var respuesta2 = document.getElementsByClassName('selectItem')
    for (i=1; i<respuesta.length;){
      if(respuesta[i].value == " " || respuesta1[i].value == " " || respuesta2[i].value == " "){
        alert('Complete todos los campos');
        i++;
        return false;
      }
    }
    document.getElementById('#traslado').disabled = false;
  })


	$('#ingreso-form').bootstrapValidator({
    fields: {
      ticket: {
          validators: {
            stringLength: {
              min: 6,
            },
            notEmpty: {
              message: 'Ingrese el Numero de Ticket '
            }
          }
      }
    }
	})
})
	