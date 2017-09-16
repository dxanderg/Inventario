//Script para añadir registros al formulario de traslados
//-----------------------------------------------------------------------------
$(document).ready(function(){
  var i=1;
  $("#add_row").click(function(){
    $('#tab_logic').append(`<tr id="addr` + i + `">
                      <td class="table_number">` + i + `</td>
                      <input type="hidden" name="indice" id="indexRow`+ i + `" value="`+ i + `" />
                        <td>
                          <section>
                            <select name="ubicacionI-` + i + `" id="itembodegaI-` + i + `" class="form-control-sm selectUbicacion">
                              <option value=" ">Bodega Inicio</option>
                            </select>
                          </section>
                        </td>
                        <td>
                          <section>
                            <select name="posicionI-` + i + `" id="puestoI-` + i + `" class="form-control-sm selectPuesto ">
                              <option value=" ">Puesto Inicio</option>
                            </select>
                          </section>
                        </td>
                        <td>
                          <div id="select-list">
                            <div>
                              <select size="1" name="articuloI-` + i + `" id="itemI-` + i + `" class="form-control-sm selectItem multiples" multiple="multiple">
                                <option value=" ">Item Inicio</option>
                              </select>
                            </div>
                          </div>
                        </td>
                        <td><i class="fa fa-arrows-h"></i></td>
                        <td>
                          <section>
                            <select name="ubicacionF-` + i + `" id="itembodegaF-` + i + `" class="form-control-sm selectUbicacion">
                              <option value=" ">Bodega Destino</option>
                            </select>
                          </section>
                        </td>
                        <td>
                          <section>
                            <select name="posicionF-` + i + `" id="puestoF-` + i + `" class="form-control-sm selectPuesto">
                              <option value=" ">Puesto Destino</option>
                            </select>
                          </section>
                        </td>
                        <td>
                          <div id="select-list">
                            <div>
                              <select size="1" name="articuloF-` + i + `" id="itemF-` + i + `" class="form-control-sm selectItem multiples" multiple="multiple">
                                <option value=" ">Item a Cambiar</option>
                              </select>
                            </div>
                          </div>
                        </td>
                        <td>
                          <input type="checkbox" name="inversa-` + i + `" class="form-check-input big-checkbox"/>
                        </td>
                        </tr>`);
    bloquearSelect(i)
    consultaBodegas(i)
    i++;
  });

  var $tbody = $("#tab_logic tbody")
  $("#delete_row").click(function(){
    var $last = $tbody.find('tr:last');
    if($last.is(':first-child')){
        alert('Ultimo Registro.')
    }else {
        $last.remove()
        i--
    }
  });

});
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------

//Scrip de Dropdown Seleccion multiple.
// $(function multiseleccion() {
//   var num = 1
//   $('#list-activosi'+num).multiselect({
//     includeSelectAllOption: true
//   });
//   $('#list-activosf'+num).multiselect({
//     includeSelectAllOption: true
//   });
//   num += 1
//   // $('#btnSelected').click(function () {
//   //   var selected = $("#list-activos option:selected");
//   //   var message = "";
//   //   selected.each(function () {
//   //     message += $(this).text() + " " + $(this).val() + "\n";
//   //   });
//   //   alert(message);
//   // });
// });