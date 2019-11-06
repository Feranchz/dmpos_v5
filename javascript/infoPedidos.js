  $(document).ready(function(){
  	$('.modal').modal({
  		onCloseEnd:function(){
  			$('#contenidoPedidoModal').hide()
  		}
  	});


  });

  function verInfoPedido(e,boton){
  	if(boton=='ver'){
  		console.log("viene de un ver")
		//$('.page-content').hide()
		verPedido(e.target.id)
	}else if(boton=='abrir'){
		console.log("viene de un abrir")
		$('.page-content').hide()
		seccionActual='contenedorPedido'
		abrirPedido(e)

	}
}


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
			$('#eliminarPedidoHistorial').off('click')	
			$('#cancelar-eliminar-historial').click(e=>{
				$('#modalEliminarPedidoHisotiral').modal('close')
			})
			$('#boton-eliminar-pedido-historial').click(e=>{
				eliminarDesdeHistorial(res.data.id)
			})
		})
		
	})
}

//Funcion que abre el pedido
function abrirPedido(id){
	$('#contenedorPedido').html(`
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
	$('#contenedorPedido').show()

	//Variable para completar peticion
	var peticion="/getOrderInfo?id="+id;

	getRequest(peticion)
	.then((res)=>{
		$('#contenedorPedido').html('')
		$('#contenedorPedido').html(`
			<div class="row contenidoPedido" id="infoPedidoAbierto">
			<div class="col l2"><p id="idPedidoAbierto"></p></div>
			<div class="col l2"><p id="fechaPedidoAbierto"></p></div>
			<div class="col l2"><p id="tipoPedidoAbierto"></p></div>
			<div class="col l2"><p id="clientePedidoAbierto"></p></div>
			<div class="col l2"><p id="vendedorPedidoAbierto"></p></div>
			<div class="col l2"><button id="eliminar" class="btn-floating grey btn-small darken-3 lighten-1 right">X</button></div>
			</div>
			<div class="row contenidoPedido" id="accionesPedidoAbierto">
			<button class="btn btn-small blue left modal-trigger" href="#modalAgregarProductos" style="margin-right: 10px">Producto +</button>
			<button class="btn btn-small green left modal-trigger" style="margin-right: 10px" href="#crearNuevoProducto">Nuevo Producto +</button>
			<button class="btn btn-small green right" id="abrirModalPagar" href="#modalPagar" style="margin-right: 10px">Pagar<i class="material-icons right">payment</i> </button>
			<button class="btn btn-small orange right" style="margin-right: 10px">Imprimir <i class="material-icons right">local_printshop</i></button>
			<button class="btn btn-small blue right modal-trigger" href="#modalActivarFactura" style="margin-right: 10px">Activar Factura</button>
			</div>
			<div id="tabla-productos-abierto" style="height:70%;position: relative;">

			</div>
			<div class="center contenidoPedido" id="total-abierto">

			</div>

			`)
		cargarTablaPedidoAbierto(res)
		return res
	}).then((res)=>{




		//Asignando acciones a los botones de evento y activando shortcuts
		$("#editarProductoFormulario").submit((e)=>{
			e.preventDefault();
			seccionActual="contenedorPedido"			
		})
		$("#modalCantidadProducto").modal({
			onOpenEnd:function(){
				seccionActual="modal3"
				$('#ingresarCantidad').focus()
			},
			onCloseEnd:function(){
				$('#ingresarCantidad').val("")				
			}
		})

		$("#crearNuevoProducto").modal({
			onOpenEnd:function(){
				seccionActual="crearNuevoProducto"
				$('#nuevoPrecio').focus()
				$('#formularioNuevoProducto').submit((e)=>{
					e.preventDefault()
					$('#nuevoPrecio').focus()
					$('#nuevoPrecio').val("")
					$('#selectorUnidad').val("")
					console.log("se envio el preoducto nuevo")
					modalNuevoProductoShortcuts()

				})

			},
			onCloseEnd:function(){
				$('#nuevoPrecio').val("")
				$('#formularioNuevoProducto').off('submit')
				seccionActual="contenedorPedido"
			}
		})
		$('#modalActivarFactura').modal({
			onOpenEnd:function(){
				seccionActual="modalActivarFactura"
				$('#selectorMetodoDePago').submit(e=>{
					e.preventDefault()
					console.log("activa la factura")
				})
			},
			onCloseEnd:function(){
				seccionActual="contenedorPedido"
			}
		})
		$('#modalAgregarProductos').modal({
			onOpenEnd:function(){
				seccionActual="modalAgregarProductos"
				refresTablaAgregarProductos()
			},
			onCloseEnd:function(){
				seccionActual="contenedorPedido"
			}
		})

		$('#abrirModalPagar').click(e=>{
			if(res.data.total==0){
				e.preventDefault()
				M.toast({html: 'No se puede pagar un pedido sin productos.'})
			}else{
				$('#modalPagar').modal('open')
			}
		})


		$('#modalPagar').modal({
			dismissible:false,
			onOpenEnd:function(){
				seccionActual="modalPagar"
				$('#totalPagar').html(`${formatNumber.new(res.data.total,'$')}`)
				$('#insertarBilletes').focus()
				pagarPedido(res.data.total);
				modalPagarPedidoShortcuts();
			},
			onCloseEnd:function(){
				$('#insertarBilletes').val("")
				$('#btnRealizaPago').addClass("disabled")
				$('#campoCambio').html('Insuficiente')
				$('#tituloCambio').hide()


				$('#insertarBilletes').off('keyup')
				$('.tipoDePago').off('click')
				$('#btnRealizaPago').off('click')
				$('#cancelarPago').off('click')
				$('.pagoSeleccionado').removeClass('pagoSeleccionado')
				$('#efectivoBtn').addClass('pagoSeleccionado')
			}
		})
	})
}


function pagarPedido(total){
	let billete=0;
	let metodoDePago="efectivo"
	var cambio=-1



	$("#insertarBilletes").keyup(e=>{
		billete= $('#insertarBilletes').val();
		cambio=billete-total
		if(cambio>0){
			$('#btnRealizaPago').removeClass("disabled")
			$('#tituloCambio').show()
			$('#campoCambio').html(`${formatNumber.new(cambio,'$')}`)	
		}else{
			$('#btnRealizaPago').addClass("disabled")
			$('#tituloCambio').hide()
			$('#campoCambio').html(`Insuficiente`)			
		}
	})
	$('.tipoDePago').click(e=>{
		$("#insertarBilletes").focus()
		$('.pagoSeleccionado').removeClass('pagoSeleccionado')
		if(e.target.id=="efectivoBtn"){
			metodoDePago="efectivo"
			e.target.className+=" pagoSeleccionado"

		}else if(e.target.id=="tarjetaBtn"){
			metodoDePago="tarjeta"
			e.target.className+=" pagoSeleccionado"
		}
	})

	$('#btnRealizaPago').click(()=>{
		if(metodoDePago=="efectivo" && cambio>-1 && total>0){
			$('#btnRealizaPago').off('click')
			$('html').off('keydown')
			console.log(cambio)
			$('#modalPagar').modal('close')
			enviarPago()
		}else if(metodoDePago=="tarjeta"){

			$('#btnRealizaPago').off('click')
			$('#modalIngresarFolio').modal({
				dismissible:false,
				onOpenEnd:function(){
					seccionActual="ingresando-folio"
					modalPagarTarjetaShortcuts()
					console.log(seccionActual)
					$('#numeroDeFolio').focus()
				},
				onCloseEnd:function(){
					$('#numeroDeFolio').val("")
					$('#formEnviarFolio').off('submit')
				}
			})
			$('#modalIngresarFolio').modal('open')
			$('#formEnviarFolio').submit(e=>{
				$('#modalPagar').modal('close')
				e.preventDefault()
				$('#modalIngresarFolio').modal('close')	
				enviarPago()
			})
			$('#cancelarTarjeta').click(()=>{
				seccionActual="contenedorPedido"
				$("#modalIngresarFolio").modal('close')
				$("#cancelarPago").click()
				$('#cancelarTarjeta').off('click')
			})
		}
	})
	$('#cancelarPago').click(()=>{
		seccionActual="contenedorPedido"
		console.log("se cancelo")	
			$("#modalPagar").modal('close')
		$('#cancelarPago').off('click')
	})
}

function enviarPago(){
	//enviar pago
	console.log("se envia el pago con su metodo")
	$('#infoPedidoAbierto').click()
	seccionActual="link-mostrador1"
}





//cargando la tabla de pedidos
function cargarTablaPedidoAbierto(res){
	$('#idPedidoAbierto').html(`${res.data.id}`)
	$('#fechaPedidoAbierto').html(`${moment(res.data.createdAt).fromNow()}`)
	$('#tipoPedidoAbierto').html(`${res.data.orderType}`)
	$('#clientePedidoAbierto').html(`${res.data.customer}`)
	$('#vendedorPedidoAbierto').html(`${res.data.salesman}`)
	$('#tabla-productos-abierto').html('<table class="centered" style="width: 100%"></table>')
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
				formatNumber.new(producto.price,'$'),
				formatNumber.new(producto.total,'$'),
				`
				<button class="btn btn-small blue lighten-1 modal-trigger" id="btneditar" href="#modalCantidadProducto">
				Editar
				</button>
				<button class="btn btn-small deep-orange lighten-1 btneliminar" id="${producto.id}">
				Eliminar
				</button>

				`
				])
		})
	}
	$('#tabla-productos-abierto table').DataTable({

		"oLanguage": {
			"sLengthMenu": "<p>Registros por página:</p> <div>_MENU_</div>",
			"sInfo": "",
			"sZeroRecords": "No se encontró ningún registro",
			"sInfoEmpty": "",
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
		pageResize: true,
		searching:false,
		paginate:false,
		scrollY:true,
		scrollCollapse: false,
		lengthMenu: false,
		"lengthChange": false,
		pageLength: 4,
		columns: headers,
		data: tableData
	})
	$('#total-abierto').html(`<span class="left">Mostrando: ${res.data.arrItems.length} productos</spam><h3 class="center">Total:${formatNumber.new(res.data.total,'$')}</h3>`)

	$('#infoPedidoAbierto').click((e)=>{
		if(e.target.id=="eliminar"){
			console.log("abrir modal de eliminar pedido")
			let idEliminar=$('#idPedidoAbierto')[0].innerHTML
			eliminarPedido(idEliminar)
			$('#modalEliminarPedido').modal('open')
		}else{
			$('#contenedorPedido').hide()
			$('#mostrador1').show()
			$('.nuevoTraspaso').show()
			refreshTablaPedidos()
			console.log("se cerro pedido")
			seccionActual="link-mostrador1"
		}
	})

	$('.btneliminar').click((e)=>{
		eliminarProducto(e.target.id,res)
	})
	infoPedidoShortcuts(res)
}


function dummysProductos(){
	let productos=[]
	for(var i=0;i<300;i++){
		productos.push({
			cRapido:i,
			nombre:`producto+${i}`,
			inventario:0,
			cBarras:i+30,
			precios:[
			["Rango 1"],
			["Rango 2"],
			["Rango 3"]

			]
		})
	}
	return productos
}


function refresTablaAgregarProductos(){
	$('#modalLoader').html(`
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
	let misProductos=todosLosProductos
	$('#tabla-agregar-productos').html('<table class="centered" style="width: 100%"></table>')
	let headers = [
	{
		title: 'C.Rapido'
	},
	{
		title: 'Nombre'
	},
	{
		title: 'Inventario'
	},
	{
		title: 'C.Barras'
	},
	{
		title: 'Precios'
	},
	{
		title: 'Cantidad'
	}
	]
	let tableData = []
	if(misProductos){
		misProductos.forEach(producto => {
			
			tableData.push([
				producto.sku,
				producto.name,
				producto['stock_quantity'],
				producto.CB,
				`<select class="browser-default">
				<option value="1">1-99: ${formatNumber.new(producto.price[0].price['1-99'],'$')}</option>
				<option value="2">100-999 ${formatNumber.new(producto.price[0].price['100-999'],'$')}</option>
				</select>`,
				`<input type="number" id="input${producto.cRapido}" placeholder="Cantidad" style="margin-top:0px;width:100px;"></input>`
				])
		})
	}

	$('#tabla-agregar-productos table').DataTable({
		"oLanguage": {
			"sLengthMenu": "<p>Registros por página:</p> <div>_MENU_</div>",
			"sInfo": "Mostrando _START_ al _END_ de _TOTAL_ registros",
			"sZeroRecords": "No se encontró ningún registro",
			"sInfoEmpty": "No existen registros",
			"sInfoFiltered": "",
			"sSearchPlaceholder": "Buscar...",
			"sSearch": "",
			"oPaginate": {
				"sFirst": "Primero",
				"sLast": "Último",
				"sNext": "Siguiente",
				"sPrevious": "Anterior"
			}
		},
		scrollX: false,
		scrollCollapse: false,
		columns: headers,
		pageResize: true,
		data: tableData,
		"lengthChange": false,
		lengthMenu: [10,25,50,100],
		pageLength: 5,
		
	})
	$('#modalLoader').html("")
	//una vez termine de abrir y cargar la tabla
	$('#tabla-agregar-productos label input').focus()
	modalAgregarProductoShortcuts()
}



function eliminarProducto(id,res){
	for(let i=0;i<res.data.arrItems.length;i++){
		if(res.data.arrItems[i].id==id){
			res.data.arrItems.splice(i,1)		
		}
	}
		$('html').off('keydown')
		cargarTablaPedidoAbierto(res)
}