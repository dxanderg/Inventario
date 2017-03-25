// BUSQUEDA POR CAMPO DE TEXTO
$(document).ready(function() {
    // Setup - add a text input to each footer cell
  $('#tab_logic tfoot th').each( function () {
      var title = $(this).text();
      $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
  } );
 
  // DataTable
  var table = $('#tab_logic').DataTable();
 
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

// $("#btn_limpiar").click(function(){
//     var limp = $(document).querySelectorAll('input')
//     limp = ""
//     alert("OK")    
//  }

$(function(){
  $('#btn_limpiar').click(function(){
    $(':input')
       .not(':button, :submit, :reset, :hidden')
       .val('')
       .removeAttr('checked')
       .removeAttr('selected');
      });
});



//BUSQUEDA POR LISTA DESPLEGABLE
// $(document).ready(function() {
//     $('#tab_logic').DataTable( {
//         initComplete: function () {
//             this.api().columns().every( function () {
//                 var column = this;
//                 var select = $('<select><option value=""></option></select>')
//                     .appendTo( $(column.footer()).empty() )
//                     .on( 'change', function () {
//                         var val = $.fn.dataTable.util.escapeRegex(
//                             $(this).val()
//                         );
 
//                         column
//                             .search( val ? '^'+val+'$' : '', true, false )
//                             .draw();
//                     } );
 
//                 column.data().unique().sort().each( function ( d, j ) {
//                     select.append( '<option value="'+d+'">'+d+'</option>' )
//                 } );
//             } );
//         }
//     } );
// } );

