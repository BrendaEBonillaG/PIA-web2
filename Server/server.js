import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usuarioRoutes from './routes/usuarioRoutes.js';  // Rutas de usuarios

// Inicializamos el servidor Express
const app = express();

// Middleware para manejar JSON en las solicitudes
app.use(express.json());
app.use(cors()); // Esto permitirá que tu front-end se comunique con el back-end

// Conectar con la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/Web2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.log('Error al conectar con MongoDB:', err));

// Usar las rutas de usuarios (esto es necesario para las peticiones a /usuarios)
app.use('/usuarios', usuarioRoutes);

// Ruta de prueba para ver si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
