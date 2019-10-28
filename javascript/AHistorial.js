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
	})



	$('#buscar-ticket-historial').click(function(e){
		refreshTablaHistorial(e.target.id)
		console.log(e.target.id)
	})
})

function refreshTablaHistorial(e){


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
					reporte.createdAt.substring(0,10),
					reporte.customer,
					reporte.total,
					reporte.salesman,
					reporte.status,
					`<button class="btn btn-small ver modal-trigger" href="#modal1" id="${reporte.id}">
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