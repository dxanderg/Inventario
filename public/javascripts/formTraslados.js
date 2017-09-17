$('#ingreso-form').submit(function(e) {
  e.preventDefault();
	var indice = document.getElementsByName('indice')
  $('#contenido').append(`<div class="modal fade" id="confirmTraslado" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h2 class="modal-title" id="exampleModalLabel">${indice}</h2>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                                    ${indice}
                                    </br>
                                    ${indice}
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" id="cancel" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                                    <button type="button" id="confirm" class="btn btn-success">Confirmar</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <script>
                              $('#cancel').on('click', function () {
                                document.getElementById("traslado").disabled = false
                              })
                              $('#confirm').on('click', function () {
                                return true
                              })
                            </script>`)
  $("#confirmTraslado").modal()
})

// $('#cancel').on('click', function () {
//   // document.getElementById("traslado").disabled = false
//   alert('cancelado')
//   return false;
// })

// $('#confirm').on('click', function () {
//   alert('confirmado')
//   return true;
// })
                            