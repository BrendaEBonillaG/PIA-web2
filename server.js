import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'; // Ruta para usuarios
import placeRoutes from './routes/placeRoutes.js'; // Ruta para lugares
import reviewRoutes from './routes/reviewRoutes.js'; // Ruta para reseñas

dotenv.config(); // Cargar variables de entorno

const app = express();
app.use(express.json()); // Para poder parsear el body de las peticiones

// Conectar a la base de datos
connectDB();

// Usar las rutas
app.use('/usuarios', userRoutes);
app.use('/lugares', placeRoutes);
app.use('/reseñas', reviewRoutes);

// Puerto y arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
