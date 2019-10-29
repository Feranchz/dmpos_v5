
	//Agreando shortcuts

function infoPedidoShortcuts(){
	if(seccionActual=='contenedorPedido'){
		//Añadiendo evento click a los registros para abrir el pedido si se clickea uno
		let arr=$('#tabla-productos-abierto table tbody tr')
		arr[0].className+=" productoSeleccionado"
		arr[0].focus();
		let actual=0;
		//Añadiendo evento a los registros por si se da enter con uno seleccionado
	    $('html').keydown(function(e){
	    	if(seccionActual=='contenedorPedido'){
		    	if(e.keyCode===38 && (actual-1>=0)){
		    		e.preventDefault();
		    		actual-=1
		    	}else if(e.keyCode===40 && (actual+1<arr.length)){
		    		e.preventDefault();
		    		actual+=1
		    	}else if(e.keyCode==13){
		    		e.preventDefault();
		    		/*
		    		let idSeleccionado=$('.pedidoSeleccionado td')[0].innerHTML
		    		console.log(idSeleccionado)
		    		verInfoPedido(idSeleccionado,"abrir")*/
		    	}else if(e.keyCode==27){
				   	$('#contenedorPedido').hide()
					$('#mostrador1').show()
					seccionActual="link-mostrador1"
		    	}
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
			let idSeleccionado=$(e.target).parent()[0].firstChild.innerHTML
			verInfoPedido(idSeleccionado,"abrir")
		})


	console.log("funcionan las shortcuts")
		//arr.className+=" pedidoSeleccionado"
		arr[0].className+=" pedidoSeleccionado"
		let actual=0;
		//Añadiendo evento a los registros por si se da enter con uno seleccionado
		$('#tabla-pedidos').focus()
	    $('html').keydown(function(e){
	    	if(seccionActual=='link-mostrador1'){
		    	if(e.keyCode===38 && (actual-1>=0)){
		    		e.preventDefault();
		    		actual-=1
		    	}else if(e.keyCode===40 && (actual+1<arr.length)){
		    		e.preventDefault();
		    		actual+=1
		    	}else if(e.keyCode==13){
		    		e.preventDefault();
		    		let idSeleccionado=$('.pedidoSeleccionado td')[0].innerHTML
		    		console.log(idSeleccionado)
		    		verInfoPedido(idSeleccionado,"abrir")
		    	}
		    	$(".pedidoSeleccionado").removeClass("pedidoSeleccionado")
		    	arr[actual].className+=" pedidoSeleccionado"
	    	}
	    })		
	}
}
