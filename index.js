const http = require('http');
const fs = require('fs');
const url = require('url');

// Lee las palabras desde el archivo diccionario.txt
const palabras = fs.readFileSync('diccionario.txt', 'utf8').split('\n').filter(Boolean);

function getRandomWords(n) {
  return Array.from({ length: n }, () => palabras[Math.floor(Math.random() * palabras.length)]).join('-');
}

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;
  const numPalabras = query.x ? parseInt(query.x) : 3; // Por defecto, 3 palabras
  const password = getRandomWords(numPalabras);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<h1>Contraseña generada: ${password}</h1>`);
});

server.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));
