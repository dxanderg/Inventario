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
