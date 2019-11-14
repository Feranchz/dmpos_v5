/*Funcion que se encarga de cargar los productos en el sistema, es ejecutada al apenas hacer login, muestra el progreso en un
modal que es mostrado hasta terminar dicha carga sin posibilidad de cancelarse ni cerrarse*/
function cargarProductos(){
	console.log("se estan cargando los productos")
	$('#cargandoProductos').modal({
		dismissible:false
	})
	$('#cargandoProductos').modal('open')
	console.log("cargandoProductos")
	let porcentaje=0;
	let barra=$('#cargaDeProductos')
	barra.css('width',`${porcentaje}%`)
	let cantidadDeProductos
	let paginasAIterar
	//la pripera peticion que se hace para traer la primera pagina de productos
	let requestFirst='/getProducts?page=1'
	getRequest(requestFirst)
	.then((res)=>{
		//optenemos primeor la cantidad de paginas
		paginasAIterar=res.data['x-wp-totalpages']
		cantidadDeProductos=res.data['x-wp-total']
		let misProductos=res.data.products


		todosLosProductos=todosLosProductos.concat(misProductos)
		barra.css('width',`${todosLosProductos.length/cantidadDeProductos*100}%`)
		$('#indiceDeCarga').html(`Cargando ${todosLosProductos.length} de ${cantidadDeProductos}`)
	})
	.then(()=>{
		//empezamos a iterar todas las paginas y cargarlas
		for(let i=37;i<=paginasAIterar;i++){
			let requestNext=`/getProducts?page=${i}`
			getRequest(requestNext)
			.then(resn=>{
				if(!resn.data.products){
					M.toast({html: 'Error cargando productos!'})
				}

				let otrosProductos=resn.data.products
				todosLosProductos=todosLosProductos.concat(otrosProductos)
				barra.css('width',`${todosLosProductos.length/cantidadDeProductos*100}%`)
				$('#indiceDeCarga').html(`Cargando ${todosLosProductos.length} de ${cantidadDeProductos}`)
				if(todosLosProductos.length==cantidadDeProductos-3500){
					$("#cargandoProductos").modal('close')
					M.toast({html: 'Productos cargados!'})
				}
			})

		}
	})
}
/*variable global que se maneja en distintas areas para optener los productos cargados*/
var todosLosProductos=[]