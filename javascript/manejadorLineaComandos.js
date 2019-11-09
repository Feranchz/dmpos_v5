function comandosDeListaPedidos(comando) {
	//Descubriendo que comando es
	if(comando[0]=='v'){
		let idVendedor=comando.substr(1,comando.length)
		llenarTablaClientes('publico',idVendedor)
		$("#modalClienteTraspaso").modal('open')
	}
}



function comandoDePedidoAbierto(comando){
	if(comando[0]=='T' && comando[1]=='P'){
		idTarjeta=comando.substr(3,comando.length)
		añadirPuntosTarjetaFidelidad(idTarjeta)
	}
}


function añadirPuntosTarjetaFidelidad(tarjeta){

	console.log("llamada al ws de tarjeta")
	console.log(tarjeta)

	$('#folioT-P').html('algun folio')
	$('#contenedorTarjeta').show()
	M.toast({html:'Tarjeta de fidelidad Agregada'})
	$('#ocultarTarjeta').click(e=>{
		console.log("adasdasd")
		M.toast({html:'Tarjeta de fidelidad Eliminada'})
		$('#contenedorTarjeta').hide()
	})
}