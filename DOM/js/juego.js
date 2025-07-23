
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
            <div class="card border-0 h-100" style="box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
              <div class="card-body p-4">
                <!-- Encabezado con título y precio -->
                <div class="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <h1 class="h2 fw-bold mb-2" style="color: #2c3e50;">${juego.nombre}</h1>
                    <div class="d-flex align-items-center flex-wrap gap-2 mb-2">
                      <span class="badge bg-primary bg-opacity-15 text-primary py-2 px-3 rounded-pill">
                        <i class="bi bi-controller me-1"></i> ${juego.genero}
                      </span>
                      <span class="badge bg-secondary bg-opacity-15 text-secondary py-2 px-3 rounded-pill">
                        <i class="bi bi-laptop me-1"></i> ${juego.plataforma}
                      </span>
                    </div>
                  </div>
                  <div class="text-end">
                    <div class="h3 fw-bold mb-1" style="color: #27ae60;">$${juego.precio.toFixed(2)}</div>
                    <div class="rating-container">
                      <div class="stars" style="--rating: 4.5;"></div>
                      <span class="text-muted small ms-2">4.5/5.0</span>
                    </div>
                  </div>
                </div>

                <!-- Descripción con scroll si es muy larga -->
                <div class="mb-4">
                  <h3 class="h5 fw-bold mb-3" style="color: #34495e;">
                    <i class="bi bi-card-text me-2"></i>Descripción
                  </h3>
                  <div class="description-scroll" style="max-height: 150px; overflow-y: auto;">
                    <p class="mb-0" style="color: #7f8c8d; line-height: 1.7;">${juego.descripcion}</p>
                  </div>
                </div>

                <!-- Detalles del juego en formato de lista mejorada -->
                <div class="mb-4">
                  <h3 class="h5 fw-bold mb-3" style="color: #34495e;">
                    <i class="bi bi-info-circle me-2"></i>Detalles del juego
                  </h3>
                  <div class="game-details-grid">
                    <div class="detail-item">
                      <div class="detail-icon bg-primary bg-opacity-10">
                        <i class="bi bi-translate text-primary"></i>
                      </div>
                      <div>
                        <div class="detail-label">Idiomas</div>
                        <div class="detail-value">Español, Inglés</div>
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-icon bg-primary bg-opacity-10">
                        <i class="bi bi-people-fill text-primary"></i>
                      </div>
                      <div>
                        <div class="detail-label">Clasificación</div>
                        <div class="detail-value">+12</div>
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-icon bg-primary bg-opacity-10">
                        <i class="bi bi-calendar3 text-primary"></i>
                      </div>
                      <div>
                        <div class="detail-label">Lanzamiento</div>
                        <div class="detail-value">${juego.fechaLanzamiento || "2023"}</div>
                      </div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-icon bg-primary bg-opacity-10">
                        <i class="bi bi-file-earmark-text text-primary"></i>
                      </div>
                      <div>
                        <div class="detail-label">Tamaño</div>
                        <div class="detail-value">45GB</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Botón de compra mejorado -->
                <div class="mt-4 pt-2">
                  <button class="btn btn-primary w-100 py-3 fw-bold rounded-pill add-to-cart-btn"
                          onclick='agregarAlCarrito(${JSON.stringify(juego)}); actualizarContadorCarrito(); renderCarritoFlotante(); mostrarToast("Agregado al carrito")'
                          style="background: linear-gradient(135deg, #3498db, #2ecc71); border: none; transition: all 0.3s;">
                    <i class="bi bi-cart-plus-fill me-2"></i>Añadir al carrito - $${juego.precio.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- CSS adicional para incluir -->
          <style>
            .rating-container {
              display: flex;
              align-items: center;
            }
            
            .stars {
              --percent: calc(var(--rating) / 5 * 100%);
              display: inline-block;
              font-size: 1rem;
              line-height: 1;
            }
            
            .stars::before {
              content: '★★★★★';
              letter-spacing: 2px;
              background: linear-gradient(90deg, #f1c40f var(--percent), #ddd var(--percent));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            
            .game-details-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 1rem;
            }
            
            .detail-item {
              display: flex;
              align-items: center;
              gap: 1rem;
              padding: 0.75rem;
              background-color: #f8f9fa;
              border-radius: 10px;
            }
            
            .detail-icon {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.1rem;
            }
            
            .detail-label {
              font-size: 0.8rem;
              color: #7f8c8d;
            }
            
            .detail-value {
              font-weight: 500;
              color: #2c3e50;
            }
            
            .description-scroll::-webkit-scrollbar {
              width: 5px;
            }
            
            .description-scroll::-webkit-scrollbar-thumb {
              background-color: #bdc3c7;
              border-radius: 10px;
            }
            
            .add-to-cart-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
            }
          </style>
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
