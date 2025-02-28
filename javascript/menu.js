$(document).ready(function(){
	$('.menu-admin > li > a').click(e => {
		if($(e.target).hasClass('link-active')){
			$(e.target).parent().find('ul').hide('fast')
			$(e.target).removeClass('link-active')
		} else {
			$('.menu-admin li ul').hide('fast')
			$('.link-active').removeClass('link-active')
			$(e.target).addClass('link-active')
			$(e.target).parent().find('ul').show('fast')
		}
	})


	//Menus links
	$('#link-reportes-ventas').click(e => {
		$('.page-content').hide()
		$('#reportes-ventas').show()
	})

	$('#link-reportes-proveedores').click(e => {
		$('.page-content').hide()
		$('#reportes-proveedores').show()
	})

	$('#link-reportes-facturas').click(e => {
		$('.page-content').hide()
		$('#reportes-facturas').show()
	})

	$('#link-reportes-dashboard').click(e => {
		$('.page-content').hide()
		$('#reportes-dashboard').show()
	})

	$('#link-reportes-inventario').click(e => {
		$('.page-content').hide()
		$('#reportes-inventario').show()
	})

	$('#link-reportes-corte').click(e => {
		$('.page-content').hide()
		$('#reportes-corte').show()
	})

	$('#link-reportes-nomina').click(e => {
		$('.page-content').hide()
		$('#reportes-nomina').show()
	})

	$('#link-reportes-verificacion').click(e => {
		$('.page-content').hide()
		$('#reportes-verificacion').show()
	})

	$('#link-clientes-lista').click(e => {
		$('.page-content').hide()
		$('#clientes-lista').show()
	})

	$('#link-clientes-giro').click(e => {
		$('.page-content').hide()
		$('#clientes-giro').show()
	})

	$('#link-clientes-clases').click(e => {
		$('.page-content').hide()
		$('#clientes-clases').show()
	})

	$('#link-clientes-zonas').click(e => {
		$('.page-content').hide()
		$('#clientes-zonas').show()
	})

	$('#link-proveedores-lista').click(e => {
		$('.page-content').hide()
		$('#proveedores-lista').show()
	})

	$('#link-proveedores-productos').click(e => {
		$('.page-content').hide()
		$('#proveedores-productos').show()
	})

	$('#link-proveedores-compras').click(e => {
		$('.page-content').hide()
		$('#proveedores-compras').show()
	})

	$('#link-reportes-ventas').click(e => {
		$('.page-content').hide()
		$('#reportes-ventas').show()
	})

	$('#link-proveedores-historial').click(e => {
		$('.page-content').hide()
		$('#proveedores-historial').show()
	})

	$('#link-usuarios-lista').click(e => {
		$('.page-content').hide()
		$('#usuarios-lista').show()
	})

	$('#link-usuarios-nomina').click(e => {
		$('.page-content').hide()

		$('#usuarios-nomina').show()
	})

	$('#link-mostrador1').click(e => {
		$('.page-content').hide()
		seccionActual='mostrador1'
		$('#mostrador1').show()
		refreshTablaPedidos("menu")
	})

	$('#link-etiquetas').click(e => {
		$('.page-content').hide()
		$('#etiquetas').show()
		refreshTablaEtiquetas()
	})

	$('#link-historial').click(e => {
		$('.page-content').hide()
		$('#historial').show()
		let today = moment().format('YYYY-MM-DD')
		$('#campoFecha').val(today)
		$('#campoTicketHistorial').val("")
		refreshTablaHistorial('campoFecha')
	})

	manejadorNavbar();
		


})




function manejadorNavbar(){
	$('ul li ul li a').click(function(e){
		if(e.target.id=="link-historial" || e.target.id=="link-etiquetas" || e.target.id== "link-mostrador1"){
			$('.activate').removeClass("activate");
			$(`#${e.target.id}`).addClass("activate")
			if(e.target.id== "link-mostrador1"){
				$('.porRecepcion').show()
			}else{
				$('.porRecepcion').hide()
			}

		}else{
			$('.porRecepcion').hide()
		}
		seccionActual=e.target.id
	})
}
var seccionActual="";
