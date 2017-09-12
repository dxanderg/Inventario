// BUSQUEDA POR CAMPO DE TEXTO
$(document).ready(function() {
 
  var table = $('#tab_logic').DataTable({ });
  var table1 = $('#tab_logic1').DataTable({ });
  var table2 = $('#tab_logic2').DataTable({ });

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

$('#btn-fabr').on('click', function(){
    var val = $('#input-fabr').val()
    $.ajax({
      type: 'POST',
      url: '/admin/fabricante',
      contentType: 'application/json',
      data: val,
      success: function(response) {
        alert('OK')
      }
    })
})