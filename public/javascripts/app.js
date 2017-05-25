//Script para añadir registros al formulario de traslados
//-----------------------------------------------------------------------------
$(document).ready(function(){
  var i=2;
  dibujar(i)
  $("#add_row").click(function(){
    $('#addr'+i).html(`<td>`+ (i+1) +`</td>
                                        <td>
                                          <div id='select-list'>
                                            <div class=''>
                                              select.form-control#dropdown1(data-dropdown='{ "closeReset": true, }')
                                                option(value='')= 'Seleccione el Puesto'
                                            </div>
                                          </div>
                                        </td><td><div id='select-list'><div class=''><select class='form-control'><option></option></select></div></div></td><td><div id='select-list'><div class=''><select id='list-activosi" + (i+1) +"' multiple='multiple'><option value='1'>CPU</option><option value='2'>Monitor</option><option value='3'>Hardphone</option></select></div></div></td><td><i class='fa fa-arrows-h'></i></td><td><div id='select-list'><div class=''><select class='form-control'><option></option></select></div></div></td><td><div id='select-list'><div class=''><select class='form-control'><option></option></select></div></div></td><td><div id='select-list'><div class=''><select id='list-activosf" + (i+1) +"' multiple='multiple'><option value='1'>CPU</option><option value='2'>Monitor</option><option value='3'>Hardphone</option></select></div></div></td><td><input type='checkbox' name='inversa' class='form-check-input big-checkbox'></td></tr>`);
    $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
    i++;
    dibujar(i)
  });
  $("#delete_row").click(function(){
    if(i>1){
      $("#addr"+(i-1)).html('');
      i--;
    }
  });
});
//-----------------------------------------------------------------------------

//Scrip de Dropdown Seleccion multiple.
//-----------------------------------------------------------------------------
function dibujar(i){
  if (i==2){
    
  }
  else{

  }
}
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