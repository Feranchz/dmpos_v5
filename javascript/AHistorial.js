function abrirTablaHistorial(){
	if(cargadoHistorial==0){
		$('#buscador-historial-externo').click(filtrarHistorial);
		$('#filtrarHistorial').keyup(filtrarHistorial);
		$('#buscar-fecha-historial').click(filtrarHistorial);
		cargarHistorial();
		cargadoHistorial=1;
	}
}

//dataHistorialFilrada guarda los registros de la data filtrada del historial
var dataHistorialFiltrada;
var dataTabla=[];
var cargadoHistorial=0;
function cargarHistorial(fecha){
	if(fecha==null){
		today=new Date(),
		dia=today.getDate(),
		mes=today.getMonth()+1,
		year=today.getFullYear();
		fecha=year+"-"+mes+"-"+dia;
	}

	//variable para completar el path de la peticion
	let cp="?date=" +fecha;

	//Variable que contiene la peticion
	peticion=Config.paths.wsHistorial+cp

	//peticion al ws que trae la data del historial por fecha
	fetch(peticion)
	.then( a => a.json())
	.then( ja => {
		//Si la data esta vacia mostramos una tabla vacia
		if(ja.msg=="No se encontraron resultados"){
			//Esto no deberia ser un alert
			alert(ja.msg)
			console.log("esta vacia la tabla")

			for(var i=0;i<10;i++){
				dataTabla=[];
				dataTabla.push({
					id:"-",
					createdAt:"-",
					customer:"-",
					total:"-",
					salesman:"-",
					status:"-"
				})
			}
		}else{
			dataTabla=[];
			console.log(ja.data)
			ja.data.map((registro)=>{
				dataTabla.push(registro);
			})
		}

	})
	.then(()=>{
		dataHistorialFiltrada=dataTabla;
	})
	.then(()=>{
		cargarTablaHistorial(dataHistorialFiltrada)
	})

}

function cargarTablaHistorial(dataFiltrada){
	$("#reporteHistorial").html("")
	if(dataFiltrada.length>0){
		//Registros a mostrar contiene la cantidad de registros a mostrar xD
		let regMostrar=dataFiltrada.length;
		//Los sobrantes para completar la tabla
		let regSobrantes=10-(regMostrar%10)
		//const fecha=new FormData(document.getElementById('campoFecha'))


		//Agregar registros a la tabla
		dataFiltrada.map((r)=>{
		$("#reporteHistorial").append(`
			<tr>
				<td>${r.id}</td>
				<td>${r.createdAt}</td>
				<td>${r.customer}</td>
				<td>${r.total}</td>
				<td>${r.salesman}</td>
				<td>${r.status}</td>
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
		if(isNaN(ticketBuscar)){
			dataHistorialFiltrada=dataTabla;
			cargarTablaHistorial(dataTabla);
			return
		}
		dataHistorialFiltrada=[]
		dataTabla.map((r)=>{
			if(ticketBuscar==r.id){
				dataHistorialFiltrada.push(r)
			}
		})
		cargarTablaHistorial(dataHistorialFiltrada); 
	}else if(e.target.id==="filtrarHistorial"){
		let valorBusqueda=$("#filtrarHistorial").val();
		let nuevaDataFiltrada=[];

		if(valorBusqueda==""){
			cargarTablaHistorial(dataTabla);
			return
		}		

		var a=12

		dataHistorialFiltrada.map((r)=>{
			if(	!String(r.id).indexOf(valorBusqueda) || 
				!String(r.createdAt).indexOf(valorBusqueda) || 
				!String(r.customer).indexOf(valorBusqueda) || 
				!String(r.total).indexOf(valorBusqueda) || 
				!String(r.salesman).indexOf(valorBusqueda) || 
				!String(r.status).indexOf(valorBusqueda)
				){
				nuevaDataFiltrada.push(r)
			}
		});
		cargarTablaHistorial(nuevaDataFiltrada)
	}else if(e.target.id=="buscar-fecha-historial"){
		let fecha=$('#campoFecha');
		cargarHistorial(fecha.val());

	}
}