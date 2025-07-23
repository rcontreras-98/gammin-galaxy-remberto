document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("juegos");
  const filtroGenero = document.getElementById("filtro-genero");
  const filtroConsola = document.getElementById("filtro-consola");
  const btnLimpiarFiltros = document.getElementById("limpiar-filtros");

  function renderizarJuegos(lista) {
    contenedor.innerHTML = "";
    if (lista.length === 0) {
      contenedor.innerHTML = `
        <div class="col-12">
          <div class="alert alert-warning text-center">No se encontraron juegos con los filtros seleccionados.</div>
        </div>`;
      return;
    }

    lista.forEach(juego => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";
      col.innerHTML = `
        <div class="card shadow-lg h-100 border-0 rounded-2 overflow-hidden" style="max-width: 380px;">
          <div class="position-relative" style="height: 460px; overflow: hidden;">
            <img src="${juego.imagen}" class="w-100 h-100" alt="${juego.nombre}" style="object-fit: cover;">
            <span class="position-absolute top-0 end-0 bg-success text-white px-3 py-2 m-2 rounded-1 fw-semibold shadow-sm">
              $${juego.precio.toFixed(2)}
            </span>
          </div>
          <div class="card-body d-flex flex-column px-4 pb-4 pt-3">
            <h5 class="card-title text-center fw-bold fs-5 text-truncate" title="${juego.nombre}">
              ${juego.nombre}
            </h5>
            <div class="mt-auto d-grid gap-2">
              <a href="../juegos/juego.html?id=${juego.id}" class="btn btn-outline-primary">
                <i class="bi bi-eye-fill me-2"></i>Ver detalles
              </a>
              <button class="btn btn-success" onclick='agregarAlCarrito(${JSON.stringify(juego)})'>
                <i class="bi bi-cart-plus-fill me-2"></i>Añadir al carrito
              </button>
            </div>
          </div>
        </div>`;
      contenedor.appendChild(col);
    });
  }

  function aplicarFiltros() {
    const genero = filtroGenero.value;
    const consola = filtroConsola.value;

    const filtrados = juegos.filter(juego => {
      const coincideGenero = genero === "todos" || juego.genero === genero;
      const coincideConsola = consola === "todas" || juego.consola === consola;
      return coincideGenero && coincideConsola;
    });

    renderizarJuegos(filtrados);
  }

  // Eventos de filtro
  filtroGenero.addEventListener("change", aplicarFiltros);
  filtroConsola.addEventListener("change", aplicarFiltros);
  btnLimpiarFiltros.addEventListener("click", () => {
    filtroGenero.value = "todos";
    filtroConsola.value = "todas";
    renderizarJuegos(juegos);
  });

  // Renderizar todo al inicio
  renderizarJuegos(juegos);
});
