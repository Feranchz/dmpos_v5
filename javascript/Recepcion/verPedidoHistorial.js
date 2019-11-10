/* Este archivo contiene todo lo relacionado con el pedido desde la tabla de historial una vez se clicka en ver. */


/*Esta funcion es llamada desde el historial es la que se encarga de abrir un pedido en el modal para mostra su informacion*/
//funcion que solo muestra informacion del pedido
function verPedido(id){
	$('#loaderModal').html(`
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
	//Variable para completar peticion
	var peticion="/getOrderInfo?id="+id;
	//variable de la peticion
	getRequest(peticion)
	.then((res)=>{
		$('#loaderModal').html('')
		$('#contenidoPedidoModal').show()
		$('#idTicketModal').html(`Informacion de ticket (ID): ${res.data.id}`)
		$('#infoTicketModal').html(`
			<p class="center">Fecha de ticket: ${res.data.createdAt.substring(0,10)} </p>
			<p class="center">Hora de ticket: ${res.data.createdAt.substring(11)}
			<p class="center">Tipo de orden: ${res.data.orderType}</p>
			`)
		$('#infoClienteModal').html(`
			<p class="center">Cliente: ${res.data.customer}</p>
			<p class="center">Nota de cliente: ${res.data.customer_note}<p>
			<p class="center">Metodo de pago: ${res.data.payment_method}</p>
			`)
		$('#statusPedidoModal').html(`
			<p class="center">Vendedor: ${res.data.salesman}<p>
			<p class="center">Status del pedido: ${res.data.status}</p>
			<p class="center">Status de factura: ${res.data.statusFactura}</p>
			`)
		$('#tabla-productos-modal').html('<table class="centered" style="width: 100%"></table>')
		let headers = [
		{
			title: 'Cantidad'
		},
		{
			title: 'Unidad'
		},
		{
			title: 'Nombre'
		},
		{
			title: 'Precio'
		},
		{
			title: 'Total'
		},
		{
			title: 'Acción'
		}
		]
		let tableData = []
		if(res.data.arrItems){
			res.data.arrItems.forEach(producto => {
				tableData.push([
					producto.quantity,
					producto.unit,
					producto.name,
					formatNumber.new(producto.price,"$"),
					formatNumber.new(producto.total,"$"),
					`<button class="btn btn-small deep-orange lighten-1">
						Eliminar
					</button>
					`
					])
			})
		}
		console.log(tableData)
		$('#tabla-productos-modal table').DataTable({
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
			paginate:false,
			pageResize: true,
			searching:false,
			scrollX: true,
			scrollCollapse: true,
			pageResize: true,
			lengthMenu: false,
			"lengthChange": false,
			pageLength: 10,
			columns: headers,
			data: tableData,
		})
		$('#total-modal').html(`<h3 class="centered">Total:${formatNumber.new(res.data.total, "$")}</h3>`)
		return res
	}).then((res)=>{
		$('#eliminarPedidoHistorial').click(e=>{
			console.log(res.data.id)
			$('#modalEliminarPedidoHisotiral').modal('open')

			$('#cancelar-eliminar-historial').click(e=>{
				e.preventDefault()
				$('#boton-eliminar-pedido-historial').off('click')
				$('#modalEliminarPedidoHisotiral').modal('close')
			})
			$('#boton-eliminar-pedido-historial').click(e=>{
				eliminarDesdeHistorial(res.data.id)
				$('#eliminarPedidoHistorial').off('click')
				$('#boton-eliminar-pedido-historial').off('click')
			})
		})
		$('#cerrarPedidoHistorial').click(e=>{
			console.log("se cerro pedido historial")
			$('#modalInfoPedido').modal('close')
			$('#eliminarPedidoHistorial').off('click')
			$('#cerrarPedidoHistorial').off('click')

		})
	})
}