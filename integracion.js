cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]



cargarCuentas=function(){
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    
}
cargarMovimientos=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
    
}
cargarTransacciones=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    
}

/**Codigo de cuentas */
mostrarCuentas = function () {
    let cmpTabla = document.getElementById("contTabla")
    let contenidoTabla = "<table><tr>" +
        "<th>Número cuenta</th>" +
        "<th>Nombre</th>" +
        "<th>Saldo</th></tr>"

    for (let i = 0; i < cuentas.length; i++) {
        let elementoCuenta = cuentas[i];
        contenidoTabla += "<tr><td>" + elementoCuenta.numeroCuenta + "</td>" +
            "<td>" + elementoCuenta.nombre + " " + elementoCuenta.apellido + "</td>" +
            "<td>" + elementoCuenta.saldo + "</td></tr>"
    }
    cmpTabla.innerHTML = contenidoTabla;
    /*
        Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
        Columnas: NUMERO CUENTA, NOMBRE, SALDO
        En la columna NOMBRE concatenar el nombre y el apellido
    */
}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
    let cuentaEncontrada;
    for (let i = 0; i < cuentas.length; i++) {
        let cuentaElemento = cuentas[i];
        if (numeroCuenta == cuentaElemento.numeroCuenta) {
            cuentaEncontrada = cuentaElemento;
            break;
        }
    }
    if (cuentaEncontrada != null) {
        return cuentaEncontrada;
    } else {
        return null
    }
}

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
agregarCuenta = function (cuenta) {
    let cuentaExiste = buscarCuenta(cuenta.numeroCuenta)
    //Si ya existe mostrar un alert CUENTA EXISTENTE    
    if (cuentaExiste == null) {
        alert("CUENTA AGREGADA")
        cuentas.push(cuenta)
    } else {
        alert("CUENTA EXISTENTE")
    }
    //Si se agrega, mostrar un alert CUENTA AGREGADA
}

agregar = function () {
    //Toma los valores de las cajas de texto, sin validaciones

    let cedula = recuperarTexto("txtCedula")
    let nombre = recuperarTexto("txtNombre")
    let apellido = recuperarTexto("txtApellido")
    let numeroCuenta = recuperarTexto("txtNCuenta")
    //Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
    let cuenta = {};
    cuenta.cedula = cedula;
    cuenta.nombre = nombre;
    cuenta.apellido = apellido;
    cuenta.numeroCuenta = numeroCuenta
    cuenta.saldo = 0;
    //Invoca a agregarCuenta
    agregarCuenta(cuenta);
    //Invoca a mostrarCuentas
    mostrarCuentas();
}
/**
 * Codigo de transacciones
 */

ejecutarBusqueda = function () {
    //toma el numero de cuenta de la caja de texto

    let numeroCuenta = recuperarTexto("txtNumeroCuenta");
    //invoca a buscarCuenta y guarda el resultado en una variable
    let cuentaEncontrada = buscarCuenta(numeroCuenta);
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert
    if (cuentaEncontrada == null) {
        alert("CUENTA INEXISTENTE");
    } else {
        mostrarTexto("lblNumeroCuenta", "Cuenta: " + cuentaEncontrada.numeroCuenta + " ");
        mostrarTexto(
            "lblNombre", "Nombre: " +
            cuentaEncontrada.nombre + " " + cuentaEncontrada.apellido + " "
        );
        mostrarTexto("lblSaldo", " Saldo: " + cuentaEncontrada.saldo);
        habilitarComponente("btnDepositar");
        habilitarComponente("btnRetirar");
        habilitarComponente("txtMonto");
    }
};

depositar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta)
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro
    cuentaAfectada.saldo += monto;
};

ejecutarDeposito = function () {
    //Toma el numero de cuenta ingresado en la caja de texto
    let numeroCuenta = recuperarTexto("txtNumeroCuenta");
    //Toma el monto ingresado en la caja de texto
    let monto = recuperarFloat("txtMonto");
    //invoca a depositar
    depositar(numeroCuenta, monto)
    //Muestra un mensaje TRANSACCION EXITOSA
    alert("TRANSACCION EXITOSA")
    //Muestra en pantalla el nuevo saldo de la cuenta
    let movimiento ={
        numeroCuenta:numeroCuenta,
        monto:monto,
        tipo:"C"
    }
    movimientos.push(movimiento)
    let cuentaAfectada = buscarCuenta(numeroCuenta)
    mostrarTexto("lblSaldo", " Saldo: " + cuentaAfectada.saldo);

};
ejecutarRetiro = function () {
    //Toma el numero de cuenta ingresado en la caja de texto
    let numeroCuenta = recuperarTexto("txtNumeroCuenta");
    //Toma el monto ingresado en la caja de texto
    let monto = recuperarFloat("txtMonto");
    //invoca a retirar
    retirar(numeroCuenta, monto)


};


retirar = function (numeroCuenta, monto) {
    let cuentaAfectada;
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    cuentaAfectada = buscarCuenta(numeroCuenta)
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    if (cuentaAfectada.saldo < monto) {
        //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
        alert("SALDO INSUFICIENTE")
    } else {
        //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
        //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta
        cuentaAfectada.saldo -= monto;
        alert("TRANSACCION EXITOSA")
        let movimiento ={
            numeroCuenta:numeroCuenta,
            monto:monto,
            tipo:"D"
        }
        movimientos.push(movimiento)
        mostrarTexto("lblSaldo", " Saldo: " + cuentaAfectada.saldo);
    }

};

/**
 * Codigo movimientos
 */
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


/*
    En este archivo se deben colocar todas las funciones de cuentas, movimientos y transacciones
    IMPORTANTE: NO DUPLICAR FUNCIONES, si existe una misma función en varios archivos,
    dejar solo una de ellas, ejemplo la función buscarCuenta
*/

//OCULTAR Y MOSTRAR LOS DIVS, para que cada opción muestre solo su parte


//Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos


