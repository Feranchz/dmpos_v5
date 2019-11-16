
var tipoDeImpresora=""
var impresora=""

//Agregar libreria para convertir de html a imagenn
/* in ES 6 */
//import domtoimage from 'dom-to-image';



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

	$('#conectarImpresora').click()





	var config
	$('#buscarImpresora').click(e=>{
		let miImpresora=$('#impresoraABuscar').val()
		qz.printers.find(miImpresora)
		.then(function(found) {
		    M.toast({html:"Impresora conseguida: " + found})
		    impresora=found
		    localStorage.setItem('impresora',impresora)
		    config = qz.configs.create(found)
		    console.log(impresora)
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
	//Cambiar el tipo de impresora
	$(".botones-impresora").click((e)=>{
		$('.boton-impresora-seleccionado').removeClass("boton-impresora-seleccionado")
		e.target.className+=" boton-impresora-seleccionado"
		tipoDeImpresora=e.target.id
		console.log(tipoDeImpresora)
		localStorage.setItem('tipo_impresion',tipoDeImpresora)
	})


	//fijar tipo de impresora si ya hay uno guardado
	if(localStorage.getItem('tipo_impresion')){
		tipoDeImpresora=localStorage.getItem('tipo_impresion')
		$(`#${tipoDeImpresora}`).click()	
	}
}

	//Iniciar coneccion con qz
	function startConnection(){
		qz.websocket.connect()
		.then(function() {
			M.toast({html:'Conectado QZ'})
		})
		.then(function(){
			if(localStorage.getItem('impresora')){
				impresora=localStorage.getItem('impresora')
				$("#impresoraABuscar").val(impresora)
				$('#buscarImpresora').click()
			}
		})
	}

	//Finalizar coneccion con qz
    function endConnection() {
        if (qz.websocket.isActive()) {
            qz.websocket.disconnect().then(function() {
                M.toast({html:"QZ desconectado"})
            }).catch(handleConnectionError);
        } else {
        	 M.toast({html:"QZ desconectado"})
        }
    }


