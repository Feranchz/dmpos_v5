$(document).ready(function(){
	$('#campoFecha').change(function(){
		refreshTablaHistorial()
	})
})

function refreshTablaHistorial(){
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
	let date = $('#campoFecha').val()
	getRequest(`/getOrdersByDate?date=${date}`)
	.then(res => {
		$('#tabla-historial').html('<table style="width: 100%"></table>')
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
					`<button class="btn btn-small">
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
}