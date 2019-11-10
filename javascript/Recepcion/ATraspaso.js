
/* En este archivo se encuentra todo lo relacionado a iniciar traspasos se refiere, desde elegir el tipo de traspaso
sea a clientes generales o a sucrusales*/

$(document).ready(function() {
	var seccionPrevia

	$('.nuevoTraspaso').click(e=>{
		if(e.target.id=='btnTipoTraspaso'){
			llenarTablaClientes('traspaso')
		}else if(e.target.id=='btnTipoPublico'){
			llenarTablaClientes('publico')
		}
	})

	$("#modalClienteTraspaso").modal({
		onOpenEnd:function(){
			seccionActual="modalClienteTraspaso"
			modalClienteTraspasoShortcuts()
		}
	})
})

function llenarTablaClientes(tipo,vendedor){
	console.log(vendedor)
	$('#tabla-clientes').html(`
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

	console.log(tipo)
	res={
		data:[
			{
				nombre:"sucursal 1",
				idSucursal:1
			},
			{
				nombre:"sucursal 2",
				idSucursal:12
			},
			{
				nombre:"sucursal 3",
				idSucursal:13
			},
			{
				nombre:"sucursal 4",
				idSucursal:14
			},
			{
				nombre:"sucursal 6",
				idSucursal:15
			},
			{
				nombre:"sucursal 7",
				idSucursal:16
			},
			{
				nombre:"sucursal 8",
				idSucursal:17
			},
			{
				nombre:"sucursal 9",
				idSucursal:18
			},
			{
				nombre:"sucursal 10",
				idSucursal:19
			},
			{
				nombre:"sucursal 11",
				idSucursal:120
			},
			{
				nombre:"sucursal 12",
				idSucursal:121
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
					`<button id="${cliente.idSucursal}" class="btn btn-small orange seleccionarCliente">
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

		console.log("aqui")

		$('.seleccionarCliente').click(e=>{
			seccionActual="contenedorPedido"
			if(vendedor){
				crearPedido({
					tipo:tipo,
					cliente:e.target.id,
					vendedor:vendedor
				})
			}else{	
				crearPedido({
					tipo:tipo,
					cliente:e.target.id
				})
			}
		})
		$('#cancelar-seleccion-cliente').click(e=>{
			seccionActual="link-mostrador1"
		})
}