
function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  let total = carrito.reduce((acc, j) => acc + j.cantidad, 0);
  const contador = document.getElementById("carrito-contador");
  if (contador) contador.textContent = total;
}

function renderCarritoFlotante() {
  const carrito = obtenerCarrito();
  const body = document.getElementById("carrito-flotante-body");
  if (!body) return;

  body.innerHTML = "";

  if (carrito.length === 0) {
    body.innerHTML = "<p>Carrito vacío.</p>";
    return;
  }

  carrito.forEach(juego => {
    const div = document.createElement("div");
    div.className = "mb-3 border-bottom pb-2";
    div.innerHTML = `
      <strong>${juego.nombre}</strong><br>
      Cantidad: ${juego.cantidad} | Precio: $${juego.precio.toFixed(2)}
    `;
    body.appendChild(div);
  });
}
