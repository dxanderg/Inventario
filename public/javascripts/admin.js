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
      url: '/admin/fabricante/' + val,
      contentType: 'application/json',
      success: function(response) {
        var selectItems = $('#select-tipoarticulo');
          selectItems.html('');
          for(i=0; i<response.data.length; i++){
            var opt = document.createElement('option');
            opt.value = response.data[i].id_item;
            opt.innerHTML = response.data[i].nombre_fabricante + ' - ' + response.data[i].modelo_item;
            selectItems.append(opt);
          }
      }
    })
})