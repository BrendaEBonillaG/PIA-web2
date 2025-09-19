import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';  // Asegúrate de que este archivo exista

// Inicializamos el servidor Express
const app = express();

// Middleware para manejar JSON en las solicitudes
app.use(express.json());
app.use(cors()); // Esto permitirá que tu front-end se comunique con el back-end

// Conectar con la base de datos MongoDB
connectDB();

// Definir una ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Usar las rutas de usuarios (esto es necesario para las peticiones a /usuarios)
app.use('/usuarios', usuarioRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
