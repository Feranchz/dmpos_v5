/*En este archivo se encuentra todo el manejo de shortcuts por cada seccion del sistema existe una funcion que los habilita*/


//Agreando shortcuts

//Globales para el manejo de infoPedido 
var gipactual
var gipposicion
var giparr
function infoPedidoShortcuts(res){
//	if(seccionActual=='contenedorPedido'){
		//Añadiendo evento click a los registros para abrir el pedido si se clickea uno
		resetFocusProducto()

		console.log("se llamo esta funcion")

	    $('html').keydown((e)=>{
	    	if(seccionActual=='contenedorPedido'){
		    	if(e.keyCode===38 && (gipactual-1>=0)){
		    		//presiono tecla hacia arriba
		    		gipposicion-=48
		    		
		    		$('.dataTables_scrollBody').scrollTop(gipposicion)
		    		e.preventDefault();
		    		gipactual-=1
		    		console.log(gipactual)
		    	}else if(e.keyCode===40 && (gipactual+1<arr.length)){
		 			//se presiono la tecla hacia abajo
		 			gipposicion+=48
		 			
 		    		$('.dataTables_scrollBody').scrollTop(gipposicion)  
		    		e.preventDefault();
		    		gipactual+=1
		    		console.log(gipactual)
		    	}else if(e.keyCode==13 && $('#inputTarjetaPuntos').val().length==0){

		    		e.preventDefault();
		    		$('#btneditar').click()
		    	}else if(e.keyCode==27){
				   	$('#contenedorPedido').hide()
					$('#mostrador1').show()
					$('.porRecepcion').show()
					refreshTablaPedidos()
					console.log("se cerro pedido")
					seccionActual="link-mostrador1"
		    	}else if(e.keyCode==46){
		    		e.preventDefault();
		    		idAEliminar=$('.productoSeleccionado td .btneliminar').attr('id')
		    		eliminarProducto(idAEliminar,res)
		    		return 
		    	}else if(e.keyCode==79){
		    		console.log("se deberia abrir la lista de productos para seleccionar")
		    		$('#btnAgregaProductos').click()
		    		$('#modalAgregarProductos').modal('open')
		    	}else if(e.keyCode==78){
		    		console.log("se deberia abrir el modal para agregar productos nuevos no registrados")
		    		$('#btnCrearNuevoProducto').click()
		    		//$('#crearNuevoProducto').modal('open')
		    	}else if(e.keyCode==73){
		    		console.log(" se envia la accion de imprimir")
		    		$('#imprimir').click()
		    	}else if(e.keyCode==76){
		    		console.log("se deberia abrir la ventana de pago")
		    		$('#abrirModalPagar').click()
		    	}else if(e.keyCode==70){
		    		console.log("se deberia activar la factura")
		    		$('#btnActivarFactura').click()
		    		$('#modalActivarFactura').modal('open')
		    	}else{
		    		//Se presiono otra tecla
		    		//e.preventDefault()
		    		console.log(e.keyCode)
		    		let campoInput=$('#inputTarjetaPuntos')
		    		campoInput.show()
		    		campoInput.focus()

		    		if(e.keyCode==13){
		    			e.preventDefault()
		    			comandoDePedidoAbierto(campoInput.val(),res)
		    			campoInput.val("")
		    			console.log("no hace el hide")
		    		}
		    	}
		    	$(".productoSeleccionado").removeClass("productoSeleccionado")
		    	arr[gipactual].className+=" productoSeleccionado"
	    	}
	    })
	//}
}
//Esta funcion resetea el focus de la tabla de productos
function resetFocusProducto(){
	arr=$('#tabla-productos-abierto table tbody tr')
	arr[0].className+=" productoSeleccionado"
	
	gipactual=0
	gipposicion=0
}


