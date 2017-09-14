// BUSQUEDA POR CAMPO DE TEXTO
$(document).ready(function() {
 
  var table = $('#tab_logic').DataTable({ });
  var table1 = $('#tab_logic1').DataTable({ });
  var table2 = $('#tab_logic2').DataTable({ });
  var table3 = $('#tab_logic3').DataTable({ });
  var table4 = $('#tab_logic4').DataTable({ });
  var table5 = $('#tab_logic5').DataTable({ });
  var table6 = $('#tab_logic6').DataTable({ });

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
                                      ${response.error.code}
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

$('#btn-tipoitem').on('click', function(){
    var val = $('#input-tipoitem').val()
    if (val.length == 0){
      alert('Tipo Item no puede estar vacio.')
    }
    else{
      $.ajax({
        url: '/admin/tipoitem/' + val,
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
                                      ${response.error.code}
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

$('#btn-items').on('click', function(){
    var nombre_item = $('#item_nombre option:selected').text()
    var modelo_item = $('#item_modelo1').val()
    var modelo_item_2 = $('#item_modelo2').val()
    var fk_fabricante = $('#item_fabricante option:selected').val()
    var activo = 1
    var tipo = $('#item_nombre option:selected').val()
    if ($('#item_c1').val().length == 0) { var caracteristica_1 = '-' }
    else{ var caracteristica_1 = $('#item_c1').val() }
    if ($('#item_c2').val().length == 0) { var caracteristica_2 = '-' }
    else{ var caracteristica_2 = $('#item_c1').val() }
    if ($('#item_c3').val().length == 0) { var caracteristica_3 = '-' }
    else{ var caracteristica_3 = $('#item_c1').val() }

    if (modelo_item.length == 0 || modelo_item_2.length == 0){
      alert('Item no puede estar vacio.')
    }
    else{
      $.ajax({
        url: '/admin/items/'+nombre_item+'/'+modelo_item+'/'+modelo_item_2+'/'+fk_fabricante+'/'+activo+'/'+tipo+'/'+caracteristica_1+'/'+caracteristica_2+'/'+caracteristica_3,
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
                                      ${response.error.code}
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