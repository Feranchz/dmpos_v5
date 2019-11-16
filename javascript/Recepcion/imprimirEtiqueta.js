function imprimirEtiqueta(e){
	let conseguido=todosLosProductos.find((producto)=>{
		return producto.CB==e
	})
	//Iniciamos renderizando la etiqueta
	$('#contenedorEtiqueta').html(`

					<h4 id="nombreEtiqueta" class="col l12 center">${conseguido.name}</h4>
					<div class="row">
						<div class="col l3">
							<p style="font-size: 40px" class="right">$</p>
						</div>
						<div class="col l3">
							<p style="font-size:50px" class="right">	000. </p>
							
						</div>
						<div class="col l3">
							<p style="font-size:30px;" class="col l6">00</p>
							<p style="font-size:50px" class="col l6">/</p>
						</div>
						<div class="l3">
							<div>
								<input style="float:left;width: 35px;margin-top: 70px" type="text" name="">
							</div>
						</div>
					</div>
`
		)
	var node = document.getElementById('contenedorEtiqueta');

	domtoimage.toPng(node)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
	$('#modalImprimirEtiqueta').modal('open')
}