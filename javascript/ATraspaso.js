$(document).ready(function() {
	var seccionPrevia
	$("#modalClienteTraspaso").modal({
		onOpenEnd:function(){
			llenarTablaClientes();
			seccionPrevia=seccionActual
			seccionActual="modalClienteTraspaso"
		},
		onCloseEnd:function(){
			seccionActual=seccionPrevia;
		}
	})
})

function llenarTablaClientes(){
	res={
		data:[
			{
				nombre:"sucursal 1"
			},
			{
				nombre:"sucursal 2"
			},
			{
				nombre:"sucursal 3"
			},
			{
				nombre:"sucursal 4"
			},
			{
				nombre:"sucursal 6"
			},
			{
				nombre:"sucursal 7"
			},
			{
				nombre:"sucursal 8"
			},
			{
				nombre:"sucursal 9"
			},
			{
				nombre:"sucursal 10"
			},
			{
				nombre:"sucursal 11"
			},
			{
				nombre:"sucursal 12"
			}
		]
	}



	$('#tabla-clientes').html('<table class="centered" style="width: 100%"></table>')
		let headers = [
			{
				title: 'Nombre'
			},
			{
				title: 'Accion'
			}
		]
		let tableData = []
		if(res.data){
			res.data.forEach(cliente => {
				tableData.push([
					cliente.nombre,
					`<button class="btn btn-small orange">
						Seleccionar
					</button>`
				])
			})
		}

		$('#tabla-clientes table').DataTable({
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
	       	lengthMenu: false,
	       	"lengthChange": false,
	        columns: headers,
	        pageResize:true,
	        data: tableData,
		})
}