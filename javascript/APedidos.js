function refreshTablaPedidos(desde){
	$('html').off('keydown')
	$('#actualizarPedidos').off('click')

	console.log("refrescando tabla "+desde)
	$('#tabla-pedidos').html(`
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

	getRequest(`/getOrdersPending`)
	.then(res => {
		$('#tabla-pedidos').html('<table class="highlight centered" style="width: 100%"></table>')
		let headers = [
			{
				title: 'ID'
			},
			{
				title: 'Fecha'
			},
			{
				title: 'Tipo de pedido'
			},
			{
				title: 'Cliente'
			},
			{
				title: 'Vendedor'
			},
			{
				title: 'Accion'
			}
		]
		let tableData = []
		if(res.data){
			res.data.forEach(reporte => {
				tableData.push([
					reporte.id,
					`<span class="fecha" title="${reporte.createdAt}">${moment(reporte.createdAt).fromNow()}</span>`,
					//reporte.createdAt.substring(0,10),
					reporte.orderType,
					reporte.customer,
					reporte.salesman,
					`<button class="btn-floating grey btn-small darken-3 lighten-1  modal-trigger" id="eliminar" href="#modalEliminarPedido" >X</button>`
				])
			})
		}

		$('#tabla-pedidos table').DataTable({
			searching:false,
			"oLanguage": {
	          "sLengthMenu": "",
	          "sInfo": "",
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
	        scrollY: true,
	        paginate:false,
	        columns: headers,
	        pageResize: true,
	        data: tableData,
	        lengthMenu: [10,25,50,100],
        	pageLength: 10,
        	buttons: [
        		{
        			extend: 'excelHtml5',
        		}
        	]
		})
		$('#cantidadDePedidos').html(`Mostrando ${res.data.length} pedidos`)
	}).then(()=>{
		APedidosShortcuts()
	})
}


function eliminarPedido(id){
	$('#modalEliminarPedido').modal({
		onOpenEnd:function(){
			seccionActual="modal-eliminar-pedido"
			$('#boton-eliminar-pedido-modal').click((e)=>{
				$('html').off('keydown')
				$('.page-content').hide()
				$('#mostrador1').show()
				seccionActual='mostrador1'
				$('#modalLoaderOnly').modal({
					onOpenEnd:function(){
						console.log("do someting")
						$('#accionCargando').html('Eliminando pedido')
					},
					onCloseEnd:function(){
						$('#accionCargando').html('')
					}
				})
				$('#modalLoaderOnly').modal('open')


				let paraEliminar=`/deleteOrder?id=${id}`

				deleteRequest(paraEliminar)
				.then(res=>{
					console.log(res)
					console.log("aqui se deberia eliminar el pedido")
					refreshTablaPedidos("Eliminar click")
					$('#boton-eliminar-pedido-modal').off('click')
					$('#modalEliminarPedido').modal('close')
					return res
				}).then(res=>{
					$('#modalLoaderOnly').modal('close')
				})
			})
			modalEliminarPedidoShortcuts()
		},
		onCloseEnd:function(){
			$('#boton-eliminar-pedido-modal').off('click')
			seccionActual="link-mostrador1"
		}
	})
}

function eliminarDesdeHistorial(id){
	let paraEliminar=`/deleteOrder?id=${id}`
	deleteRequest(paraEliminar)
	.then(res=>{
		$('#infoPedidoModal').modal('close')
		refreshTablaHistorial('campoFecha')
	})
}


function crearPedido(informacion){
	//Cuerpo de la peticion para crear un pedido
	$('#modalClienteTraspaso').modal('close')
	$('#modalLoaderOnly').modal({
		onOpenEnd:function(){
			$('#accionCargando').html('Creando Pedido')
		},
		onCloseEnd:function(){
			$('#accionCargando').html('')
		}
	})
	$('#modalLoaderOnly').modal('open')




	console.log(informacion.tipo)
	let wsBody={
		"orderType": informacion.tipo,
		"customer_id":1,
		"salesman_id":2,
		"cashier_id":3
	}
	let wsputOrder="/putOrder"
	postRequest(wsputOrder,wsBody)
	.then(res=>{
		$('#modalClienteTraspaso').modal('close')
		$('.page-content').hide()
		$('contenedorPedido').show()
		abrirPedido(res.data.id)
		return res
	})
	.then(res=>{
		$('#modalLoaderOnly').modal('close')
	})
}


