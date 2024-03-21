// Objeto para manejar los tipos y precios de los alimentos
const preciosAlimentos = {
    bolsonAlimentoDePerros: 10500,
    bolsonAlimentoDeGatos: 9000,
    bolsonAlimentoDeConejos: 4500
};

// Objeto que almacenará las cantidades de alimentos seleccionados por el usuario
class VentaPetshop {
    constructor() {
        this.alimentosSeleccionados = {};
    }

    agregarAlimento(tipo, cantidad) {
        if (this.alimentosSeleccionados[tipo]) {
            this.alimentosSeleccionados[tipo] += cantidad;
        } else {
            this.alimentosSeleccionados[tipo] = cantidad;
        }
    }

    restarAlimento(tipo, cantidad) {
        if (this.alimentosSeleccionados[tipo]) {
            this.alimentosSeleccionados[tipo] -= cantidad;
            if (this.alimentosSeleccionados[tipo] <= 0) {
                delete this.alimentosSeleccionados[tipo];
            }
        }
    }

    calcularCostoTotal() {
        let costoTotal = 0;
        for (let tipo in this.alimentosSeleccionados) {
            if (this.alimentosSeleccionados.hasOwnProperty(tipo)) {
                costoTotal += preciosAlimentos[tipo] * this.alimentosSeleccionados[tipo];
            }
        }
        return costoTotal;
    }
}

// Validar el nombre del usuario
function validarNombre(nombre) {
    if (/^[a-zA-Z]+$/.test(nombre)) {
        return true; // Nombre válido
    } else {
        alert("¡Error! Por favor ingrese un nombre válido sin caracteres especiales ni números.");
        return false; // Nombre inválido
    }
}

// Validar la cantidad ingresada
function validarCantidad(cantidad) {
    if (!isNaN(cantidad) && parseInt(cantidad) > 0) {
        if (parseInt(cantidad) <= 10) {
            return true; // Si es un número entero positivo y no excede 10, retorna true
        } else {
            alert("¡Atención! Si desea comprar más de 10 bolsónes, por favor comuníquese con nosotros para obtener precios al por mayor.");
            return false;
        }
    } else {
        alert("¡Error! Por favor ingrese un número entero positivo para la cantidad de bolsónes.");
        return false; // Si no es un número entero positivo, muestra una alerta y retorna false
    }
}

// Nombre de usuario
let nombreUsuario;
do {
    nombreUsuario = prompt("Bienvenidos a Rulo Petshop, ¿Cuál es su nombre?");
} while (!validarNombre(nombreUsuario));

// Objeto para la venta de alimentos
let venta = new VentaPetshop();

// Ciclo 
do {
    let tipoAlimento;
    do {
        tipoAlimento = prompt(`${nombreUsuario}, elija el tipo de alimento que necesita:\n1. Perros\n2. Gatos\n3. Conejos`);
        if (tipoAlimento === '1') {
            tipoAlimento = 'bolsonAlimentoDePerros';
        } else if (tipoAlimento === '2') {
            tipoAlimento = 'bolsonAlimentoDeGatos';
        } else if (tipoAlimento === '3') {
            tipoAlimento = 'bolsonAlimentoDeConejos';
        } else {
            alert("¡Error! Por favor ingrese un número correspondiente al tipo de bolsones.");
        }
    } while (!preciosAlimentos.hasOwnProperty(tipoAlimento));
    
    let cantidadBolsones;
    do {
        cantidadBolsones = prompt(`¿Cuántos bolsónes de ${tipoAlimento} necesita?`);
    } while (!validarCantidad(cantidadBolsones));

    venta.agregarAlimento(tipoAlimento, parseInt(cantidadBolsones));

    let continuar;
    do {
        continuar = prompt("¿Desea agregar más bolsónes o quitar alguno? (AGREGAR/QUITAR/NO)").toUpperCase();
    } while (continuar !== "AGREGAR" && continuar !== "QUITAR" && continuar !== "NO");

    if (continuar === "NO") {
        break; // Salir del bucle si el usuario no quiere agregar ni quitar más bolsones.
    } else if (continuar === "QUITAR") {
        let cantidadQuitar;
        do {
            cantidadQuitar = prompt(`¿Cuántos bolsónes de ${tipoAlimento} desea quitar?`);
        } while (!validarCantidad(cantidadQuitar));

        venta.restarAlimento(tipoAlimento, parseInt(cantidadQuitar));
    }
} while (true);

// Calcular el costo total de todos los productos seleccionados
let costoTotal = venta.calcularCostoTotal();

// Costo total de los bolsones.
alert(`El costo total de su pedido es: $${costoTotal}. \n\n¡Muchas gracias por su compra, ${nombreUsuario}! ¡Vuelva pronto!`);