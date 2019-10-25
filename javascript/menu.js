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
		$('.porRecepcion').hide()
		$('#reportes-ventas').show()
	})

	$('#link-reportes-proveedores').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#reportes-proveedores').show()
	})

	$('#link-reportes-facturas').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#reportes-facturas').show()
	})

	$('#link-reportes-dashboard').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#reportes-dashboard').show()
	})

	$('#link-reportes-inventario').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#reportes-inventario').show()
	})

	$('#link-reportes-corte').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#reportes-corte').show()
	})

	$('#link-reportes-nomina').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#reportes-nomina').show()
	})

	$('#link-reportes-verificacion').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#reportes-verificacion').show()
	})

	$('#link-clientes-lista').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#clientes-lista').show()
	})

	$('#link-clientes-giro').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#clientes-giro').show()
	})

	$('#link-clientes-clases').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#clientes-clases').show()
	})

	$('#link-clientes-zonas').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#clientes-zonas').show()
	})

	$('#link-proveedores-lista').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#proveedores-lista').show()
	})

	$('#link-proveedores-productos').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#proveedores-productos').show()
	})

	$('#link-proveedores-compras').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#proveedores-compras').show()
	})

	$('#link-reportes-ventas').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#reportes-ventas').show()
	})

	$('#link-proveedores-historial').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#proveedores-historial').show()
	})

	$('#link-usuarios-lista').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#usuarios-lista').show()
	})

	$('#link-usuarios-nomina').click(e => {
		$('.page-content').hide()
		$('.porRecepcion').hide()
		$('#usuarios-nomina').show()
	})

	$('#link-mostrador1').click(e => {
		$('.page-content').hide()
		$('#mostrador1').show()
		$('.porRecepcion').show()
		refreshTablaPedidos()
	})

	$('#link-etiquetas').click(e => {
		$('.page-content').hide()
		$('#etiquetas').show()
		$('.porRecepcion').show()
		refreshTablaEtiquetas()
	})

	$('#link-historial').click(e => {
		$('.page-content').hide()
		$('#historial').show()
		$('.porRecepcion').show()
		let today = moment().format('YYYY-MM-DD')
		$('#campoFecha').val(today)
		refreshTablaHistorial()
	})
})