const carritoContainer = document.getElementById("carrito_container");
const totalPago = document.getElementById("total_pago");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderCarrito() {
  carritoContainer.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    carritoContainer.innerHTML = `<p class="text-center text-white">El carrito está vacío.</p>`;
    totalPago.textContent = "$0";
    return;
  }

  carrito.forEach((producto, index) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    const precio = Number(producto.precio.replace(/\D/g, ""));
    total += precio;

    card.innerHTML = `
      <div class="card h-100 shadow" style="background-color: rgba(168, 139, 235, 0.2); border-radius: 15px; border: none;">
        <img src="${producto.imagen}" class="card-image img-fluid" alt="${producto.nombre}" style="height: 16rem; object-fit: cover; border-top-left-radius: 15px; border-top-right-radius: 15px;">
        <div class="card-body">
          <h5 class="card-title" style="color: #84a9ff; font-weight: 700;">${producto.nombre}</h5>
          <p class="card-text" style="color: #cbd5ffcc;">${producto.descripcion}</p>
          <p class="fw-bold text-accent">${producto.precio}</p>
        </div>
        <div class="card-footer text-end" style="background: transparent; border-top: none;">
          <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${index})">
            <i class="bi bi-trash"></i> Quitar
          </button>
        </div>
      </div>
    `;

    carritoContainer.appendChild(card);
  });

  totalPago.textContent = `$${total.toLocaleString("es-CO")}`;
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
  actualizarContadorCarrito();
}

document.getElementById("vaciar_carrito").addEventListener("click", () => {
  if (confirm("¿Deseas vaciar el carrito?")) {
    localStorage.removeItem("carrito");
    carrito = [];
    renderCarrito();
    actualizarContadorCarrito();
  }
});

renderCarrito();

function actualizarContadorCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contador_carrito");

  contador.textContent = carrito.length;
}

actualizarContadorCarrito();
