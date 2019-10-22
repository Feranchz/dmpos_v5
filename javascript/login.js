$(document).ready(function(){
	$("#username").focus();
	$("#FormLogin").submit((e)=>{
		e.preventDefault();
		var user = $("#username").val();
		var pass = $("#password").val();

		$("#username").val("").focus();
		$("#password").val("");

		console.log("Log in.");
	})
})


