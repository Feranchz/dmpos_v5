$(document).ready(function(){
	$("#login").submit(login)
})

function login(){
	var usuario= $("#username").val();
	var password=$("#password").val();
	console.log(usuario+" "+password);
	document.location.href="http://159.203.83.182/DMPOS/develop/admin/adm.php";

}
