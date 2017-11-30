$(document).ready(function () {
	$('#ingreso-form').bootstrapValidator({
    fields: {
      serial: {
        validators: {
          stringLength: {
          	min: 4,
        	},
          notEmpty: {
          	message: 'Por favor digite el serial'
        	}
        }
      },
      plaqueta: {
        validators: {
          stringLength: {
          	min: 4,
        	},
          notEmpty: {
          	message: 'Por favor digite el numero de plaqueta'
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
      articulo: {
          validators: {
            // stringLength: {
            //   min: 3,
            // },
            notEmpty: {
                message: 'Seleccion el Articulo '
            }
          }
      },
      tipoarticulo: {
          validators: {
            // stringLength: {
            //   min: 3,
            // },
            notEmpty: {
                message: 'Seleccion el Tipo de Articulo '
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
      },
      ticket: {
          validators: {
            stringLength: {
              min: 6,
            },
            notEmpty: {
              message: 'Ingrese el Numero de Ticket '
            },
            digits: {
              message: 'Solo puede contener numeros'
            }
          }
      },
      usuario: {
          validators: {
            stringLength: {
              min: 4,
            },
            notEmpty: {
              message: 'Ingrese el Usuario '
            }
          }
      },
      nombre: {
          validators: {
            stringLength: {
              min: 6,
            },
            notEmpty: {
              message: 'Ingrese el Nombre '
            }
          }
      },
      cargo: {
          validators: {
            notEmpty: {
              message: 'Ingrese el Cargo '
            }
          }
      },
      campaña: {
          validators: {
            notEmpty: {
              message: 'Ingrese la Campaña '
            }
          }
      },
      perfil: {
          validators: {
            stringLength: {
              min: 1,
            },
            notEmpty: {
              message: 'Ingrese el Perfil de Usuario'
            }
          }
      },
      password: {
          validators: {
            stringLength: {
              min: 1,
            },
            notEmpty: {
              message: 'Ingrese la Contraseña'
            }
          }
      },
      propietario: {
          validators: {
            stringLength: {
              min: 5,
            },
            notEmpty: {
              message: 'Ingrese el Propietario'
            }
          }
      },
      responsable: {
          validators: {
            stringLength: {
              min: 5,
            },
            notEmpty: {
              message: 'Ingrese el Responsable'
            }
          }
      }
    }
	})
})
	