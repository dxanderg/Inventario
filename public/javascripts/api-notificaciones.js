$('#btnBuscarH').on('click', function(){
	var fechaI = $('#date1').val()
	var fechaF = $('#date2').val()
	$.ajax({
      url: '/api-notificaciones/'+fechaI+'/'+fechaF,
      contentType: 'application/json',
      success: function(response) {
      	var table = $('#tab_logic')
      	table.html('')
      	table.append(`<thead class="table-head thead-inverse"><tr><th class="text-center">ID</th><th class="text-center">Origen</th><th class="text-center">Campaña</th><th class="text-center">Destino</th><th class="text-center">Ticket</th><th class="text-center">Fecha</th><th class="text-center">Usuario</th><th class="text-center">Estado</th><th class="text-center">Articulo/Serial/Plaqueta</th></tr></thead>`)
      	table.append(`<tfoot class="table-footer"><tr><th rowspan="1" colspan="1"><input type="text" placeholder="Buscar "></th><th rowspan="1" colspan="1"><input type="text" placeholder="Buscar "></th><th rowspan="1" colspan="1"><input type="text" placeholder="Buscar "></th><th rowspan="1" colspan="1"><input type="text" placeholder="Buscar "></th><th rowspan="1" colspan="1"><input type="text" placeholder="Buscar "></th><th rowspan="1" colspan="1"><input type="text" placeholder="Buscar "></th><th rowspan="1" colspan="1"><input type="text" placeholder="Buscar "></th><th rowspan="1" colspan="1"><input type="text" placeholder="Buscar "></th><th rowspan="1" colspan="1"><input type="text" placeholder="Buscar "></th></tr></tfoot>`)
	      if (response.data.length>0){
	      	for (i=0; i<response.data.length; i++){
	      		table.append(`<tr id="addr0">
	      														<td>
	      															<div>${i+1}</div>
	      														</td>
	      														<td>
	      															<div>${response.data[i].nombre_sede_I} / ${response.data[i].nombre_bodega_I} / Puesto ${response.data[i].posicion_I}</div>
	      														</td>
	      														<td>
	      															<div>${response.data[i].nombre_campaign}</div>
	      														</td>
	      														<td>
	      															<div>${response.data[i].nombre_sede_D} / ${response.data[i].nombre_bodega_D} / Puesto ${response.data[i].posicion_D}</div>
	      														</td>
	      														<td>
	      															<div>${response.data[i].ticket}</div>
	      														</td>
	      														<td>
	      															<div>${response.data[i].fecha_mov}</div>
	      														</td>
	      														<td>
	      															<div>${response.data[i].nombre_mostrar}</div>
	      														</td>
	      														<td>
	      															<div>${response.data[i].nombre_estado}</div>
	      														</td>
	      														<td>
	      															<div>${response.data[i].nombre_item} / ${response.data[i].serial} / ${response.data[i].plaqueta}</div>
	      														</td>
	      													</tr>`)
	      	}
	      }
	      else{
	      	table.append(`<tbody><tr class="odd"><td valign="top" colspan="9" class="dataTables_empty">LA BUSQUEDA NO ARROJO DATOS PARA MOSTRAR</td></tr></tbody>`)
	      }
      }
    })

	

 

  // DataTable
  var tableN = $('#tab_logic').DataTable();

  tableN.buttons().container().appendTo( $('.col-sm-6:eq(0)', tableN.table().container() ) );
 
  // Apply the search
  tableN.columns().every( function () {
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

// PARA LA CONSULTA CON SELECTS EN VEZ DE TEXTO
// $(document).ready(function() {
//     $('#example').DataTable( {
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




// SELECT o.fk_id_puesto, s.nombre_sede, b.nombre_bodega, p.posicion, o.fk_id_articulos, i.nombre_item, count(i.nombre_item)  FROM ocupacion o
// join puestos p on p.id_puesto = o.fk_id_puesto
// join bodegas b on b.id_bodega =  p.fk_bodega
// join sedes s on s.id_sede = p.fk_sede
// join articulos a on a.id_articulos = o.fk_id_articulos
// join items i on i.id_item = a.fk_items
// where s.id_sede = 1
// group by nombre_bodega, posicion, nombre_item
// order by nombre_bodega