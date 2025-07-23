
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("carrito");
  renderCarrito();

  function renderCarrito() {
    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach(juego => {
      const div = document.createElement("div");
      div.className = "card mb-3 p-3";
      total += juego.precio * juego.cantidad;
      div.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5>${juego.nombre}</h5>
            <p>$${juego.precio.toFixed(2)} x ${juego.cantidad}</p>
          </div>
          <div>
            <button class="btn btn-sm btn-outline-success" onclick='cambiarCantidad("${juego.id}", 1); renderCarrito();'>+</button>
            <button class="btn btn-sm btn-outline-warning" onclick='cambiarCantidad("${juego.id}", -1); renderCarrito();'>-</button>
            <button class="btn btn-sm btn-outline-danger" onclick='eliminarJuego("${juego.id}"); renderCarrito();'>Eliminar</button>
          </div>
        </div>`;
      contenedor.appendChild(div);
    });

    if (carrito.length) {
      const totalDiv = document.createElement("div");
      totalDiv.className = "mt-4 text-end fw-bold";
      totalDiv.innerHTML = `Total: $${total.toFixed(2)}`;
      contenedor.appendChild(totalDiv);
    } else {
      contenedor.innerHTML = "<p class='text-muted'>Tu carrito está vacío.</p>";
    }
  }
});
