//  Variables 
const carritoNombres = [];
const carritoPrecios = [];
let seleccionando = true;



function consultarPrecio(prenda) {
    switch (prenda.toLowerCase()) {
        case prendasStock[0]: 
            return preciosStock[0]; 
        case prendasStock[1]: 
            return preciosStock[1]; 
        case prendasStock[2]: 
            return preciosStock[2]; 
        default:
            return 0; 
    }
}

function agregarAlCarrito(nombrePrenda, precioPrenda) {
    carritoNombres.push(nombrePrenda);
    carritoPrecios.push(precioPrenda);
    alert("Agregaste " + nombrePrenda + " al carrito. Precio: $" + precioPrenda);
}

// Función para sumar
function calcularTotal(listaDeCompras) {
    let total = 0;

// Ciclo for para recorrer el array
function calcularTotal(listaDePrecios) {
    let total = 0;
    for (let precio of listaDePrecios) {
        total += precio;
    }
    return total;
}
    return total;
}

// Mensaje 
alert("Bienvenido a la Tienda de Ropa");


while (seleccionando) {
    
    let prendaIngresada = prompt("¿Qué desea comprar? (Remera / Pantalon / Buzo)");

    if (prendaIngresada !== null) {
        let precio = consultarPrecio(prendaIngresada);

       // 5. Condicional (if/else)
        if (precio > 0) {
            // ---> ACÁ USAMOS LA FUNCIÓN NUEVA <---
            agregarAlCarrito(prendaIngresada, precio);
        } else {
            alert("Disculpá, no tenemos esa prenda en stock o escribiste mal el nombre.");
        }
    }
    seleccionando = confirm("¿Querés seguir agregando productos?");
}

if (carrito.length > 0) {
    const totalPagar = calcularTotal(carrito);
    
    console.log("Detalle de la compra:", carrito);
    
    alert("Compraste " + carrito.length + " prendas. El total a pagar es: $" + totalPagar);
} else {
    alert("Gracias por visitar la tienda. No realizaste ninguna compra.");
}