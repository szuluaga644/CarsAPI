require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/database');
const brandRoutes = require('./routes/brand.routes');
const carRoutes = require('./routes/car.routes');

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use('/api/brands', brandRoutes);
app.use('/api/cars', carRoutes);

// Conectar a la base de datos
sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch(err => console.error('Error al conectar con la base de datos:', err));

sequelize.sync({ force: false })
    .then(() => console.log('Tablas sincronizadas con la base de datos'))
    .catch(err => console.error('Error al sincronizar tablas:', err));

// Ruta simple para probar el servidor
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Iniciar servidor
const PORT = process.env.PORT || 8020;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});