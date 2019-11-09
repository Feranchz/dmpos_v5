function comandosDeListaPedidos(comando) {
	//Descubriendo que comando es
	if(comando[0]=='v'){
		let idVendedor=comando.substr(1,comando.length)
		llenarTablaClientes('publico',idVendedor)
		$("#modalClienteTraspaso").modal('open')
	}
}