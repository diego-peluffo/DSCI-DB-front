const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Configuración de la base de datos
const dbConfig = {
    user: 'tuUsuario',
    password: 'tuContraseña',
    server: 'tuServidor', 
    database: 'tuBaseDeDatos',
    options: {
        encrypt: true, // Use esta opción si está utilizando Azure
        trustServerCertificate: true // Use esta opción si está trabajando con un servidor de desarrollo local
    }
};

// Conexión a la base de datos
sql.connect(dbConfig).then(pool => {
    if(pool.connected) {
        console.log("Conectado a la base de datos");
    }

    // Ruta de ejemplo para obtener datos
    app.get('/api/data', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT * FROM tuTabla');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

}).catch(err => {
    console.log('Error de conexión a la base de datos', err);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

