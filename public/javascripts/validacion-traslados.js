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
    }
	})
})

