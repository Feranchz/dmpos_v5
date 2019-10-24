function abrirTablaEtiquetas(){
	if(cargadaEtiquetas==0){
		$('.datepicker').datepicker();
		cargarTablaEtiquetas(fakeTable2);
		$('#filtrarEtiquetas').keyup(filtrarEtiquetas);
		cargadaEtiquetas=1;
	}

}
var cargadaEtiquetas=0;
//Data fake para etiquetas
var dataEtiquetasFiltrada;
var fakeTable2=[
		[11212,"Producto1",123124112," - ","btnaccion"],
		[11213,"Producto2",123124113," - ","btnaccion"],
		[11214,"Producto3",12312414," - ","btnaccion"],
		[11215,"Producto4",12312415," - ","btnaccion"],
		[11216,"Producto5",12312417," - ","btnaccion"],
		[11217,"Producto6",12312418," - ","btnaccion"],
		[11218,"Producto7",1231242," - ","btnaccion"],
		[11212,"Producto1",123124112," - ","btnaccion"],
		[11213,"Producto2",123124113," - ","btnaccion"],
		[11214,"Producto3",12312414," - ","btnaccion"],
		[11215,"Producto4",12312415," - ","btnaccion"],
		[11216,"Producto5",12312417," - ","btnaccion"],
		[11217,"Producto6",12312418," - ","btnaccion"],
		[11218,"Producto7",1231242," - ","btnaccion"],
		[11212,"Producto1",123124112," - ","btnaccion"],
		[11213,"Producto2",123124113," - ","btnaccion"],
		[11214,"Producto3",12312414," - ","btnaccion"],
		[11215,"Producto4",12312415," - ","btnaccion"],
		[11216,"Producto5",12312417," - ","btnaccion"],
		[11217,"Producto6",12312418," - ","btnaccion"],
		[11218,"Producto7",1231242," - ","btnaccion"],

]

dataEtiquetasFiltrada=fakeTable2;
function cargarTablaEtiquetas(dataFiltrada){
	$("#reporteEtiquetas").html("")
	if(dataFiltrada.length>0){
		//Registros a mostrar contiene la cantidad de registros a mostrar xD
		let regMostrar=dataFiltrada.length;
		//Los sobrantes para completar la tabla
		let regSobrantes=10-(regMostrar%10)

		//Agregar registros a la tabla
		dataFiltrada.map((r)=>{
		$("#reporteEtiquetas").append(`
			<tr>
				<td>${r[0]}</td>
				<td>${r[1]}</td>
				<td>${r[2]}</td>
				<td>${r[3]}</td>
				<td>
					<button class="btn btn-small green"> Imprimir Etiqueta</button>
				</td>
			</tr>
			`);
		})

		//Completar tabla

		if((regMostrar%10)!=0){
			for(let i=0;i<regSobrantes;i++){
				$("#reporteEtiquetas").append(`
					<tr>
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
function filtrarEtiquetas(e){
	//Esta funcion filtra todos los datos segun los parametros que se obtienen de los inputs de la tabla historial
		let valorBusqueda=$("#filtrarEtiquetas").val();
		let nuevaDataFiltrada=[];

		if(valorBusqueda==""){
			cargarTablaEtiquetas(dataEtiquetasFiltrada);
			return
		}		
		dataEtiquetasFiltrada.map((r)=>{
			if(	!String(r[0]).indexOf(valorBusqueda) || 
				!String(r[1]).indexOf(valorBusqueda) || 
				!String(r[2]).indexOf(valorBusqueda) || 
				!String(r[3]).indexOf(valorBusqueda) 
				){
				nuevaDataFiltrada.push(r)
			}
		});
		cargarTablaEtiquetas(nuevaDataFiltrada)
}