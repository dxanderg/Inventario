$(document).ready(function () {

  $('#ingreso-form').submit(function() { 
    // var respuesta = document.getElementsByClassName('selectUbicacion')
    // var respuesta1 = document.getElementsByClassName('selectPuesto')
    // var respuesta2 = document.getElementsByClassName('selectItem')
    // for (i=1; i<respuesta.length;){
    //   if(respuesta[i].value == " " || respuesta1[i].value == " " || respuesta2[i].value == " "){
    //     alert('Complete todos los campos');
    //     i++;
    //     return false;
    //   }
    // }
    // document.getElementById('#traslado').disabled = false;
    // var a = document.getElementById('#itembodegaI-1').value
    // var aa = a.options[a.selectedIndex].value
    // var b = document.getElementById('#puestoI-1').value
    // var bb = b.options[b.selectedIndex].value
    // var c = document.getElementById('#itemI-1').value
    // var cc = c.options[c.selectedIndex].value
    // console.log(aa)
    // console.log(bb)
    // console.log(cc)
    // alert('dd')
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
      },
      'puestoI-1': {
          validators: {
              notEmpty: {
                message: 'Ingrese la Ubicaion '
              }
          }
      }
    }
	})
})
	