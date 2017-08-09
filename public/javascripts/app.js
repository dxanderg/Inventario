//Script para añadir registros al formulario de traslados
//-----------------------------------------------------------------------------
$(document).ready(function(){
  var i=2;
  $("#add_row").click(function(){
    $('#tab_logic').append(`<tr id="addr` + i + `">
                      <td class="table_number">` + i + `</td>
                        <td>
                          <section>
                            <select name="ubicacionI" id="itembodegaI" class="form-control selectItem">
                              <option value=" ">Seleccione Bodega</option>
                            </select>
                          </section>
                        </td>
                        <td>
                          <section>
                            <select name="posicionI" id="puestoI" class="form-control select-posicionesI">
                              <option value=" ">Seleccione el Puesto</option>
                            </select>
                          </section>
                        </td>
                        <td>
                          <div id="select-list">
                            <div>
                              <select name="item1" id="itemI" class="form-control selectItem">
                                <option value=" ">Seleccione Item</option>
                              </select>
                            </div>
                          </div>
                        </td>
                        <td><i class="fa fa-arrows-h"></i></td>
                        <td>
                          <section>
                            <select name="ubicacionF" id="itembodegaF" class="form-control selectItem">
                              <option value=" ">Seleccione Bodega</option>
                            </select>
                          </section>
                        </td>
                        <td>
                          <section>
                            <select name="posicionF" id="puestoF" class="form-control select-posicionesI">
                              <option value=" ">Seleccione el Puesto</option>
                            </select>
                          </section>
                        </td>
                        <td>
                          <div id="select-list">
                            <div>
                              <select name="item2" id="itemF" class="form-control selectItem">
                                <option value=" ">Seleccione Item</option>
                              </select>
                            </div>
                          </div>
                        </td>
                        <td>
                          <input type="checkbox" name="inversa1" class="form-check-input big-checkbox"/>
                        </td>
                        </tr>`);
    i++;
  });


  $("#delete_row").click(function(){
    if(i>1){
      $("#addr"+(i-1)).html('');
      i--;
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