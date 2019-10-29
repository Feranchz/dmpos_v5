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
		format: 'yyyy-mm-dd',
		maxDate: new Date
		})

})


//Funcion para formatear numeros
var formatNumber = {
	 separador: ",", // separador para los miles
	 sepDecimal: '.', // separador para los decimales
	 formatear:function (num){
	 num +='';
	 var splitStr = num.split('.');
	 var splitLeft = splitStr[0];
	 var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
	 var regx = /(\d+)(\d{3})/;
	 while (regx.test(splitLeft)) {
	 splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
	 }
	 return this.simbol + splitLeft +splitRight;
	 },
	 new:function(num, simbol){
	 this.simbol = simbol ||'';
	 if (this.formatear(num).split('.').length<2){
	 	return(this.formatear(num)+".00")
	 }
	 return this.formatear(num);
	 }
}