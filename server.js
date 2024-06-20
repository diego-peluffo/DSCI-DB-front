const axios = require('axios');
const fs = require('fs');

const url = 'https://raw.githubusercontent.com/tuUsuario/tuRepositorio/main/server.js';

axios.get(url)
    .then(response => {
        // Guardar el contenido del archivo en un archivo local
        fs.writeFileSync('server.js', response.data);
        console.log('Archivo guardado como server.js');
    })
    .catch(error => {
        console.error('Error al leer el archivo desde GitHub:', error);
    });
