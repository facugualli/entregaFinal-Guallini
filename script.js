const botonesAgregar = document.querySelectorAll('.agregar');
function dibujarTablaJuegos() {
    fetch('juegos.json')
        .then(response => response.json())
        .then(data => {
            const juegosGrid = document.querySelector('.juegos-grid');
            
            data.forEach(juego => {
                const juegoDiv = document.createElement('div');
                juegoDiv.className = 'juego';
                const imagen = document.createElement('img');
                imagen.className = 'foto';
                imagen.src = juego.image;
                imagen.alt = juego.nombre;
                const nombre = document.createElement('h2');
                nombre.className = 'nombre';
                nombre.textContent = juego.nombre;
                const precio = document.createElement('h2');
                precio.className = 'precio';
                precio.textContent = juego.precio;
                const boton = document.createElement('button');
                boton.className = 'agregar';
                boton.textContent = 'Agregar al carrito';
                
                juegoDiv.appendChild(imagen);
                juegoDiv.appendChild(nombre);
                juegoDiv.appendChild(precio);
                juegoDiv.appendChild(boton);
                
                juegosGrid.appendChild(juegoDiv);

                boton.addEventListener('click', function() {
                    let juego = boton.parentElement;
                    let nombreJuego = juego.querySelector('h2').textContent;
                    let precioJuego = juego.querySelector('.precio').textContent;
                    agregarAlCarrito(nombreJuego, precioJuego);
            
                    function mostrarCarrito() {
                        let carroDeCompras = document.getElementById('carro-de-compras');
                        carroDeCompras.style.display = 'block';
                        window.scrollTo(0, 0);
                    };
            
                    Toastify({
                        text: "Producto agregado",
                        duration: 5000,
                        close: true,
                        gravity: "bottom", 
                        position: "right", 
                        stopOnFocus: true, 
                        style: {
                            background: "#1f1f1f",
                            boxShadow: "0px 0px 6px #006ec1",
                            borderRadius: "3px",
                            fontFamily: `Onest, sans-serif`,
                            fontSize: `13px`,
                            color: `#e7e7e7`
                        },
            
                        onClick: function() {
                            mostrarCarrito();
                        }
                    }).showToast();
                });
                
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

function dibujarTablaSusc() {
    fetch('suscripciones.json')
        .then(response => response.json())
        .then(data => {
            const juegosGrid = document.getElementById('suscripciones');
            
            data.forEach(juego => {
                const juegoDiv = document.createElement('div');
                juegoDiv.className = 'juego';
                const imagen = document.createElement('img');
                imagen.className = 'foto';
                imagen.src = juego.image;
                imagen.alt = juego.nombre;
                const nombre = document.createElement('h2');
                nombre.className = 'nombre';
                nombre.textContent = juego.nombre;
                const precio = document.createElement('h2');
                precio.className = 'precio';
                precio.textContent = juego.precio;
                const boton = document.createElement('button');
                boton.className = 'agregar';
                boton.textContent = 'Agregar al carrito';
                
                juegoDiv.appendChild(imagen);
                juegoDiv.appendChild(nombre);
                juegoDiv.appendChild(precio);
                juegoDiv.appendChild(boton);
                
                juegosGrid.appendChild(juegoDiv);

                boton.addEventListener('click', function() {
                    let juego = boton.parentElement;
                    let nombreJuego = juego.querySelector('h2').textContent;
                    let precioJuego = juego.querySelector('.precio').textContent;
                    agregarAlCarrito(nombreJuego, precioJuego);
            
                    function mostrarCarrito() {
                        let carroDeCompras = document.getElementById('carro-de-compras');
                        carroDeCompras.style.display = 'block';
                        window.scrollTo(0, 0);
                    };
            
                    Toastify({
                        text: "Producto agregado",
                        duration: 5000,
                        close: true,
                        gravity: "bottom", 
                        position: "right", 
                        stopOnFocus: true, 
                        style: {
                            background: "#1f1f1f",
                            boxShadow: "0px 0px 6px #006ec1",
                            borderRadius: "3px",
                            fontFamily: `Onest, sans-serif`,
                            fontSize: `13px`,
                            color: `#e7e7e7`
                        },
            
                        onClick: function() {
                            mostrarCarrito();
                        }
                    }).showToast();
                });

            });
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

document.addEventListener('DOMContentLoaded', dibujarTablaJuegos);
document.addEventListener('DOMContentLoaded', dibujarTablaSusc);

document.querySelector('.item-count').textContent = '0';

function agregarAlCarrito(nombre, precio) {
    let juego = {
        nombre: nombre,
        precio: parseFloat(precio.replace('$', '')) 
    };
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(juego);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carroDeCompras = document.getElementById('carro-de-compras');

    if (carrito.length === 0) {
        carroDeCompras.classList.add('vacio');
    } else {
        carroDeCompras.classList.remove('vacio');
    }

    const total = carrito.reduce((acc, juego) => acc + juego.precio, 0);
    document.getElementById('total').textContent = 'Total: $' + total.toFixed(2);
    const itemCount = carrito.length;
    document.querySelector('.item-count').textContent = itemCount;
    document.getElementById('finalizarCompra').style.display = itemCount > 0 ? 'block' : 'none';
    document.getElementById('limpiarTotal').style.display = itemCount > 0 ? 'block' : 'none';
    document.getElementById('limpiarTotal').disabled = itemCount === 0;

    let detallesJuegos = document.getElementById('detallesJuegos');
    detallesJuegos.innerHTML = '';
    carrito.forEach((juego) => {
        let detalleJuego = document.createElement('li');
        detalleJuego.textContent = `${juego.nombre} - $${juego.precio.toFixed(2)}`;
        detallesJuegos.appendChild(detalleJuego);
    });
}

function limpiarCarrito() {
    let carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

document.getElementById('limpiarTotal').addEventListener('click', limpiarCarrito);

document.querySelector('.img-carro').addEventListener('click', function () {
    let carroDeCompras = document.getElementById('carro-de-compras');
    if (carroDeCompras.style.display === 'none' || carroDeCompras.style.display === '') {
      carroDeCompras.style.display = 'block';
    } else {
      carroDeCompras.style.display = 'none';
    }
});

window.addEventListener('load', () => {
    actualizarCarrito();
});
