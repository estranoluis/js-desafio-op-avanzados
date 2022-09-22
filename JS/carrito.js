// Variable carrito con una funcion para que detecte si existen valores en el storage
//let carrito = cargarCarrito(); Revisar esta variable al final del Codigo

// Secciones del HTML
let sectionProductos = document.getElementById("section-productos");
let sectionCarrito = document.getElementById("section-carrito");

// Seccion carrito en DOM
let totalCompra = document.createElement("div");
totalCompra.innerHTML = "<h2>Total: $</h2>";
sectionCarrito.appendChild(totalCompra);

let montoTotalCompra = document.createElement("h2");
montoTotalCompra.innerText = "0";
totalCompra.appendChild(montoTotalCompra);

let cantidadProductos = document.createElement("div");
cantidadProductos.innerHTML = "<h3>Cantidad de productos: </h3>";
sectionCarrito.appendChild(cantidadProductos);

let cantProductos = document.createElement("h3");
cantProductos.innerText = "0";
cantidadProductos.appendChild(cantProductos);

let botonFinalizar = document.createElement("button");
botonFinalizar.innerText = "Finalizar compra";
sectionCarrito.appendChild(botonFinalizar);
botonFinalizar.setAttribute("class", "boton");
botonFinalizar.onclick = () => {
const precioFinal = montoTotalCompra.innerText;
// Sweet alert para confirmacion de compra, cuando toca si se vacia el carrito
Swal.fire({
    title: '¿Seguro que desea finalizar tu compra?',
    text: `Total a pagar: $${precioFinal}`,
    showCancelButton: true,
    confirmButtonColor: '#008f39',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si',
    cancelButtonText: 'No'
    }).then((result) => {
    // Modifique con operador logico And (&&) y deje en comentario el codigo anterior como prueba
        result.isConfirmed && Swal.fire(
            'Compra confirmada',
            '¡Que lo disfrutes!',
            'success'
            )
            vaciarCarrito();
        // if (result.isConfirmed) {
        //     Swal.fire(
        //     'Compra confirmada',
        //     '¡Que lo disfrutes!',
        //     'success'
        //     )
        //     vaciarCarrito();
        }
    )
}


// Productos en cards
for (const producto of productos) {
let container = document.createElement("div");
container.setAttribute("class", "card-product");
container.innerHTML = ` <div class="img-container">
                        <img src= "./media/${producto.id}.jpg" alt="${producto.nombre}" class="img-product"/>
                        </div>
                        <div class="info-producto">
                        <p class="font">${producto.nombre}</p>
                        <p class="font">${producto.descripcion}</p>
                        <strong class="font">$${producto.precio}</strong>
                        <button class="boton" id="btn${producto.id}"> Agregar al carrito </button>
                        </div>`;
sectionProductos.appendChild(container);
//Evento para que los productos se agreguen al carrito al hacer click en el boton
document.getElementById(`btn${producto.id}`).onclick = () => agregarAlCarrito(`${producto.id}`);
}

//Funciones
function agregarAlCarrito(id) {
    carrito.push(productos.find(p => p.id == id));
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotalCarrito();
}

function calcularTotalCarrito() {
    let total = 0;
    for (const producto of carrito) {
        total += producto.precio;
        }
    montoTotalCompra.innerText = total;
    cantProductos.innerText = carrito.length;
}

function vaciarCarrito() {
    montoTotalCompra.innerText = "0";
    cantProductos.innerText = "0";
    localStorage.clear();
    carrito = [];
}

//Reduci lineas al eliminar la funcion cargarCarrito y crear un operador logico OR con la constante carrito que estaba al principio del codigo
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
//Dejo esto como evidencia por si se desea corroborar que todo funciona como antes, en el proximo desafio se organizara mejor
// function cargarCarrito() {
//     let carrito = JSON.parse(localStorage.getItem("carrito"));
//     if (carrito == null) {
//         return [];
//         } else {
//         return carrito;
//         }
// }



