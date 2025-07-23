document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("carrito");
  const contadorCarrito = document.getElementById("contador-carrito");
  
  // Función para actualizar el contador del carrito
  function actualizarContador() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((sum, juego) => sum + juego.cantidad, 0);
    if (contadorCarrito) {
      contadorCarrito.textContent = totalItems;
      contadorCarrito.style.display = totalItems > 0 ? 'block' : 'none';
    }
  }

  // Función principal para renderizar el carrito
  function renderCarrito() {
    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach(juego => {
      const div = document.createElement("div");
      div.className = "card mb-3 p-3";
      total += juego.precio * juego.cantidad;
      
      div.innerHTML = `
        <div class="d-flex justify-content-between align-items-center p-2 bg-light rounded-3 mb-2">
          <div class="d-flex align-items-center gap-3">
            <img src="${juego.imagen}" alt="${juego.nombre}" class="rounded-2" style="width: 60px; height: 60px; object-fit: cover;">
            <div>
              <h6 class="mb-1 fw-bold">${juego.nombre}</h6>
              <div class="d-flex align-items-center gap-3">
                <span class="text-success fw-bold">$${(juego.precio * juego.cantidad).toFixed(2)}</span>
                <small class="text-muted">($${juego.precio.toFixed(2)} c/u)</small>
              </div>
            </div>
          </div>
          
          <div class="d-flex align-items-center gap-2">
            <div class="input-group input-group-sm" style="width: 110px;">
              <button class="btn btn-outline-secondary cambiar-cantidad" 
                      data-id="${juego.id}" data-delta="-1"
                      ${juego.cantidad <= 1 ? 'disabled' : ''}>
                <i class="bi bi-dash">-</i>
              </button>
              <input type="text" class="form-control text-center" 
                    value="${juego.cantidad}" readonly
                    style="background-color: white;">
              <button class="btn btn-outline-secondary cambiar-cantidad" 
                      data-id="${juego.id}" data-delta="1">
                <i class="bi bi-plus">+</i>
              </button>
            </div>
            
            <button class="btn btn-outline-danger btn-sm p-2 eliminar-item" 
                    data-id="${juego.id}"
                    title="Eliminar del carrito">
              <i class="bi bi-trash-fill">Eliminar</i>
            </button>
          </div>
        </div>`;
      
      contenedor.appendChild(div);
    });

    // Mostrar total o mensaje de carrito vacío
    if (carrito.length) {
      const totalDiv = document.createElement("div");
      totalDiv.className = "mt-4 text-end fw-bold fs-5";
      totalDiv.innerHTML = `Total: <span class="text-success">$${total.toFixed(2)}</span>`;
      contenedor.appendChild(totalDiv);
    } else {
      contenedor.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-cart-x fs-1 text-muted"></i>
          <p class="text-muted mt-3">Tu carrito está vacío</p>
        </div>`;
    }

    // Actualizar contador
    actualizarContador();
  }

  // Delegación de eventos para los botones dinámicos
  contenedor.addEventListener('click', (e) => {
    const target = e.target.closest('.cambiar-cantidad') || e.target.closest('.eliminar-item');
    if (!target) return;

    const id = target.dataset.id;
    
    if (target.classList.contains('eliminar-item')) {
      eliminarJuego(id);
    } else if (target.classList.contains('cambiar-cantidad')) {
      const delta = parseInt(target.dataset.delta);
      cambiarCantidad(id, delta);
    }
  });

  // Funciones modificadas para actualizar la UI
  function eliminarJuego(id) {
    const carrito = obtenerCarrito().filter(j => j.id !== id);
    guardarCarrito(carrito);
    renderCarrito();
    mostrarToast("Producto eliminado del carrito", "danger");
  }

  function cambiarCantidad(id, delta) {
    const carrito = obtenerCarrito();
    const juego = carrito.find(j => j.id === id);
    if (!juego) return;
    
    juego.cantidad += delta;
    
    if (juego.cantidad <= 0) {
      eliminarJuego(id);
    } else {
      guardarCarrito(carrito);
      renderCarrito();
      mostrarToast(`Cantidad actualizada: ${juego.nombre} (${juego.cantidad})`);
    }
  }

  // Inicializar
  renderCarrito();
});
