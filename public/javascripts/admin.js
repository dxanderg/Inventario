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
    if (val.length == 0){
      alert('Nombre Fabricante no puede estar vacio.')
    }
    else{
      $.ajax({
        url: '/admin/fabricante/' + val,
        contentType: 'application/json',
        success: function(response) {
          if (response.status == 400){
            $('#contenido').append(`<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h2 class="modal-title" id="exampleModalLabel">${response.title}</h2>
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div class="modal-body">
                                      ${response.info}
                                      </br>
                                      ${response.error}
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" id="continue" class="btn btn-danger" data-dismiss="modal">Continuar</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <script>
                                $('#myModal').on('hidden.bs.modal', function () {
                                  location.reload()
                                })
                              </script>`)
            $("#myModal").modal()
          }
          else{
            $('#contenido').append(`<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h2 class="modal-title" id="exampleModalLabel">${response.title}</h2>
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div class="modal-body">
                                      ${response.info}
                                    </div>
                                    <div class="modal-footer">
                                      <button id="continue" type="button" class="btn btn-primary" data-dismiss="modal">Continuar</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <script>
                                $('#myModal').on('hidden.bs.modal', function () {
                                  location.reload()
                                })
                              </script>`)
            $("#myModal").modal()
          }
        }
      })
    }
})