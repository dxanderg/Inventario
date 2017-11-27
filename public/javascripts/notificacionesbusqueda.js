$(document).ready(function() {
  

    // DataTable
  $('#tab_logic tfoot th').each( function () {
      var title = $(this).text();
      $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
  } );
 
  var fecha = new Date();
  var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  var currentTime = fecha.toLocaleDateString("es-ES", options)

  // DataTable
  var table = $('#tab_logic').DataTable({
   // lengthChange: false,
    buttons: {
        buttons: [
            { extend: 'copy', text: 'Copiar Portapeles', title: 'Inventario_'+ currentTime  },
            { extend: 'excel', text: 'Guardar en Excel', title: 'Inventario_'+ currentTime },
            { extend: 'pdf', 
              text: 'Guardar en PDF', 
              title: 'Inventario_'+ currentTime,
              customize: function (doc) {
              doc.content.splice(0,1);
              var now = new Date();
              var jsDate = now.getDate()+'-'+(now.getMonth()+1)+'-'+now.getFullYear();
              var logo = 'data:image/png;base64,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';
              doc.pageMargins = [30,60,20,30];
              doc.defaultStyle.fontSize = 7;
              doc.styles.tableHeader.fontSize = 7;
              doc['header']=(function() {
                return {
                  columns: [
                    {
                      image: logo,
                      width: 100
                    },
                    {
                      alignment: 'right',
                      fontSize: 14,
                      text: 'Movimientos de Activos GrupoDigitex'
                    }
                  ],
                  margin: 20
                }
              });
              doc['footer']=(function(page, pages) {
                return {
                  columns: [
                    {
                      alignment: 'left',
                      text: ['Creado: ', { text: jsDate.toString() }]
                    },
                    {
                      alignment: 'right',
                      text: ['Pagina ', { text: page.toString() },  ' of ', { text: pages.toString() }]
                    }
                  ],
                  margin: 20
                }
              });
              // Change dataTable layout (Table styling)
              // To use predefined layouts uncomment the line below and comment the custom lines below
              // doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
              var objLayout = {};
              objLayout['hLineWidth'] = function(i) { return .5; };
              objLayout['vLineWidth'] = function(i) { return .5; };
              objLayout['hLineColor'] = function(i) { return '#aaa'; };
              objLayout['vLineColor'] = function(i) { return '#aaa'; };
              objLayout['paddingLeft'] = function(i) { return 4; };
              objLayout['paddingRight'] = function(i) { return 4; };
              doc.content[0].layout = objLayout;
          }
        },
            { extend: 'print', text: 'Imprimir', title: 'Inventario_'+ currentTime }
        ]
    },
    language: {
            buttons: {
                copyTitle: 'Copiado en el Portapapeles'
              }
    }
  });

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

// BUSQUEDA POR CAMPO DE TEXTO
// $(document).ready(function() {
//     // Setup - add a text input to each footer cell
//   $('#tab_logic tfoot th').each( function () {
//       var title = $(this).text();
//       $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
//   } );
 
//   var fecha = new Date();
//   var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
//   var currentTime = fecha.toLocaleDateString("es-ES", options)

//   // DataTable
//   var table = $('#tab_logic').DataTable({
//    // lengthChange: false,
//     buttons: {
//         buttons: [
//             { extend: 'copy', text: 'Copiar Portapeles', title: 'Inventario_'+ currentTime  },
//             { extend: 'excel', text: 'Guardar en Excel', title: 'Inventario_'+ currentTime },
//             { extend: 'pdf', 
//               text: 'Guardar en PDF', 
//               title: 'Inventario_'+ currentTime,
//               customize: function (doc) {
//               //Remove the title created by datatTables
//               doc.content.splice(0,1);
//               //Create a date string that we use in the footer. Format is dd-mm-yyyy
//               var now = new Date();
//               var jsDate = now.getDate()+'-'+(now.getMonth()+1)+'-'+now.getFullYear();
//               // Logo converted to base64
//               // var logo = getBase64FromImageUrl('https://datatables.net/media/images/logo.png');
//               // The above call should work, but not when called from codepen.io
//               // So we use a online converter and paste the string in.
//               // Done on http://codebeautify.org/image-to-base64-converter
//               // It's a LONG string scroll down to see the rest of the code !!!
//               var logo = 'data:image/png;base64,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';
//               // A documentation reference can be found at
//               // https://github.com/bpampuch/pdfmake#getting-started
//               // Set page margins [left,top,right,bottom] or [horizontal,vertical]
//               // or one number for equal spread
//               // It's important to create enough space at the top for a header !!!
//               doc.pageMargins = [30,60,20,30];
//               // Set the font size fot the entire document
//               doc.defaultStyle.fontSize = 7;
//               // Set the fontsize for the table header
//               doc.styles.tableHeader.fontSize = 7;
//               // Create a header object with 3 columns
//               // Left side: Logo
//               // Middle: brandname
//               // Right side: A document title
//               doc['header']=(function() {
//                 return {
//                   columns: [
//                     {
//                       image: logo,
//                       width: 100
//                     },
//                     {
//                       alignment: 'right',
//                       fontSize: 14,
//                       text: 'Inventario de Activos GrupoDigitex'
//                     }
//                   ],
//                   margin: 20
//                 }
//               });
//               // Create a footer object with 2 columns
//               // Left side: report creation date
//               // Right side: current page and total pages
//               doc['footer']=(function(page, pages) {
//                 return {
//                   columns: [
//                     {
//                       alignment: 'left',
//                       text: ['Creado: ', { text: jsDate.toString() }]
//                     },
//                     {
//                       alignment: 'right',
//                       text: ['Pagina ', { text: page.toString() },  ' of ', { text: pages.toString() }]
//                     }
//                   ],
//                   margin: 20
//                 }
//               });
//               // Change dataTable layout (Table styling)
//               // To use predefined layouts uncomment the line below and comment the custom lines below
//               // doc.content[0].layout = 'lightHorizontalLines'; // noBorders , headerLineOnly
//               var objLayout = {};
//               objLayout['hLineWidth'] = function(i) { return .5; };
//               objLayout['vLineWidth'] = function(i) { return .5; };
//               objLayout['hLineColor'] = function(i) { return '#aaa'; };
//               objLayout['vLineColor'] = function(i) { return '#aaa'; };
//               objLayout['paddingLeft'] = function(i) { return 4; };
//               objLayout['paddingRight'] = function(i) { return 4; };
//               doc.content[0].layout = objLayout;
//           }
//         },
//             { extend: 'print', text: 'Imprimir', title: 'Inventario_'+ currentTime }
//         ]
//     },
//     language: {
//             buttons: {
//                 copyTitle: 'Copiado en el Portapapeles'
//               }
//     }
//   });

//   table.buttons().container()
//     .appendTo( $('.col-sm-6:eq(0)', table.table().container() ) );
 
//   // Apply the search
//   table.columns().every( function () {
//     var that = this;

//     $( 'input', this.footer() ).on( 'keyup change', function () {
//       console.log('push')
//         if ( that.search() !== this.value ) {
//             that
//                 .search( this.value )
//                 .draw();
//         }
//     });
//   });
// })

// $(function(){
//   $('#btn_limpiar').click(function(){
//     $(':input')
//        .not(':button, :submit, :reset, :hidden')
//        .val('')
//        .removeAttr('checked')
//        .removeAttr('selected');
//        location.reload();
//       });
// });

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