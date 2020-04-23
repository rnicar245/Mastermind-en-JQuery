/**
 * Rafael Jesús Nieto Cardador
 */

mastermind = (function() {
    let pistas;
    let arrayIndicesCorrectos;
    let arrayCombinacionAux;

    let arrayCombinacion;
    let tamanoCombinacion = 3;

    function generaAleatorio(){
        return Math.round(Math.random()*7);
    }

    function init(){
        arrayCombinacion = [];
        arrayColores = ["verde", "amarillo", "azul", "rojo", "marron", "naranja", "blanco", "negro"];
        for(let i = 0; i<4; i++){
            arrayCombinacion.push(arrayColores[generaAleatorio()]);
        }
    }

    function mostrar(){
        if(compruebaInit()){
            return arrayCombinacion;
        }
    }

    function compruebaInit(){
        if(arrayCombinacion == undefined){
            console.log("ERROR: Ejecuta primero mastermind.init() para crear una combinación.");
            return false;
        }
        return true;
    }

    function comprobarCoincidencia(intento){
        if(compruebaInit()){
            pistas = [];
            arrayIndicesCorrectos =[];
            arrayCombinacionAux = [];

            for(let i = 0; i<= tamanoCombinacion; i++){
                arrayCombinacionAux.push(arrayCombinacion[i]);
            }

            comprobarNegros(intento);
            eliminarAcertados(intento);
            comprobarBlancos(intento);

            return pistas;
        }
    }


    function comprobarBlancos(intento){
        for(let i = 0; i<= tamanoCombinacion; i++){
            for(let j = 0; j <= tamanoCombinacion; j++){
                if(i != j && intento[i] == arrayCombinacionAux[j]){
                    arrayCombinacionAux[j] = -1;
                    pistas.push("blanco");
                    break;
                }
            }    
        }
    }

    function comprobarNegros(intento){
        for(let i = 0; i<= tamanoCombinacion; i++){
            if(intento[i] == arrayCombinacionAux[i]){
                pistas.push("negro");
                arrayIndicesCorrectos.push(i);
            }
        }
    }

    function eliminarAcertados(intento){
        for(indices in arrayIndicesCorrectos){        
            for(let i = 0; i<=tamanoCombinacion; i++){
                if(i == arrayIndicesCorrectos[indices]){
                    arrayCombinacionAux[i] = -1;
                    intento[i] = -2;
                }
            } 
        }
    }

    
    return{
        init: init,
        mostrar: mostrar,
        comprobarCoincidencia: comprobarCoincidencia
    }
})();