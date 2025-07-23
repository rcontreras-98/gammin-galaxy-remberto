
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
        <!-- Carrusel de imágenes mejorado -->
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm overflow-hidden">
            <div id="galeriaJuego" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner" style="aspect-ratio: 16/9; background-color: #f8f9fa;">
                <div class="carousel-item active">
                  <img src="${juego.imagen}" class="d-block w-100 h-100 object-fit-contain" alt="${juego.nombre}" style="object-position: center top;">
                </div>
                <div class="carousel-item">
                  <img src="${juego.imagenSecundaria || juego.imagen}" class="d-block w-100 h-100 object-fit-contain" alt="Gameplay" style="object-position: center top;">
                </div>
              </div>
              <button class="carousel-control-prev bg-dark opacity-50" type="button" data-bs-target="#galeriaJuego" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button class="carousel-control-next bg-dark opacity-50" type="button" data-bs-target="#galeriaJuego" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
            <div class="card-footer bg-white py-2">
              <div class="d-flex justify-content-center">
                <button type="button" data-bs-target="#galeriaJuego" data-bs-slide-to="0" class="active mx-1 rounded-circle" style="width:12px; height:12px; background-color: #0d6efd; border: none;"></button>
                <button type="button" data-bs-target="#galeriaJuego" data-bs-slide-to="1" class="mx-1 rounded-circle" style="width:12px; height:12px; background-color: #dee2e6; border: none;"></button>
              </div>
            </div>
          </div>

          <!-- Botón para tráiler con mejor estilo -->
          <div class="text-center mt-3">
            <a href="#" class="btn btn-warning btn-sm" onclick="mostrarTrailer('${juego.trailer}')" data-bs-toggle="modal" data-bs-target="#modalTrailer">
              <i class="bi bi-play-circle-fill me-1"></i> Ver tráiler
            </a>
          </div>
        </div>

        <!-- Detalles mejor organizados -->
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 class="h3 fw-bold mb-2">${juego.nombre}</h1>
                  <div class="d-flex align-items-center flex-wrap gap-2 mb-3">
                    <span class="badge bg-primary bg-opacity-10 text-primary py-2 px-3">${juego.genero || "Acción"}</span>
                    <span class="badge bg-secondary bg-opacity-10 text-secondary py-2 px-3">${juego.plataforma || "PC"}</span>
                  </div>
                </div>
                <div class="text-end">
                  <div class="h4 text-success fw-bold mb-1">$${juego.precio.toFixed(2)}</div>
                  <div class="text-warning small">
                    <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i>
                    <span class="text-muted ms-1">4.5</span>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <h3 class="h5 fw-bold mb-2">Descripción</h3>
                <p class="mb-0 text-muted" style="line-height: 1.6;">${juego.descripcion}</p>
              </div>

              <div class="mb-4">
                <h3 class="h5 fw-bold mb-3">Detalles del juego</h3>
                <div class="row g-2 small">
                  <div class="col-md-6">
                    <div class="d-flex align-items-center mb-2">
                      <i class="bi bi-translate me-2 text-primary" style="width: 24px; text-align: center;"></i>
                      <div>
                        <strong>Idiomas:</strong> Español, Inglés
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center mb-2">
                      <i class="bi bi-people-fill me-2 text-primary" style="width: 24px; text-align: center;"></i>
                      <div>
                        <strong>Clasificación:</strong> +12
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center mb-2">
                      <i class="bi bi-calendar3 me-2 text-primary" style="width: 24px; text-align: center;"></i>
                      <div>
                        <strong>Lanzamiento:</strong> ${juego.fechaLanzamiento || "2023"}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="d-flex align-items-center mb-2">
                      <i class="bi bi-file-earmark-text me-2 text-primary" style="width: 24px; text-align: center;"></i>
                      <div>
                        <strong>Tamaño:</strong> 45GB
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-auto pt-2">
                <button class="btn btn-primary w-100 py-2 fw-bold rounded-pill"
                        onclick='agregarAlCarrito(${JSON.stringify(juego)}); actualizarContadorCarrito(); renderCarritoFlotante(); mostrarToast("Agregado al carrito")'>
                  <i class="bi bi-cart-plus-fill me-2"></i>Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  } else {
    contenedor.innerHTML = "<p class='text-danger'>Juego no encontrado.</p>";
  }
});

function mostrarTrailer(url) {
  const iframe = document.getElementById("iframeTrailer");
  iframe.src = url;
}

const modal = document.getElementById("modalTrailer");
modal.addEventListener("hidden.bs.modal", () => {
  document.getElementById("iframeTrailer").src = "";
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
