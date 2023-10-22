function actualizarBotonLimpiar() {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    let botonLimpiar = document.getElementById('limpiarTotal');
    botonLimpiar.disabled = !carrito || carrito.length === 0;
};

function limpiarTotal() {
    total = 0;
    localStorage.removeItem('carrito');
    localStorage.removeItem('total');
    let detallesJuegos = document.getElementById('detallesJuegos');
    detallesJuegos.innerHTML = '';
    document.getElementById('total').textContent = 'Total: $0.00';

    document.querySelector('.item-count').textContent = '0';

    actualizarBotonLimpiar();
    document.getElementById('limpiarTotal').disabled = true;
}

document.getElementById('limpiarTotal').addEventListener('click', limpiarTotal);


actualizarBotonLimpiar();