function APedidosShortcuts(){
	console.log("shortadfsdf")
	$('#inputConsolaPedidos').focus()
	if(seccionActual=='link-mostrador1'){
		let arr=$('#tabla-pedidos table tbody tr')
		$('#tabla-pedidos table tbody tr').click((e)=>{
			if(e.target.id!=="eliminar"){
				let idSeleccionado=$(e.target).parent()[0].firstChild.innerHTML
				verInfoPedido(idSeleccionado,"abrir")
				$('.botonesRecepcion').hide()
			}else if(e.target.id==="eliminar"){
				let idSeleccionado=$(e.target).parent().parent()[0].firstChild.innerHTML
				console.log("se le dio a eliminar")
				eliminarPedido(idSeleccionado)
			}
		})
		$('#actualizarPedidos').click(()=>{
			$('#actualizarPedidos').off('click')
			$('html').off('keydown')
			refreshTablaPedidos()
		})

		//seleccionar pedido
		arr[0].className+=" pedidoSeleccionado"
		let actual=0;
		//posicion del scroll
		let posicion=0;
		//Añadiendo evento a los registros por si se da enter con uno seleccionado
		$('#tabla-pedidos').focus()
	    $('html').keydown(function(e){
	    	if(seccionActual=='link-mostrador1'){
	    		//se presiono la tecla hacia arriba
		    	if(e.keyCode===38 && (actual-1>=0)){
		    		posicion-=48
		    		$('.dataTables_scrollBody').scrollTop(posicion)
		    		e.preventDefault();
		    		actual-=1
		    	}else if(e.keyCode===40 && (actual+1<arr.length)){
		    		posicion+=48
		 			//se presiono la tecla hacia abajo
 		    		$('.dataTables_scrollBody').scrollTop(posicion)                
		    		e.preventDefault();
		    		actual+=1
		    	}else if(e.keyCode==13 && $('#inputConsolaPedidos').val().length==0){
		    		//se presiono enter
		    		e.preventDefault();
		    		let idSeleccionado=$('.pedidoSeleccionado td')[0].innerHTML
		    		console.log(idSeleccionado)
		    		verInfoPedido(idSeleccionado,"abrir")
		    		$('.botonesRecepcion').hide()
		    		return
		    	}else if(e.keyCode==65){
		    		//se presiono la tecla A
		    		$('html').off('keydown')
		    		$('#actualizarPedidos').off('click')
		    		e.preventDefault()
		    		refreshTablaPedidos()
		    		return
		    	}else if(e.keyCode==46){
		    		//Se presiono eliminar
		    		e.preventDefault();
		    		console.log("ahora aqui")
		    		$('html').off('keydown')
		    		$('.pedidoSeleccionado td button').click()
		    		return
		    	}else if(e.keyCode==78){
		    		//Nuevo pedido de tipo publico
		    		console.log(" se deberia crear nuevo pedido")
		    		$('#btnTipoPublico').click()
		    		$('#modalClienteTraspaso').modal('open')
		    	}else{
		    		//Se presiono otra tecla
		    		//e.preventDefault()
		    		console.log(e.keyCode)
		    		let campoInput=$('#inputConsolaPedidos')
		    		campoInput.show()
		    		campoInput.focus()

		    		if(e.keyCode==13){
		    			e.preventDefault()
		    			comandosDeListaPedidos(campoInput.val())
		    			campoInput.val("")
		    			console.log("no hace el hide")
		    		}

		    	}
		    	$(".pedidoSeleccionado").removeClass("pedidoSeleccionado")
		    	arr[actual].className+=" pedidoSeleccionado"
	    	}
	    })		
	}
}

function modalClienteTraspasoShortcuts(){
	if(seccionActual=='modalClienteTraspaso'){
		console.log("pasa poraqui")

		$('html').keydown(e=>{
			if(seccionActual=='modalClienteTraspaso'){
				console.log("el peo es que esta entrando")
				if(e.keyCode==27){
					seccionActual='link-mostrador1'
				}
			}
		})

	}
}



function modalEditarShortcuts(){
	if(seccionActual=='modal3'){
		$('html').keydown((e)=>{
			if(e.keyCode==27){
				seccionActual='contenedorPedido'
			}				
		})
	}
}
function modalEliminarPedidoShortcuts(){
	if(seccionActual=='modal-eliminar-pedido'){
		$('html').keydown((e)=>{
			if(e.keyCode==13){
				$('#boton-eliminar-pedido-modal').click()
				$('#boton-eliminar-pedido-modal').off('click')
			}
		})
	}
}

function modalNuevoProductoShortcuts(){
	if(seccionActual=="crearNuevoProducto"){
		$('html').keydown(e=>{
			if(e.keyCode==27){
				//$('html').off('keydown')
				$("#crearNuevoProducto").modal('close')
			}
		})
	}

}

function modalAgregarProductoShortcuts(res){
	//el input actual
	let actual=-1
	//if(seccionActual=="modalAgregarProductos"){
		$('#DataTables_Table_2_paginate').click(e=>{
			actual=0;
			$('#tabla-agregar-productos td input')[actual].focus()
			console.log("hola")
		})

		$('html').keydown(e=>{
			if(seccionActual=="modalAgregarProductos"){
				if(e.keyCode==38 && (actual-1>=0)){
					e.preventDefault()
					actual-=1
					$('#tabla-agregar-productos td input')[actual].focus()	
				}else if(e.keyCode==40 && (actual+1<5)){
					e.preventDefault()
					actual+=1
					$('#tabla-agregar-productos td input')[actual].focus()	
				}else if(e.keyCode==13){
					e.preventDefault()
					if(actual==-1){
						$('#tabla-agregar-productos td input')[0].focus()
						actual+=1
					}else{
						console.log("agregar el producto al pedido")
						let iActual=$('#tabla-agregar-productos td input')[actual].id
						
						let sku=iActual.substr(5,iActual.length)
						console.log(sku)
						cantidad=$(`#${iActual}`).val()
						añadirProducto(sku,cantidad,res)
						$(`#${iActual}`).val("")

						
						$('#tabla-agregar-productos label input').val("")
						$('#tabla-agregar-productos label input').focus()
						
						actual=-1
					}
				}
			}
		})
	//}
}




function modalPagarPedidoShortcuts(){
	if(seccionActual=="modalPagar"){
		$('html').keydown(e=>{
			if(seccionActual=="modalPagar"){
				if(e.keyCode==39){
				//Tecla hacia a la derecha
					console.log("derecha")
					$('#tarjetaBtn').click()
				}else if(e.keyCode==37){
				//Tecla hacia la izquierda
					console.log("izquierda")
					$('#efectivoBtn').click()
				}else if(e.keyCode==13){
				//tecla enter
					$('#btnRealizaPago').click()
					e.keyCode
				}else if(e.keyCode==27){
					$('#cancelarPago').click()
				}
			}
		})
	}
}
function modalPagarTarjetaShortcuts(){
	if(seccionActual=="ingresando-folio"){
		$('html').keydown(e=>{
			if(seccionActual=="ingresando-folio"){
				if(e.keyCode==27){

					$('#cancelarTarjeta').click()
				}
			}
		})
		
	}
}