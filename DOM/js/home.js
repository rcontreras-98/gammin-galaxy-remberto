
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("juegos");

  juegos.forEach(juego => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="position-relative" style="height: 200px; overflow: hidden;">
          <img src="${juego.imagen}" class="card-img-top h-100 object-fit-cover" alt="${juego.nombre}">
          <span class="position-absolute top-0 end-0 bg-success text-white px-2 py-1 m-2 rounded">
            $${juego.precio.toFixed(2)}
          </span>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title fs-5 text-truncate" title="${juego.nombre}">${juego.nombre}</h5>
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
});
