let cuentas = [
    {
        numeroCuenta: "02234567",
        cedula: "1714616123",
        nombre: "Juan",
        apellido: "Perez",
        saldo: 0.0,
    },
    {
        numeroCuenta: "02345211",
        cedula: "1281238233",
        nombre: "Felipe",
        apellido: "Caicedo",
        saldo: 0.0,
    },
];

cargar = function () {
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");

    deshabilitarComponente("btnDepositar");
    deshabilitarComponente("btnRetirar");
    deshabilitarComponente("txtMonto");
};

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
    let cuentaEncontrada;
    for (let i = 0; i < cuentas.length; i++) {
        let elmentoCuenta = cuentas[i];
        if (elmentoCuenta.numeroCuenta == numeroCuenta) {
            cuentaEncontrada = elmentoCuenta;
            break;
        }
    }
    if (cuentaEncontrada == null) {
        return null;
    } else {
        return cuentaEncontrada;
    }
};

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
        mostrarTexto("lblSaldo", " Saldo: " + cuentaAfectada.saldo);
    }

};
