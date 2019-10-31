
	//Agreando shortcuts

function infoPedidoShortcuts(res){
	if(seccionActual=='contenedorPedido'){
		//Añadiendo evento click a los registros para abrir el pedido si se clickea uno
		let arr=$('#tabla-productos-abierto table tbody tr')
		arr[0].className+=" productoSeleccionado"
		arr[0].focus();
		let actual=0;
		//Añadiendo evento a los registros por si se da enter con uno seleccionado
	    $('html').keydown((e)=>{
	    	if(seccionActual=='contenedorPedido'){
		    	if(e.keyCode===38 && (actual-1>=0)){
		    		e.preventDefault();
		    		actual-=1
		    	}else if(e.keyCode===40 && (actual+1<arr.length)){
		    		e.preventDefault();
		    		actual+=1
		    	}else if(e.keyCode==13){
		    		e.preventDefault();
		    		$('#btneditar').click()
		    	}else if(e.keyCode==27){
				   	$('#contenedorPedido').hide()
					$('#mostrador1').show()
					$('.nuevoTraspaso').show()
					refreshTablaPedidos()
					console.log("se cerro pedido")
					seccionActual="link-mostrador1"
		    	}else if(e.keyCode==46){
		    		e.preventDefault();
		    		eliminarProducto(res.data.arrItems[actual].id,res)
		    		return 
		    	}
		    	console.log(actual)
		    	$(".productoSeleccionado").removeClass("productoSeleccionado")
		    	arr[actual].className+=" productoSeleccionado"
	    	}
	    })
	}
}

function APedidosShortcuts(){
	if(seccionActual=='link-mostrador1'){
		let arr=$('#tabla-pedidos table tbody tr')
		$('#tabla-pedidos table tbody tr').click((e)=>{
			if(e.target.id!=="eliminar"){
				let idSeleccionado=$(e.target).parent()[0].firstChild.innerHTML
				verInfoPedido(idSeleccionado,"abrir")
				console.log("holaaaaaaaaaaa")
				$('.nuevoTraspaso').hide()
			}else if(e.target.id==="eliminar"){
				$('#boton-eliminar-pedido-modal').click(()=>{
					console.log("funcion que elimina el pedido")
					refreshTablaPedidos()
				})
			}
		})
		$('#actualizarPedidos').click(()=>{
			refreshTablaPedidos()
		})
	console.log("funcionan las shortcuts")
		//arr.className+=" pedidoSeleccionado"
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
		    		$('#tabla-pedidos').scrollTop(posicion)
		    		e.preventDefault();
		    		actual-=1
		    	}else if(e.keyCode===40 && (actual+1<arr.length)){
		    		posicion+=48
		 			//se presiono la tecla hacia abajo
 		    		$('#tabla-pedidos').scrollTop(posicion)                
		    		e.preventDefault();
		    		actual+=1
		    	}else if(e.keyCode==13){
		    		//se presiono enter
		    		e.preventDefault();
		    		let idSeleccionado=$('.pedidoSeleccionado td')[0].innerHTML
		    		console.log(idSeleccionado)
		    		verInfoPedido(idSeleccionado,"abrir")
		    		$('.nuevoTraspaso').hide()
		    	}else if(e.keyCode==65){
		    		//se presiono la tecla A
		    		e.preventDefault()
		    		refreshTablaPedidos()
		    	}
		    	$(".pedidoSeleccionado").removeClass("pedidoSeleccionado")
		    	arr[actual].className+=" pedidoSeleccionado"
	    	}
	    })		
	}
}
function modalEditarShortcuts(){
	if(seccionActual=='modal3'){
		$('html').keydown(()=>{
			if(e.keyCode==27){
				seccionActual='contenedorPedido'
			}				
		})
	}
}

