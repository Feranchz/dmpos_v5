$(document).ready(function(){
	//Fecha del navbar
	moment.locale('es')
	$('#nav-dia').html(moment().format('ddd D MMM YYYY'))
	$('#nav-hora').html(moment().format('HH:mm'))
	setInterval(() => {
		$('#nav-hora').html(moment().format('HH:mm'))
	}, 30000)

	//Iniciaciones
	$('.datepicker').datepicker({
		format: 'yyyy-mm-dd'

		 })

})