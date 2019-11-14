
function manejadorImpresora(){
	var seccionAnterior
	$('#btnModalConfigurarImpresora').click(e=>{
		seccionAnterior=seccionActual
		seccionActual='configImpresora'
		$('#modalConfigurarImpresora').modal('open')
	})
	$('#cerrarImpresora').click(e=>{
		seccionActual=seccionAnterior
	})



	$('#conectarImpresora').click(e=>{
		qz.websocket.connect()
		.then(function() {
			M.toast({html:'Conectado'})
		})
	})

	var config
	$('#buscarImpresora').click(e=>{
		let miImpresora=$('#impresoraABuscar').val()
		qz.printers.find(miImpresora)
		.then(function(found) {
		    M.toast({html:"Printer: " + found});
		    config = qz.configs.create(found)
		})
		.catch(function(e) { M.toast({html:"Error consiguiendo impresora"}); })
	})

	$('#probarImpresora').click(e=>{
		 let data = ['^XA^FO50,50^ADN,36,20^FDRAW ZPL EXAMPLE^FS^XZ']
		 qz.print(config, data)
		 .then(e=>{
		 	M.toast({html:"Imprimiendo prueba"})
		 })
		 .catch(e=>{M.toast({html:"Error imprimiendo"})})
	})

	arrBoonesImpresora=$(".botones-impresora").click((e)=>{
		$('.boton-impresora-seleccionado').removeClass("boton-impresora-seleccionado")
		e.target.className+=" boton-impresora-seleccionado"
	})
}

function imprimirEtiqueta(e){
	let conseguido=todosLosProductos.find((producto)=>{
		return producto.CB==e
	})
	$('#nombreEtiqueta').html(conseguido.name)
	//console.log(conseguido.name)
	$('#modalImprimirEtiqueta').modal('open')
}