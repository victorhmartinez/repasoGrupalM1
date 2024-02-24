let movimientos = [
    { numeroCuenta: "02234567", monto: 10.24, tipo: "D" },
    { numeroCuenta: "02345211", monto: 45.90, tipo: "D" },
    { numeroCuenta: "02234567", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 65.23, tipo: "C" },
    { numeroCuenta: "02345211", monto: 12.0, tipo: "D" },
]

cargar = function () {
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");

}
ejecutarMovimientos = function () {
    console.log("Entro")
    //Recuperamos el numero de cuenta
    let numeroCuenta = recuperarTexto("txtCuenta");
    filtrarMovimientos(numeroCuenta);
}

filtrarMovimientos = function (numeroCuenta) {
    let movimientosCuenta = [];
    //Se barre el arreglo de movimientos
    for (let i = 0; i < movimientos.length; i++) {
        //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
        //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
        let elementoMovimeinto = movimientos[i];
        if (elementoMovimeinto.numeroCuenta == numeroCuenta) {
            movimientosCuenta.push(elementoMovimeinto);
        }
    }
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
    mostrarMovimientos(movimientosCuenta)


}

/*
    Recibe un arreglo con los movimientos que va a mostrar en pantalla
*/
mostrarMovimientos = function (misMovimientos) {
    let cmpTabla = document.getElementById("tablaMovimientos")
    //Columnas: NUMERO CUENTA, MONTO, TIPO
    let contTablas = "<table><tr><th> NUMERO CUENTA</th>" +
        "<th>MONTO</th>" +
        "<th>TIPO</th></tr>"
    //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
    for (let i = 0; i < misMovimientos.length; i++) {
        let elementoMovimeinto=misMovimientos[i];
        if(elementoMovimeinto.tipo=="D"){
            elementoMovimeinto.monto=elementoMovimeinto.monto*-1;
        }
        contTablas+="<tr><td>"+elementoMovimeinto.numeroCuenta+"</td>"+
        "<td>"+elementoMovimeinto.monto+"</td>"+
        "<td>"+elementoMovimeinto.tipo+"</td></tr>"
    }
    contTablas+="</table>"
    cmpTabla.innerHTML=contTablas;
    //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
    //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
    //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
}




