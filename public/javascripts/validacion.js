$(document).ready(function () {
	$('#ingreso-form').bootstrapValidator({
    fields: {
      serial: {
        validators: {
          stringLength: {
          	min: 6,
        	},
          notEmpty: {
          	message: 'Por favor digite el serial'
        	}
        }
      },
      plaqueta: {
        validators: {
          stringLength: {
          	min: 6,
        	},
          notEmpty: {
          	message: 'Por favor digite el numero de plaqueta'
        	},
          digits: {
            message: 'Solo puede contener numeros'
          }
        }
      },
      fecha: {
        validators: {
          stringLength: {
          	min: 10,
        	},
          notEmpty: {
          	message: 'Por favor digite la fecha'
        	}
        }
      },
      articulo: {
          validators: {
            stringLength: {
              min: 1,
            },
            notEmpty: {
                message: 'Por favor seleccione el articulo'
            }
          }
      },
      estado: {
          validators: {
              notEmpty: {
                  message: 'Por favor seleccion el estado'
              }
          }
      },
      sede: {
          validators: {
              notEmpty: {
                  message: 'Por favor seleccione la sede'
              }
          }
      },
      campaña: {
          validators: {
              notEmpty: {
                  message: 'Por favor seleccione la campaña'
              }
          }
      },
      bodega: {
          validators: {
            // stringLength: {
            //   min: 3,
            // },
            notEmpty: {
                message: 'Seleccion Ubicacion '
            }
          }
      },
      posicion: {
          validators: {
            // stringLength: {
            //   min: 3,
            // },
            notEmpty: {
              message: 'Seleccione Puesto '
            }
          }
      }
    }
	})

	// .on('success.form.bv', function(e) {
 //    $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
 //        $('#reg_form').data('bootstrapValidator').resetForm();

 //    // Prevent form submission
 //    e.preventDefault();

 //    // Get the form instance
 //    var $form = $(e.target);

 //    // Get the BootstrapValidator instance
 //    var bv = $form.data('bootstrapValidator');

 //    // Use Ajax to submit form data
 //    $.post($form.attr('action'), $form.serialize(), function(result) {
 //        console.log(result);
 //    }, 'json');
	// });




})
	