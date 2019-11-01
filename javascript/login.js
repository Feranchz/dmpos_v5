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
				calcularCorte()
			}
		})
		$('#haceCorte').click(e=>{
			location.reload()
		})
	}
}
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