//  Variables 
const carritoNombres = [];
const carritoPrecios = [];
let seleccionando = true;


function consultarPrecio(prenda) {
    // toLowerCase()
    switch (prenda.toLowerCase()) {
        case "remera":
            return 15000;
        case "pantalon":
            return 30000;
        case "buzo":
            return 45000;
        default:
            return 0; 
    }
}

// Función para sumar
function calcularTotal(listaDeCompras) {
    let total = 0;
    // Ciclo for para recorrer el array
    for (let i = 0; i < listaDeCompras.length; i++) {
        total += listaDeCompras[i].precio;
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
            alert("Agregaste " + prendaIngresada + " al carrito. Precio: $" + precio);
            carrito.push({
                nombre: prendaIngresada,
                precio: precio
            });
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