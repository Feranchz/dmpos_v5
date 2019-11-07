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
/*funcion para manejar el login*/
function doLogin(){
	$("#main-logeado").show()
	$("#main-login").hide()

	/*Cargar productos es una funcion que se llama y esta en el apartado de administrar productos, dicha funcion se explica alli*/
	//cargarProductos()
}
/*Esta funcion maneja el logout si se sale sin corte simplemente cierra la sesion pero si se sale con corte
inicia los calculos para realizar el mismo*/
function doLogout(tipo){
	if(tipo=="salirSinCorte"){
		console.log("se presiono salir sin corte")	
		location.reload()
	}else if(tipo=="salirConCorte"){
		console.log("se presiono salir con corte")

		$('#modalRealizarCorte').modal({
			onOpenEnd:function(){
				$('#500').focus()
				calcularCorte()
			}
		})
		$('#haceCorte').click(e=>{
			location.reload()
		})
	}
}
/*Esta funcion es la calculadora del corte de caja.*/
function calcularCorte(){
	$(".inputCorte").keyup(e=>{
		let valorFinal=0
		valorFinal+=500* $('#500').val()
		valorFinal+=200* $('#200').val()
		valorFinal+=100* $('#100').val()
		valorFinal+=50* $('#50').val()
		valorFinal+=20* $('#20').val()
		valorFinal+=10* $('#10').val()
		valorFinal+=5* $('#5').val()
		valorFinal+=2* $('#2').val()
		valorFinal+=1* $('#1').val()
		valorFinal+=0.5* $('#medio').val()
		$('#totalDeCaja').html(`${formatNumber.new(valorFinal,'$')}`)
	})
}