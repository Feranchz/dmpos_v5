
//dataHistorialFilrada guarda los registros de la data filtrada del historial
var dataHistorialFiltrada;
var fakeTable=[
		[1,4,"ninguno",12,"nadie","ninguno","btnaccion"],
		[12,5,"asd",12,"nadie","ninguno","btnaccion"],
		[3,6,"adf",12,"nadie","ninguno","btnaccion"],
		[4,7,"ningunoasfd",12,"nadie","ninguno","btnaccion"],
]
dataHistorialFiltrada=fakeTable;

function cambiarABarraPedidos() {
	$.ajax({
		url:'admin/vistahtml/nabvarPedido.html',
		success:function(barra){
			$("#barraSuperior").html(barra)
			rankingIndicador();
		}
	});
}


function rankingIndicador(){
	console.log("dentro de modificacion de ranking")
}

function abrirTablaHistorial(){
	$.ajax({
		url:'admin/vistahtml/tablaHistorial.html',
		success:function(tabla){
			$("#contenedorReporte").html(tabla)
			$('.datepicker').datepicker();
			$('#buscador-historial-externo').click(filtrarHistorial)
			$('#filtrarHistorial').keyup(filtrarHistorial);
			cargarTablaHisotial(dataHistorialFiltrada);
		}
	})
}
function cargarTablaHisotial(dataFiltrada){
	$("#reporteHistorial").html("")
	if(dataFiltrada.length>0){
		dataFiltrada.map((r)=>{
		$("#reporteHistorial").append(`
			<tr>
				<td>${r[0]}</td>
				<td>${r[1]}</td>
				<td>${r[2]}</td>
				<td>${r[3]}</td>
				<td>${r[4]}</td>
				<td>${r[5]}</td>
				<td>${r[6]}</td>
				</tr>
			`);
		})	
	}
	          
}

function filtrarHistorial(e){
	if(e.target.id==="buscador-historial-externo"){
		let ticketBuscar=parseInt($("#busqueda-ticket-historial").val());
		console.log(ticketBuscar)
		if(isNaN(ticketBuscar)){
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
		let nuevaData=[];

		if(valorBusqueda==""){
			cargarTablaHisotial(dataHistorialFiltrada);
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
				nuevaData.push(r)
			}
		});
		cargarTablaHisotial(nuevaData)
	}
}



function quitarBarraPedidos(){
	$.ajax({
		url:'admin/vistahtml/noNabvarPedido.html',
		success:function(barra){
			$("#barraSuperior").html(barra)
		}
	})
}