 /*Aqui se encuntra lo relacionado a los pedidos abiertos desde la vista de mostrador*/

 $(document).ready(function(){
 	$('.modal').modal();
 	$('#modalInfoPedido').modal({
 		dismissible:false,
 		onCloseEnd:function(){
 			$('#contenidoPedidoModal').hide()
 		}
 	})
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
//Esta variable global indica si la tabla de productos fue cargada ya en el modal.
var tablaCargada=0

/*Abrir pedido abre un pedido desde el mostrador*/
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
			<button class="btn btn-small blue left modal-trigger" id="btnAgregaProductos" href="#modalAgregarProductos" style="margin-right: 10px">Producto +</button>
			<button class="btn btn-small green left modal-trigger" style="margin-right: 10px" id="btnCrearNuevoProducto" href="#crearNuevoProducto">Nuevo Producto +</button>
			<button class="btn btn-small green right" id="abrirModalPagar" href="#modalPagar" style="margin-right: 10px">Pagar<i class="material-icons right">payment</i> </button>
			<button class="btn btn-small orange right" id="imprimir" style="margin-right: 10px">Imprimir <i class="material-icons right">local_printshop</i></button>
			<button class="btn btn-small blue right modal-trigger" id="btnActivarFactura" href="#modalActivarFactura" style="margin-right: 10px">Activar Factura</button>
			</div>
			<div id="tabla-productos-abierto">

			</div>
			<div class="row contenidoPedido" id="total-abierto" style="position:relative;margin-top:8px;margin-bottom:0px !important">

			</div>

			`)
		cargarTablaPedidoAbierto(res)
		$('#infoPedidoAbierto').click((e)=>{
			if(e.target.id=="eliminar"){
				console.log("abrir modal de eliminar pedido")
				let idEliminar=$('#idPedidoAbierto')[0].innerHTML
				eliminarPedido(idEliminar)
				$('#modalEliminarPedido').modal('open')
			}else{
				$('#contenedorPedido').hide()
				$('#mostrador1').show()
				$('.botonesRecepcion').show()
				refreshTablaPedidos()
				console.log("se cerro pedido")
				seccionActual="link-mostrador1"
			}
		})

		return res
	}).then((res)=>{
		infoPedidoShortcuts(res)
		
		modalAgregarProductoShortcuts(res)

		$('#inputTarjetaPuntos').focus()

		//Asignando acciones a los botones de evento y activando shortcuts
		$("#editarProductoFormulario").submit((e)=>{
			e.preventDefault();
			//$('.productoSeleccionado td')[0].html($('#ingresarCantidad').val())
			seccionActual="contenedorPedido"			
		})
		$("#modalCantidadProducto").modal({
			onOpenEnd:function(){
				seccionActual="modal3"
				$('#ingresarCantidad').focus()
			},
			onCloseEnd:function(){
				seccionActual="contenedorPedido"
				$('#ingresarCantidad').val("")				
			}
		})

		$("#crearNuevoProducto").modal({
			onOpenEnd:function(){
				seccionActual="crearNuevoProducto"
				$('#nuevoPrecio').focus()
				$('#formularioNuevoProducto').submit((e)=>{
					e.preventDefault()

					añadirProducto("ninguno",$('#nuevoPrecio').val(),res)

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
				if(tablaCargada==0){
					refresTablaAgregarProductos()
					tablaCargada=1;
				}else{
					console.log("deberia entrar aca")
					$('#tabla-agregar-productos label input').focus()
				}
			},
			onCloseEnd:function(){
				seccionActual="contenedorPedido"
			}
		})

		$('#abrirModalPagar').click(e=>{
			if(res.data.arrItems.length==0){
				e.preventDefault()
				M.toast({html: 'No se puede pagar un pedido sin productos.'})
			}else{
				$('#modalPagar').modal('open')
			}
		})

		$('#imprimir').click(e=>{
			if(res.data.arrItems.length==0){
				M.toast({html: 'Pedido vacio'})
			}else{
				M.toast({html:'Ticket impreso'})
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

			$('#campoCambio').html(`${formatNumber.new(cambio.toFixed(2),'$')}`)	
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
	M.toast({html:'Ticket impreso'})
	seccionActual="link-mostrador1"
}



/*La funcion que abre un pedido se divide en 2 una que abre el pedido y otra que se mantiene actualizando
los productos que se encuentran en ela, en la funcion cargarTablaPedidoAbierto se encarga de esto.*/
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
				<button class="btn btn-small deep-orange lighten-1 btneliminar"  id="${producto.id}">
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
		"ordering": false,
		pageLength: 4,
		columns: headers,
		data: tableData
	})
	$('#total-abierto').html(`<p class="col l12" style="margin:0px"> <span class="right">Mostrando: ${res.data.arrItems.length} productos </span></p>
		<div class="row" >
			<div class="col l4">
				<form id="formTarjetaPuntos">
					<input type="text" autocomplete="off" id="inputTarjetaPuntos">
				</form>
			</div>
			<div class="col l4">
				<h3 style="margin-top:3px !important;margin-bottom: 0px" class="center">Total:${formatNumber.new(res.data.total,'$')}</h3>
			</div>
			<div class="col l4">
				<div style="display:none" id="contenedorTarjeta">
					
					<p  style="float:left;font-size:18px;border:solid;border-radius:5px;border-width:1px; margin-top:0px;" >
						<i class="material-icons" style="float:left">credit_card</i> 
						Tarjeta de puntos: <span id="folioT-P">
											</span> 
						<button class="btn btn-small red" id="ocultarTarjeta" >X</button>
					</p>
				</div>
			</div>
		</div>
		`)
	$('.btneliminar').click((e)=>{
		eliminarProducto(e.target.id,res)
	})
}


/*esta funcion se encarga de abrir una tabla para ver todos los productos del sistema una vez previamente cargados
Esto para que el usuario pueda agregar productos a un pedido abierto.*/
function refresTablaAgregarProductos(){
	$('#tabla-agregar-productos').html(`
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
setTimeout(function() {
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
				`<input type="number" id="input${producto.sku}" placeholder="Cantidad" style="margin-top:0px;width:100px;"></input>`
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

	$('#tabla-agregar-productos label input').click(e=>{
		resetActualInput(-1)
	})

	$('#tabla-agregar-productos td input').click(e=>{
		var miArreglo=$('#tabla-agregar-productos td input')
		let seleccionado
		for(let i=0;i<miArreglo.length;i++){
			if(miArreglo[i].id==e.target.id){
				seleccionado=i
			}
		}
		console.log(seleccionado)
		resetActualInput(seleccionado)
	})

}, 3000);


}

/*Funcion de añadir un nuevo producto, recibe el ID, la cantidad del producto y el total de productos de un pedido,
se encarga de agregar a un producto y de volver a llamar a la cargar la tabla*/
var idProductosRandom=0
function añadirProducto(codigo,cantidad,res){
	//Iniciamos la busqueda del producto
	let conseguido=todosLosProductos.find((producto)=>{
		return producto.CB==codigo
	})

	if(!conseguido){
		conseguido=todosLosProductos.find((producto)=>{
			return producto.sku==codigo
		})
	}

	if(codigo=="ninguno"){
		let idraro=`ninguno${idProductosRandom}`
		let agregaProducto={
			quantity:1,
			unit:'unit',
			name:"Producto(otro)",
			price:cantidad,
			total:cantidad,
			id:idraro
		}
		idProductosRandom+=2
		res.data.arrItems.push(agregaProducto)
		cargarTablaPedidoAbierto(res)
		resetFocusProducto()
	}


	console.log(conseguido)
	if(conseguido){
		let agregaProducto={
			quantity:cantidad,
			unit:'unit',
			name:conseguido.name,
			price:10,
			total:10,
			id:conseguido.id
		}
		res.data.arrItems.push(agregaProducto)
		cargarTablaPedidoAbierto(res)
		resetFocusProducto()
	}
	//arr[0].focus();
	//infoPedidoShortcuts(res)
}




/*Funcion de eliminar producto, recibe un ID y el total de los productos en un pedido, se encarga de eliminar un producto
y volver a llamar a la funcion para cargar la tabla de nuevo sin el producto eliminado.*/
function eliminarProducto(id,res){
	for(let i=0;i<res.data.arrItems.length;i++){
		if(res.data.arrItems[i].id==id){
			res.data.arrItems.splice(i,1)		
		}
	}

	//$('html').off('keydown')
	cargarTablaPedidoAbierto(res)
	resetFocusProducto()
	//arr[0].focus();
	//infoPedidoShortcuts(res)
	//modalAgregarProductoShortcuts(res)
}