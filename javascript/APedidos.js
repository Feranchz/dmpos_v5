function cambiarABarraPedidos() {
	//Modifica el nabvar al estilo pedidos
	$.ajax({
		url:'admin/vistahtml/nabvarPedido.html',
		success:function(barra){
			$("#barraSuperior").html(barra)
			rankingIndicador();
		}
	});
}


function rankingIndicador(){
	//Aqui deberia agregar los nombres de los usuarios al ranking
	console.log("dentro de modificacion de ranking")
}





function quitarBarraPedidos(){
	//Al salir de pedidos se debe quitar la barra superior, esto lo hace xd
	$.ajax({
		url:'admin/vistahtml/noNabvarPedido.html',
		success:function(barra){
			$("#barraSuperior").html(barra)
		}
	})
}