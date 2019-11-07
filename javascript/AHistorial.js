/*seccion de historial se encarga de todo el manejo del hisotrial, administrar las busquedas y cargar la tabla para
abrir los pedidos que alli se encuentran */

$(document).ready(function(){

	/*En esta modificacion le paso el id a la funcion refreshTablaHistorial para saber de donde viene el refresh
	y asi poder modificar el tipo de consulta desde el refresh*/

	$('#campoFecha').change(function(e){
		console.log(e)
		refreshTablaHistorial(e.target.id)
	})

	//Agregando funcionalidad al boton " Buscar " al lado de la entrada fecha
	$('#buscar-fecha-historial').click(function(){
		refreshTablaHistorial('campoFecha')
		busquedaHistorial="campoFecha"
	})
	$('#buscar-ticket-historial').click(function(e){
		refreshTablaHistorial(e.target.id)
		busquedaHistorial=e.target.id
		console.log(e.target.id)
	})
})
var busquedaHistorial=""

function refreshTablaHistorial(e){

	busquedaHistorial=e
	//Averiguando el tipo de consulta	
	var consulta
	let date = $('#campoFecha').val()
	if(e=='campoFecha'){
	consulta=`/getOrdersByDate?date=${date}`
	}else if(e=='buscar-ticket-historial'){
		var id = $('#campoTicketHistorial').val()
		console.log(parseInt(id))
		//Validando que no inserte un id malo
		if(isNaN(parseInt(id))){
			return
		}
		consulta=`/getOrdersById?id=${id}`
		console.log(consulta);
	}
	$('#tabla-historial').html(`
		<div style="text-align: center">
			<div class="loading-box" style="margin-top: 20px">
				<div class="preloader-wrapper big active">
				    <div class="spinner-layer spinner-blue-only">
					    <div class="circle-clipper left">
					    	<div class="circle"></div>
					    </div>
					    <div class="gap-patch">
					    	<div class="circle"></div>
					    </div>
					    <div class="circle-clipper right">
					        <div class="circle"></div>
					    </div>
					</div>
				</div>
			</div>
		</div>
	`)

	getRequest(consulta)
	.then(res => {
		$('#tabla-historial').html('<table class="centered" style="width: 100%"></table>')
		let headers = [
			{
				title: 'ID'
			},
			{
				title: 'Fecha'
			},
			{
				title: 'Cliente'
			},
			{
				title: 'Total'
			},
			{
				title: 'Vendedor'
			},
			{
				title: 'Estatus'
			},
			{
				title: 'Acción'
			}
		]
		let tableData = []
		if(res.data){
			res.data.forEach(reporte => {
				tableData.push([
					reporte.id,
					`<span class="fecha" title="${reporte.createdAt}">${moment(reporte.createdAt).fromNow()}</span>`,
					reporte.customer,
					formatNumber.new(reporte.total,'$'),
					reporte.salesman,
					reporte.status,
					`<button class="btn btn-small ver modal-trigger" href="#modalInfoPedido" id="${reporte.id}">
						Ver
					</button>
					<button class="btn btn-small orange">
						Reset
					</button>
					<button class="btn btn-small blue">
						Activar Factura
					</button>`
				])
			})
		}
		$('#tabla-historial table').DataTable({
			"sDom": "Bfrt<'table-footer'ip>",
			"oLanguage": {
	          "sLengthMenu": "<p>Registros por página:</p> <div>_MENU_</div>",
	          "sInfo": "Mostrando _START_ al _END_ de _TOTAL_ registros",
	          "sZeroRecords": "No se encontró ningún registro",
	          "sInfoEmpty": "No existen registros",
	          "sInfoFiltered": "(Filtrado de _MAX_ total de registros)",
	          "sSearchPlaceholder": "Buscar...",
	          "sSearch": "",
	          "oPaginate": {
	            "sFirst": "Primero",
	            "sLast": "Último",
	            "sNext": "Siguiente",
	            "sPrevious": "Anterior"
	          }
	        },
	        scrollX: true,
	        scrollCollapse: true,
	        columns: headers,
	        pageResize: true,
	        data: tableData,
	        lengthMenu: [10,25,50,100],
        	pageLength: 10,
        	buttons: [
        		{
        			extend: 'excelHtml5',
        			filename: `Historial del ${date}.xlsx`
        		}
        	]
		})
	})
	.then(()=>{
		console.log("hola")
		//Agregando funcionalidad a los botones de accion
		$('.ver').click(function(e){
			verInfoPedido(e,'ver');
		})
	})

}

/*Esta funcion se encarga de eliminar un pedido desde el hisotrial y refrescar dicho historial para observar los cambios*/
function eliminarDesdeHistorial(id){
	let paraEliminar=`/deleteOrder?id=${id}`
	console.log("pasan cosas ")
	$('#modalLoaderOnly').modal({
		onOpenEnd:function(){
			$('#accionCargando').html('Eliminando Pedido')
		}
	})
	$('#modalLoaderOnly').modal('open')
	console.log("siguen")
	deleteRequest(paraEliminar)
	.then(res=>{
		console.log(busquedaHistorial)
		
		refreshTablaHistorial(busquedaHistorial)
		return res
	})
	.then(res=>{
		M.toast({html: `${res.msg}`})
		$('#cerrarPedidoHistorial').click()
		$('#modalLoaderOnly').modal('close')
	})

}