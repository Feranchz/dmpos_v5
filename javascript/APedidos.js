function refreshTablaPedidos(){
	$('#tabla-pedidos').html(`
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

	getRequest(`/getOrdersPending`)
	.then(res => {
		$('#tabla-pedidos').html('<table class="highlight centered" style="width: 100%"></table>')
		let headers = [
			{
				title: 'ID'
			},
			{
				title: 'Fecha'
			},
			{
				title: 'Tipo de pedido'
			},
			{
				title: 'Cliente'
			},
			{
				title: 'Vendedor'
			},
			{
				title: 'Accion'
			}
		]
		let tableData = []
		if(res.data){
			res.data.forEach(reporte => {
				tableData.push([
					reporte.id,
					reporte.createdAt.substring(0,10),
					reporte.orderType,
					reporte.customer,
					reporte.salesman,
					`<button class="btn-floating grey btn-small darken-3 lighten-1  modal-trigger" id="eliminar" href="#modal2" >X</button>`
				])
			})
		}

		$('#tabla-pedidos table').DataTable({
			searching:false,
			"oLanguage": {
	          "sLengthMenu": "",
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
	        paginate:false,
	        columns: headers,
	        pageResize: true,
	        data: tableData,
	        lengthMenu: [10,25,50,100],
        	pageLength: 10,
        	buttons: [
        		{
        			extend: 'excelHtml5',
        		}
        	]
		})
	}).then(()=>{APedidosShortcuts()})
}
