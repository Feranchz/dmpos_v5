
/*Tabla etiquetas, en esta tabla se utilizan los productos cargados al inicio donde se ve su fecha de modificacion como principal
orden, esta funcion tiene un loader que se hace a drede para esperar a que los productos se carguen en la tabla ya que estan traidos del ws*/

function refreshTablaEtiquetas(){
	$('#tabla-etiquetas').html(`
		<div style="text-align: center">
			<div class="loading-box" style="margin-top: 20px">
				<div class="preloader-wrapper big active">
				    <div class="spinner-layer spinner-blue-only">
					    <div class="circle-clipper left">
					    	<div class="circle"></div>
					    </div>
					    <div class="gap-patch">
					    	<div class="circle"></div>
					    </div>
					    <div class="circle-clipper right">
					        <div class="circle"></div>
					    </div>
					</div>
				</div>
			</div>
		</div>
	`)
	console.log("en etiquetas")
setTimeout(function() {

	$('#tabla-etiquetas').html('<table class="centered" style="width: 100%"></table>')
	let headers = [
	{
		title: 'Codigo'
	},
	{
		title: 'Nombre'
	},
	{
		title: 'Codigo de Barras'
	},
	{
		title: 'Cambio de Precio'
	},
	{
		title: 'Acción'
	}
	]
	let tableData = []

	todosLosProductos.forEach(producto => {
		tableData.push([
			producto.sku,
			producto.name,
			producto.CB,
			`<span class="fecha" title="${producto['date_modified']}">${moment(producto['date_modified']).fromNow()}</span>`,
			`<button class="btn btn-small green">Imprimir etiqueta <i class="material-icons left">local_printshop</i></button>`
			])
	})


	$('#tabla-etiquetas table').DataTable({
		"sDom": "Bfrt<'table-footer'ip>",
		"oLanguage": {
			"sLengthMenu": "<p>Registros por página:</p> <div>_MENU_</div>",
			"sInfo": "Mostrando _START_ al _END_ de _TOTAL_ registros",
			"sZeroRecords": "No se encontró ningún registro",
			"sInfoEmpty": "No existen registros",
			"sInfoFiltered": "(Filtrado de _MAX_ total de registros)",
			"sSearchPlaceholder": "Buscar...",
			"sSearch": "",
			"oPaginate": {
				"sFirst": "Primero",
				"sLast": "Último",
				"sNext": "Siguiente",
				"sPrevious": "Anterior"
			}
		},
		scrollX: true,
		scrollCollapse: true,
		columns: headers,
		pageResize: true,
		data: tableData,
		lengthMenu: [10,25,50,100],
		pageLength: 11,
		order: [[ 3, "asc" ]],
		buttons: [
		{
			extend: 'excelHtml5',
			filename: `ProductosDMPoS.xlsx`
		}
		]
	})




}, 3000);
}