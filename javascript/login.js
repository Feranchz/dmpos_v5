$(document).ready(function(){
	$("#username").focus();
	$("#login-form").submit( e => {
		e.preventDefault();
		var user = $("#username").val();
		var pass = $("#password").val();
		
		// Peticion al WS de Login
		if(true){
			doLogin()
		}

	})
})

function doLogin(){
	$("#main-logeado").show()
	$("#main-login").hide()
}
