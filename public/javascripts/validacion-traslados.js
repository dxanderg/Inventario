$(document).ready(function () {

	$('#ingreso-form').bootstrapValidator({
    fields: {
      ticket: {
          validators: {
            numeric: {
              message: 'Numero de Ticket no Valido'
            },
            stringLength: {
              min: 6,
            },
            notEmpty: {
              message: 'Ingrese el Numero de Ticket'
            }
          }
      }
    },
    submitHandler: function(form){
      $("#confirmTraslado").modal()
      $("#cancel").click(function(){
        document.getElementById("traslado").disabled = false
      })
      $('#confirm').click(function(){
        form.submit()
      })
    }
	})
})

