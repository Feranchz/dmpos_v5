function abrirTablaHistorial(){
	//Cargar la tabla del historial
	$.ajax({
		url:'admin/vistahtml/tablaHistorial.html',
		success:function(tabla){
			$("#contenedorReporte").html(tabla)
			$('.datepicker').datepicker();
			$('#buscador-historial-externo').click(filtrarHistorial)
			$('#filtrarHistorial').keyup(filtrarHistorial);
			cargarTablaHisotial(fakeTable);
		}
	})
}

//dataHistorialFilrada guarda los registros de la data filtrada del historial
var dataHistorialFiltrada;
var fakeTable=[
		[1,4,"ninguno",12,"nadie","ninguno",""],
		[12,5,"asd",12,"nadie","ninguno",""],
		[3,6,"adf",12,"nadie","ninguno",""],
		[1,4,"ninguno",12,"nadie","ninguno",""],
		[12,5,"asd",12,"nadie","ninguno",""],
		[3,6,"adf",12,"nadie","ninguno",""],
		[3,6,"adf",12,"nadie","ninguno",""],
		[3,6,"adf",12,"nadie","ninguno",""],
		[3,6,"adf",12,"nadie","ninguno",""],
		[3,6,"adf",12,"nadie","ninguno",""],
		[3,6,"adf",12,"nadie","ninguno",""],
		[3,6,"adf",12,"nadie","ninguno",""]
]
dataHistorialFiltrada=fakeTable;
function cargarTablaHisotial(dataFiltrada){
	$("#reporteHistorial").html("")
	if(dataFiltrada.length>0){
		//Registros a mostrar contiene la cantidad de registros a mostrar xD
		let regMostrar=dataFiltrada.length;
		//Los sobrantes para completar la tabla
		let regSobrantes=10-(regMostrar%10)

		//Agregar registros a la tabla
		dataFiltrada.map((r)=>{
		$("#reporteHistorial").append(`
			<tr>
				<td>${r[0]}</td>
				<td>${r[1]}</td>
				<td>${r[2]}</td>
				<td>${r[3]}</td>
				<td>${r[4]}</td>
				<td>${r[5]}</td>
				<td>
					<button class="btn btn-small">
						Ver
					</button>
					<button class="btn btn-small orange">
						Reset
					</button>
					<button class="btn btn-small blue">
						Activar Factura
					</button>
				</td>
			</tr>
			`);
		})

		//Completar tabla

		if((regMostrar%10)!=0){
			for(let i=0;i<regSobrantes;i++){
				$("#reporteHistorial").append(`
					<tr>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
					</tr>
			`);

			}
		}else if(dataFiltrada.length==0){
			console.log("dataFiltrada")
			for(let i=0;i<10;i++){
				$("#reporteHistorial").append(`
					<tr>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
					</tr>
			`);
			}

		}
	//Agregando paginacion
	$(".display").DataTable({
			pageLength: 10,
			retrieve: true,
			searching: false,
	   		ordering:  false,
	   		
		});
	}        
}

function filtrarHistorial(e){
	//Esta funcion filtra todos los datos segun los parametros que se obtienen de los inputs de la tabla historial
	if(e.target.id==="buscador-historial-externo"){
		let ticketBuscar=parseInt($("#busqueda-ticket-historial").val());
		console.log(ticketBuscar)
		if(isNaN(ticketBuscar)){
			dataHistorialFiltrada=fakeTable;
			cargarTablaHisotial(fakeTable);
			return
		}
		dataHistorialFiltrada=[]
		fakeTable.map((r)=>{
			if(ticketBuscar==r[0]){
				dataHistorialFiltrada.push(r)
			}
		})
		cargarTablaHisotial(dataHistorialFiltrada); 
	}else if(e.target.id==="filtrarHistorial"){
		let valorBusqueda=$("#filtrarHistorial").val();
		let nuevaDataFiltrada=[];

		if(valorBusqueda==""){
			cargarTablaHisotial(fakeTable);
			return
		}		

		var a=12

		dataHistorialFiltrada.map((r)=>{
			if(	!String(r[0]).indexOf(valorBusqueda) || 
				!String(r[1]).indexOf(valorBusqueda) || 
				!String(r[2]).indexOf(valorBusqueda) || 
				!String(r[3]).indexOf(valorBusqueda) || 
				!String(r[4]).indexOf(valorBusqueda) || 
				!String(r[5]).indexOf(valorBusqueda)
				){
				nuevaDataFiltrada.push(r)
			}
		});
		cargarTablaHisotial(nuevaDataFiltrada)
	}
}