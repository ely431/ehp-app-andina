
const http = require('http');

const VERSION = '2.0';

const productos = [
  { nombre: 'Laptop Lenovo', precio: 1899, icono: '💻', categoria: 'Tecnología' },
  { nombre: 'Audífonos Bluetooth', precio: 89, icono: '🎧', categoria: 'Accesorios' },
  { nombre: 'Mouse inalámbrico', precio: 49, icono: '🖱️', categoria: 'Accesorios' },
  { nombre: 'Teclado mecánico', precio: 129, icono: '⌨️', categoria: 'Tecnología' },
  { nombre: 'Smartwatch', precio: 159, icono: '⌚', categoria: 'Tecnología' },
  { nombre: 'Parlante Bluetooth', precio: 99, icono: '🔊', categoria: 'Audio' }
];

const html = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Andina Market | Tienda Online</title>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f4f6f9;
  color: #263238;
}

header {
  background: #102a43;
  color: white;
  padding: 20px 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.logo {
  font-size: 25px;
  font-weight: bold;
}

.logo span {
  color: #f5b942;
}

nav a {
  color: white;
  text-decoration: none;
  margin-left: 20px;
}

.carrito {
  background: #f5b942;
  color: #102a43;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
}

.banner {
  background: linear-gradient(120deg, #102a43, #176b87);
  color: white;
  padding: 75px 8%;
  text-align: center;
}

.banner h1 {
  font-size: 42px;
  margin-bottom: 15px;
}

.banner p {
  font-size: 18px;
  margin-bottom: 25px;
}

.banner a {
  display: inline-block;
  background: #f5b942;
  color: #102a43;
  padding: 13px 25px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}

.contenedor {
  padding: 45px 7%;
}

.titulo {
  text-align: center;
  margin-bottom: 30px;
}

.titulo h2 {
  font-size: 30px;
  color: #102a43;
  margin-bottom: 10px;
}

.productos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 22px;
}

.producto {
  background: white;
  padding: 25px;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,.07);
  transition: transform .2s;
}

.producto:hover {
  transform: translateY(-5px);
}

.icono {
  font-size: 55px;
  margin-bottom: 15px;
}

.producto h3 {
  margin-bottom: 8px;
}

.categoria {
  color: #78909c;
  font-size: 13px;
}

.precio {
  color: #087f5b;
  font-size: 23px;
  font-weight: bold;
  margin: 15px 0;
}

.producto button {
  background: #176b87;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
}

.producto button:hover {
  background: #102a43;
}

.info {
  background: white;
  padding: 35px 7%;
  display: flex;
  justify-content: space-around;
  text-align: center;
  flex-wrap: wrap;
  gap: 20px;
}

.info h3 {
  color: #176b87;
  margin-bottom: 8px;
}

footer {
  background: #102a43;
  color: white;
  text-align: center;
  padding: 25px;
  line-height: 1.8;
}

@media(max-width: 600px) {
  header {
    justify-content: center;
    text-align: center;
  }

  nav a {
    margin: 0 7px;
  }

  .banner h1 {
    font-size: 30px;
  }
}
</style>
</head>

<body>

<header>
  <div class="logo">ANDINA <span>MARKET</span></div>

  <nav>
    <a href="#">Inicio</a>
    <a href="#productos">Productos</a>
    <a href="#nosotros">Nosotros</a>
  </nav>

  <div class="carrito">
    🛒 Carrito: <span id="cantidad">0</span>
  </div>
</header>

<section class="banner">
  <h1>Bienvenido a Andina Market</h1>
  <p>Encuentra tecnología y accesorios al mejor precio.</p>
  <a href="#productos">Ver productos</a>
</section>

<section class="contenedor" id="productos">
  <div class="titulo">
    <h2>Nuestros productos</h2>
    <p>Descubre nuestras opciones disponibles</p>
  </div>

  <div class="productos">
    ${productos.map((p, i) => `
      <div class="producto">
        <div class="icono">${p.icono}</div>
        <h3>${p.nombre}</h3>
        <p class="categoria">${p.categoria}</p>
        <div class="precio">S/ ${p.precio.toFixed(2)}</div>
        <button onclick="agregar()">Agregar al carrito</button>
      </div>
    `).join('')}
  </div>
</section>

<section class="info" id="nosotros">
  <div>
    <h3>🚚 Envíos</h3>
    <p>Atención para nuestros clientes</p>
  </div>
  <div>
    <h3>💳 Precios</h3>
    <p>Productos a precios accesibles</p>
  </div>
  <div>
    <h3>⭐ Calidad</h3>
    <p>Variedad de productos</p>
  </div>
</section>

<footer>
  <h3>ANDINA MARKET</h3>
  <p>Tu tienda de tecnología y accesorios</p>
  <p>© 2026 Andina Market - Versión ${VERSION}</p>
</footer>

<script>
let cantidad = 0;

function agregar() {
  cantidad++;
  document.getElementById('cantidad').textContent = cantidad;
}
</script>

</body>
</html>
`;

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end(html);
}).listen(3000, '0.0.0.0', () => {
  console.log('Andina Market funcionando en el puerto 3000');
  console.log('Versión ' + VERSION);
});
