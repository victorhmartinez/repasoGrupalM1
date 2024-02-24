let cuentas = [
    { numeroCuenta: "02234567", cedula: "1714616123", nombre: "Juan", apellido: "Perez", saldo: 0.0 },
    { numeroCuenta: "02345211", cedula: "1281238233", nombre: "Felipe", apellido: "Caicedo", saldo: 0.0 }
]

cargar = function () {
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");

}

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
