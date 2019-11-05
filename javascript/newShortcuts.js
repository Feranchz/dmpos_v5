
//esta funcion se realizara de la siguiente manera: dependiendo de la seccion en la que se este y la tecla que se pulse
//se ejecutara un fragmento de codigo de ella misma, por ello tantos condicionales anidados

function activarShortCuts() {

	//pedido actual que se tiene seleccionado
	let actualPedido=0;
	//posicion actual del scroll en pedidos
	let posicionPedido=0;


	$('html').keydown(e=>{
		if(e.keycode==38){
			//se presiono la tecla hacia arriba:
			if(seccionActual=='contenedorPedido'){
				//se esta en un pedido abierto:
				e.preventDefault();
				posicionPedido-=48
				$('.dataTables_scrollBody').scrollTop(posicion)
				actualPedido-=1
			}

		}else if(e.keyCode===40 &&)
	})
}