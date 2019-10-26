  $(document).ready(function(){
    $('.modal').modal({
    	onCloseEnd:function(){
    		$('#contenidoPedidoModal').hide()
    	}
    });
  });

function verInfoPedido(e,boton){
	if(boton=='ver'){
		console.log("viene de un ver")
		abrirPedido(e.target.id)
	}
	//cargarPedido(e.target.id)
}

function abrirPedido(id){
	$('#headerTicketModal').html(`
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
	//Variable para completar peticion
	var peticion="/getOrderInfo?id="+id;
	//variable de la peticion
	getRequest(peticion)
	.then((res)=>{
		$('#headerTicketModal').html(`<p>Informacion del ticket: ${res.data.id}</p>`)
		$('#tabla-productos-modal').html('<table class="centered" style="width: 100%"></table>')
		let headers = [
			{
				title: 'Cantidad'
			},
			{
				title: 'Unidad'
			},
			{
				title: 'Nombre'
			},
			{
				title: 'Precio'
			},
			{
				title: 'Total'
			},
			{
				title: 'Acción'
			}
		]
		let tableData = []
		if(res.data.arrItems){
			res.data.arrItems.forEach(producto => {
				tableData.push([
					producto.quantity,
					producto.unit,
					producto.name,
					producto.price,
					producto.total,
					`<button class="btn btn-small deep-orange lighten-1">
						Eliminar
					</button>
					`
				])
			})
		}
		console.log(tableData)
		$('#tabla-productos-modal table').DataTable({
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
	        data: tableData,
		})
		$('#total-modal').html(`<h3 class="centered">Total:${res.data.total}</h3>`)
		$('#contenidoPedidoModal').show()
	})
}