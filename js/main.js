//array de frutas
const frutas = [
  { id: 1, nombre: "arandano", precio: 3000, ruta: "img/arandano.jpg" },
  { id: 2, nombre: "banana", precio: 1200, ruta: "img/banana.jpg" },
  { id: 3, nombre: "frambuesa", precio: 5000, ruta: "img/frambuesa.jpg" },
  { id: 4, nombre: "frutilla", precio: 3300, ruta: "img/frutilla.jpg" },
  { id: 5, nombre: "kiwi", precio: 2600, ruta: "img/kiwi.jpeg" },
  { id: 6, nombre: "mandarina", precio: 500, ruta: "img/mandarina.jpg" },
  { id: 7, nombre: "manzana", precio: 1000, ruta: "img/manzana.jpg" },
  { id: 8, nombre: "naranja", precio: 2000, ruta: "img/naranja.jpg" },
  { id: 9, nombre: "pera", precio: 3500, ruta: "img/pera.jpg" },
  { id: 10, nombre: "anana", precio: 5000, ruta: "img/anana.jpeg" },
  { id: 11, nombre: "pomelo-amarillo", precio: 6000, ruta: "img/pomelo-amarillo.jpg" },
  { id: 12, nombre: "pomelo-rojo", precio: 5000, ruta: "img/pomelo-rojo.jpg" },
  { id: 13, nombre: "durazno", precio: 2200, ruta: "img/durazno.jpg" }
];

let carrito = [];

// esta funcion imprime los datos del alumno. se utiliza un array para definir los datos del alumno
// y getElementById para obtener el id y luego printearlo con innerhtml
function imprimirDatosAlumno() {
  const alumno = { dni: "45928057", nombre: "Jose", apellido: "Rojas" };
  // Mensaje en consola con backticks:
  console.log(`${alumno.nombre} ${alumno.apellido} ${alumno.dni}`);
  // Imprimir en el nav
  const cont = document.getElementById("alumnoNombre");
  cont.innerHTML = `${alumno.nombre} ${alumno.apellido}`;
}

//init para iniciar todo
function init() {
  imprimirDatosAlumno();
  cargarProductos(frutas);
  eventos();
  restaurarCarritoDesdeStorage();
  mostrarCarrito();
}

// esta funcion se encarga de renderizar los productos. se utiliza foreach para iterar sobre cada
// producto y luego printearlo con innerhtml
function cargarProductos(lista) {
  const cont = document.getElementById("productos");
  let html = "";
  lista.forEach(prod => {
    html += `
      <div class="card-producto">
        <img src="${prod.ruta}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p class="precio">$${prod.precio}</p>
        <button class="boton boton-agregar" data-id="${prod.id}">Agregar a carrito</button>
      </div>
    `;
  });
  cont.innerHTML = html;
}

// esta funcion filtra los productos segun el texto ingresado
// aplica filter() sobre frutas y luego vuelve a renderizarlo con cargarProductos()
function filtrarProductos(valor) {
  filtrado = frutas.filter(f => f.nombre.includes(valor));
  cargarProductos(filtrado);
}

// esta funcion asigna y centraliza todos los listeners de la pagina
function eventos() {
  document.getElementById("productos").addEventListener("click", function (e) {
    if (e.target.matches(".boton-agregar")) {
      const id = Number(e.target.dataset.id);
      agregarAlCarrito(id);
    }
  });

  const filtro = document.getElementById("filtro");
  filtro.addEventListener("input", () => filtrarProductos(filtro.value));

  // filtra por orden de precio con sort()
  document.getElementById("ordenPrecio").addEventListener("click", () => {
    frutas.sort((a, b) => a.precio - b.precio);
    cargarProductos(frutas);
  });

  // vaciar carrito
  document.getElementById("vaciarCarrito").addEventListener("click", () => {
    carrito = [];
    guardarCarritoEnStorage();
    mostrarCarrito();
  });

  // eliminar items del carrito
  document.getElementById("listaCarrito").addEventListener("click", function (e) {
    if (e.target && e.target.matches(".boton-eliminar")) {
      const id = Number(e.target.dataset.id);
      eliminarProducto(id);
    }
  });
}

// esta funcion agrega una fruta al carrito segun su id
// utiliza find() para localizar el producto y luego lo agrega en el array carrito
// tambien lo printea en la consola
function agregarAlCarrito(id) {
  const producto = frutas.find(f => f.id === id);
  carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio });
  console.log("Carrito:", carrito);
  guardarCarritoEnStorage();
  mostrarCarrito();
}

// esta funcion renderiza el contenido del carrito en el DOM
function mostrarCarrito() {
  const lista = document.getElementById("listaCarrito");
  let html = "";

  if (carrito.length === 0) {
    html = `<p>El carrito está vacío.</p>`;
  } else {
    carrito.forEach(item => {
      html += `
        <li class="carrito-item">
          <p>${item.nombre} - $${item.precio}</p>
          <button class="boton-eliminar" data-id="${item.id}">Eliminar</button>
        </li>
      `;
    });
  }

  lista.innerHTML = html;

  // Actualizo contador y total
  document.getElementById("contador").innerText = carrito.length;
  const total = carrito.reduce((acc, it) => acc + Number(it.precio), 0);
  document.getElementById("total").innerText = total;
}

// esta funcion se encarga de eliminar un producto por su id, si hay duplicados elimina la primera occurrencia
function eliminarProducto(id) {
  const pos = carrito.findIndex(it => it.id === id);
  if (pos !== -1) {
    carrito.splice(pos, 1);
    guardarCarritoEnStorage();
    mostrarCarrito();
  }
}

const CARRITO = "miCarrito";

// esta funcion se encarga de guardar los items del carrito en el localStorage y en formato json con json.stringify()
function guardarCarritoEnStorage() {
  localStorage.setItem(CARRITO, JSON.stringify(carrito));
}

// esta funcion recupera los datos del carrito guardados en localStorage y los asigna al array carrito para restaurarlo
function restaurarCarritoDesdeStorage() {
  const items = localStorage.getItem(CARRITO);
  if (items) {
    carrito = JSON.parse(items) || [];
  } else {
    carrito = [];
  }
}

init();
