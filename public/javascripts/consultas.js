// BUSQUEDA POR CAMPO DE TEXTO
$(document).ready(function() {
    // Setup - add a text input to each footer cell
  $('#tab_logic tfoot th').each( function () {
      var title = $(this).text();
      $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
  } );
 
  var fecha = new Date();
  var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  var currentTime = fecha.toLocaleDateString("es-ES", options)

  // DataTable
  var table = $('#tab_logic').DataTable({
    // lengthChange: false,
    buttons: {
        buttons: [
            { extend: 'copy', text: 'Copiar Portapeles', title: 'Inventario_'+ currentTime  },
            { extend: 'excel', text: 'Guardar en Excel', title: 'Inventario_'+ currentTime },
            { extend: 'pdf', text: 'Guardar en PDF', title: 'Inventario_'+ currentTime },
            { extend: 'print', text: 'Imprimir', title: 'Inventario_'+ currentTime }
        ]
    },
    language: {
            buttons: {
                copyTitle: 'Copiado en el Portapapeles'
              }
    }
  });

  table.buttons().container()
    .appendTo( $('.col-sm-6:eq(0)', table.table().container() ) );
 
  // Apply the search
  table.columns().every( function () {
    var that = this;

    $( 'input', this.footer() ).on( 'keyup change', function () {
        if ( that.search() !== this.value ) {
            that
                .search( this.value )
                .draw();
        }
    });
  });
})

$(function(){
  $('#btn_limpiar').click(function(){
    $(':input')
       .not(':button, :submit, :reset, :hidden')
       .val('')
       .removeAttr('checked')
       .removeAttr('selected');
       location.reload();
      });
});
