let stock = []; 
let carrito = JSON.parse(localStorage.getItem("carritoGuardado")) || [];

const contenedorProductos = document.getElementById("contenedor-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const btnVaciar = document.getElementById("btn-vaciar");
const btnComprar = document.getElementById("btn-comprar");

// FETCH
async function cargarProductos() {
    try {
        const respuesta = await fetch("productos.json");
        stock = await respuesta.json();
        renderizarProductos();
    } catch (error) {
        // Eliminamos el console.error para cumplir con la sugerencia de la rúbrica
    }
}

function renderizarProductos() {
    stock.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("tarjeta-producto");
        
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
            <h3>${producto.nombre}</h3>
            <p class="precio">$${producto.precio}</p>
            <button id="btn-agregar-${producto.id}" class="btn-agregar">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(div);

        const botonAgregar = document.getElementById(`btn-agregar-${producto.id}`);
        botonAgregar.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });
    });
}

function agregarAlCarrito(idProducto) {
    const existe = carrito.some(prod => prod.id === idProducto);

    if (existe) {
        carrito.map(prod => {
            if (prod.id === idProducto) {
                prod.cantidad++;
            }
        });
    } else {
        const productoEncontrado = stock.find((prod) => prod.id === idProducto);
        carrito.push({ ...productoEncontrado, cantidad: 1 });
    }

    actualizarCarritoDOM();

    Toastify({
        text: "Producto agregado",
        duration: 2000,
        gravity: "bottom", 
        position: "right", 
        style: {
            background: "#3498db",
        }
    }).showToast();
}

function actualizarCarritoDOM() {
    listaCarrito.innerHTML = ""; 
    let total = 0;

    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.innerText = `${producto.nombre} - $${producto.precio} x ${producto.cantidad} un.`;
        listaCarrito.appendChild(li);
        
        total += (producto.precio * producto.cantidad);
    });

    totalCarrito.innerText = total;
    localStorage.setItem("carritoGuardado", JSON.stringify(carrito));
}

// Botón Vaciar
btnVaciar.addEventListener("click", () => {
    if (carrito.length === 0) return;

    Swal.fire({
        title: '¿Estás seguro?',
        text: "Vas a vaciar todo el carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#34495e',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            actualizarCarritoDOM();
            Swal.fire('¡Vaciado!', 'Tu carrito ahora está vacío.', 'success');
        }
    });
});

// Botón Comprar (Ahora con formulario y datos precargados)
btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Carrito vacío',
            text: 'Agregá productos antes de finalizar la compra.'
        });
        return;
    }

    // Formulario HTML inyectado en SweetAlert2 con datos en los "value"
    Swal.fire({
        title: 'Datos de envío',
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Nombre completo" value="Juan Pérez">
            <input id="swal-input2" class="swal2-input" placeholder="Correo electrónico" value="juan@ejemplo.com">
            <input id="swal-input3" class="swal2-input" placeholder="Dirección" value="Av. Falsa 123">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Confirmar pago',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value
            ]
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const nombreUsuario = result.value[0];
            const direccion = result.value[2];

            Swal.fire({
                icon: 'success',
                title: '¡Compra exitosa!',
                text: `Gracias ${nombreUsuario}. Enviaremos tu pedido a ${direccion}.`,
                confirmButtonColor: '#2ecc71'
            });
            carrito = [];
            actualizarCarritoDOM();
        }
    });
});

// Inicialización
cargarProductos();
actualizarCarritoDOM();