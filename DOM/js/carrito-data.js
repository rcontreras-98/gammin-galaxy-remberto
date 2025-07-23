
function mostrarToast(mensaje, tipo = 'success') {
  const toast = document.getElementById('liveToast');
  const body = document.getElementById('toast-body');
  if (toast && body) {
    toast.className = `toast align-items-center text-bg-${tipo} border-0`;
    body.textContent = mensaje;
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  }
}
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}
function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
function agregarAlCarrito(juego) {
  const carrito = obtenerCarrito();
  const existe = carrito.find(j => j.id === juego.id);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...juego, cantidad: 1 });
  }
  guardarCarrito(carrito);
  mostrarToast(`"${juego.nombre}" agregado al carrito`);
}
function eliminarJuego(id) {
  const carrito = obtenerCarrito().filter(j => j.id !== id);
  guardarCarrito(carrito);
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
    mostrarToast(`Cantidad actualizada: ${juego.nombre}`);
  }
}
