$(document).ready(function(){
	$("#FormLogin").submit((e)=>{
		e.preventDefault();
		var user = $("#username").val();
		var pass = $("#password").val();

		$("#username").val("");
		$("#password").val("");

		console.log("Log in");
	})
})


