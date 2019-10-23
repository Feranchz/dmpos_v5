function cambiarABarraPedidos() {
	$.ajax({
		url:'admin/vistahtml/nabvarPedido.html',
		success:function(barra){
			$("#barraSuperior").html(barra)
			rankingIndicador();
		}
	});
}


function rankingIndicador(){
	console.log("dentro de modificacion de ranking")
	var indicadores=""

	//$("#indicadoresid").html("<p>modificado</p>")
}


function quitarBarraPedidos(){
	$.ajax({
		url:'admin/vistahtml/noNabvarPedido.html',
		success:function(barra){
			$("#barraSuperior").html(barra)
		}
	})
}