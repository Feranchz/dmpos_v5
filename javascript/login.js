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

	$('#salirSinCorte').click((e)=>{
		doLogout(e.target.id);
	})
	$('#salirConCorte').click((e)=>{
		doLogout(e.target.id);
	})


})

function doLogin(){
	$("#main-logeado").show()
	$("#main-login").hide()
}

function doLogout(tipo){
	if(tipo=="salirSinCorte"){
		console.log("se presiono salir sin corte")	
		location.reload()
	}else if(tipo=="salirConCorte"){
		console.log("se presiono salir con corte")

		$('#modalRealizarCorte').modal({
			onOpenEnd:function(){
				$('#500').focus()
			}
		})
		$('#haceCorte').click(e=>{
			location.reload()
		})
	}

}