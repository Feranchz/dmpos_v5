$(document).ready(function(){
	$("#login").submit(login)
})

function login(){
	window.location='http://159.203.83.182/DMPOS/develop/admin/adm.php';
	alert("Redireccionando")
	var usuario= $("#username").val();
	var password=$("#password").val();
	console.log(usuario+" "+password);
	
	console.log("redireccionando");
	
}
