$(document).ready(function(){
	$("#username").focus();
	$("#FormLogin").submit((e)=>{
		e.preventDefault();
		var user = $("#username").val();
		var pass = $("#password").val();

		$("#username").val("").focus();
		$("#password").val("");
		login(user);
		console.log("Log in.");
	})
})

function login(datos){
	$.ajax({
		url:'admin/sesion.html',
		success:function(sesion){
			$("body").html(sesion)
			sesionIniciada();
		}
	});
	return false;
}
function sesionIniciada(){
	setInterval(()=>{
		var fecha=new Date(),
			horas=fecha.getHours(),
			minutos=fecha.getMinutes(),
			diaSemana=fecha.getDay(),
			dia=fecha.getDate(),
			mes=fecha.getMonth(),
			year=fecha.getFullYear();
		var semana=['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
		var meses=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Seb','Oct','Nov','Dic']
		var impf=semana[diaSemana]+" "+dia+" "+meses[mes]+" "+year+" "+horas+":"+minutos;
		$("#fecha").html(impf);
	},1000);
		$('.dropdown-trigger').dropdown({
			constrainWidth:true,
			coverTrigger:false
		});
		 $('.collapsible').collapsible();

}


