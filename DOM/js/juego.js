
document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const juego = juegos.find(j => j.id === id);
  const contenedor = document.getElementById("detalle-juego");
  const contador = document.getElementById("carrito-contador");

  actualizarContadorCarrito();
  renderCarritoFlotante();

  if (juego) {
    contenedor.innerHTML = `
      <div class="row g-4">
        <!-- Galería de imágenes -->
        <div class="col-lg-7">
          <div class="card border-0 shadow-sm overflow-hidden">
            <div class="carousel slide" id="galeriaJuego" data-bs-ride="carousel">
              <div class="carousel-inner ratio ratio-16x9">
                <div class="carousel-item active">
                  <img src="${juego.imagen}" class="d-block w-100 object-fit-cover" alt="${juego.nombre}">
                </div>
                <div class="carousel-item">
                  <img src="${juego.imagen}" class="d-block w-100 object-fit-cover" alt="Gameplay">
                </div>
              </div>
              <button class="carousel-control-prev bg-dark opacity-75" type="button" data-bs-target="#galeriaJuego" data-bs-slide="prev" style="width: 5%">
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button class="carousel-control-next bg-dark opacity-75" type="button" data-bs-target="#galeriaJuego" data-bs-slide="next" style="width: 5%">
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
            <div class="card-footer bg-white py-2">
              <div class="d-flex justify-content-center">
                <button type="button" data-bs-target="#galeriaJuego" data-bs-slide-to="0" class="active mx-1 rounded-circle" style="width:12px; height:12px; background-color: #0d6efd;"></button>
                <button type="button" data-bs-target="#galeriaJuego" data-bs-slide-to="1" class="mx-1 rounded-circle" style="width:12px; height:12px; background-color: #dee2e6;"></button>
              </div>
            </div>
          </div>
        </div>

        <!-- Detalles del juego -->
        <div class="col-lg-5">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h1 class="h2 fw-bold mb-3">${juego.nombre}</h1>
              
              <div class="d-flex align-items-center mb-4">
                <span class="badge bg-success me-2">${juego.genero || "Acción"}</span>
                <span class="badge bg-info">${juego.plataforma || "PC"}</span>
              </div>
              
              <div class="mb-4">
                <h3 class="h5 text-muted">$${juego.precio.toFixed(2)}</h3>
                <div class="text-warning mb-2">
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-fill"></i>
                  <i class="bi bi-star-half"></i>
                  <span class="text-muted ms-2">(4.5)</span>
                </div>
              </div>
              
              <p class="lead mb-4">${juego.descripcion}</p>
              
              <div class="mb-4">
                <h3 class="h5 fw-bold mb-3">Detalles</h3>
                <ul class="list-unstyled">
                  <li class="mb-2"><i class="bi bi-translate me-2 text-primary"></i> <strong>Idiomas:</strong> Español, Inglés</li>
                  <li class="mb-2"><i class="bi bi-people-fill me-2 text-primary"></i> <strong>Clasificación:</strong> +12</li>
                  <li class="mb-2"><i class="bi bi-calendar3 me-2 text-primary"></i> <strong>Lanzamiento:</strong> ${juego.fechaLanzamiento || "2023"}</li>
                </ul>
              </div>
              
              <button class="btn btn-primary btn-lg w-100 py-3 fw-bold" 
                      onclick='agregarAlCarrito(${JSON.stringify(juego)}); actualizarContadorCarrito(); renderCarritoFlotante(); mostrarToast("Agregado al carrito")'>
                <i class="bi bi-cart-plus-fill me-2"></i>Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>`;
  } else {
    contenedor.innerHTML = "<p class='text-danger'>Juego no encontrado.</p>";
  }
});

function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  let total = carrito.reduce((acc, j) => acc + j.cantidad, 0);
  const contador = document.getElementById("carrito-contador");
  if (contador) contador.textContent = total;
}

function renderCarritoFlotante() {
  const carrito = obtenerCarrito();
  const body = document.getElementById("carrito-flotante-body");
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
