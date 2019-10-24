function abrirTablaPedidos(){

	console.log("aqui la tabla de pedidos");
	if(cargadoPedidos==0){
		cargarPedidos()
		cargadoPedidos=1
	}

}
//dataHistorialFilrada guarda los registros de la data filtrada del historial

var dataTablaPedidos=[];
var cargadoPedidos=0;
function cargarPedidos(){
	dataTablaPedidos=[]
	//Variable que contiene la peticion
	peticion=Config.paths.wsPedidos

	//peticion al ws que trae la data del historial por fecha
	fetch(peticion)
	.then( a => a.json())
	.then( ja => {
		ja.data.map((reg)=>{
			dataTablaPedidos.push(reg)
		})
	}).then(()=>{
		cargarTablaPedidos();
	})
}

function cargarTablaPedidos(){
	if(dataTablaPedidos.length>0){
		//Agregar registros a la tabla
		dataTablaPedidos.map((r)=>{
		$("#reportesPedidos").append(`
			<tr id="${r.id}">
				<td>${r.id}</td>
				<td>${r.createdAt}</td>
				<td>${r.orderType}</td>
				<td>${r.customer}</td>
				<td>${r.salesman}</td>
				<td><button>X</button></td>
			</tr>
			`);
		})       
	}
}

