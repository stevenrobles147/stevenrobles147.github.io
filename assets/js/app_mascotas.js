
document.body.addEventListener("click", function (e) {
  const boton = e.target.closest(".btn-success");
  if (boton) {
    const card = boton.closest(".card");
    const nombre = card.querySelector(".card-title").textContent;
    const descripcion = card.querySelector(".card-text").textContent;
    const precio = card.querySelector(".fw-bold").textContent;
    const imagen = card.querySelector("img").getAttribute("src");

    const nuevoProducto = { nombre, descripcion, precio, imagen };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(nuevoProducto);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarToast(`${nombre} fue agregado al carrito 🛒`);
    mostrarNotificacionSistema(nombre);
  }
});

const inputBusqueda = document.getElementById("input_busqueda");
const filtroCategoria = document.getElementById("filtro_categoria");

function filtrarProductos() {
  const texto = inputBusqueda.value.toLowerCase();
  const categoria = filtroCategoria.value;

  const secciones = document.querySelectorAll("section");

  secciones.forEach(seccion => {
    const idSeccion = seccion.id;
    const productos = seccion.querySelectorAll(".col-sm-6");

    let tieneProductosVisibles = false;


    const mostrarSeccion = (categoria === "todos" || categoria === idSeccion);

    if (mostrarSeccion) {
      productos.forEach(prod => {
        const nombre = prod.querySelector(".card-title").textContent.toLowerCase();
        if (nombre.includes(texto)) {
          prod.style.display = "block";
          tieneProductosVisibles = true;
        } else {
          prod.style.display = "none";
        }
      });

      seccion.style.display = tieneProductosVisibles ? "block" : "none";
    } else {

      seccion.style.display = "none";
    }
  });
}

inputBusqueda.addEventListener("input", filtrarProductos);
filtroCategoria.addEventListener("change", filtrarProductos);



function mostrarToast(mensaje) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");

  toast.className = "toast align-items-center text-white bg-success border-0 show mb-2";
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${mensaje}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.remove();
  }, 3000);
}

function contadorVisitas() {

  let visitas = localStorage.getItem("contador_visitas");
  if (visitas === null) {
    visitas = 1;
  } else {
    visitas = parseInt(visitas) + 1;
  }
  
  localStorage.setItem("contador_visitas", visitas);
  
  console.log("Número de visitas:", visitas);

  const elemento = document.getElementById("contador_visitas");
  if (elemento) {
    elemento.textContent = `Han visitado esta página ${visitas} veces 🐾`;
  }
}

contadorVisitas();