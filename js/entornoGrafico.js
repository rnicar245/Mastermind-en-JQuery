/**
 * Rafael Jesús Nieto Cardador
 */

$(function() {
    
    let contadorIntentos = 0;

    mastermind.init();
    let arraySolucion = mastermind.mostrar();
    let solucion = "Solución: ";
    for(color of arraySolucion){
        solucion+=color+", ";
    }
    console.log(solucion);

    $(".color").click(anadirColor());

    $(".eleccion").click(function(){
        $(this).prop("src", "img/vacio.png");
    });

    $(".reiniciar").click(function(){
        location.reload();
    });

    $("#cancelarFuncionalidad").click(cancelarFuncionalidad());

    $contenedor = $("#contenedor").clone();

    const comprobar = function () {
        if ($('.seleccion:first .eleccion[src="img/vacio.png"]').length != 0)
            return; //Queda algún gris

        pistas = actualizarJuego(contadorIntentos);
        gestionIntentos(pistas);
    };

    $("#comprobar").click(comprobar);
});
function cancelarFuncionalidad() {
    return function () {
        $("#modal").css("display", "none");
        $('.eleccion').off();
        $("#contenedor").off();
        $("#comprobar").off();
    };
}

function anadirColor() {
    return function (evento) {
        $(this).fadeOut(1).fadeIn("slow");
        $('.seleccion:first .eleccion[src="img/vacio.png"]:first')
            .prop("src", evento.target.src)
            .fadeOut(1)
            .fadeIn("slow");
    };
}

function actualizarJuego(contadorIntentos){
    let eleccionUsuario = [];
    $(".seleccion:first .eleccion").each(function () {
        eleccionUsuario.push(/\/(\w+)\.png$/.exec($(this).prop("src"))[1]);
        //eleccionUsuario.push(regExColor.exec($(this).prop("src"))[1]);
    });

    $("#intentos").html(++contadorIntentos);
    let pistas = mastermind.comprobarCoincidencia(eleccionUsuario);
    let contador = 0;
    $(".pistas:first .pista").each(function () {
        if (contador < pistas.length) {
            $(this).prop("src", "img/" + pistas[contador] + ".png");
            contador++;
        }
    });
    return pistas;
}

function gestionIntentos(pistas){
    $(".eleccion").off();
        if (pistas.length === 4 && pistas.every((elementoActual) => elementoActual === "negro")) {
            $("#modal").css("display", "block");
        }else {
            $contenedor.insertBefore("#contenedor").fadeOut("1").fadeIn("5");
            $contenedor = $("#contenedor").clone();
            $("#contenedor:first .eleccion").click(function () {
                $(this).prop("src", "img/vacio.png");
            });
        }
}
