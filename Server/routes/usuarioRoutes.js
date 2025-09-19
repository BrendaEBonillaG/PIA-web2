// server/routes/usuarioRoutes.js

import express from 'express';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
  const { Usuario, Nombre, Correo, Telefono, Password } = req.body;

  try {
    const nuevoUsuario = new Usuario({
      Usuario,
      Nombre,
      Correo,
      Telefono,
      Password, // Asegúrate de hacer el hash de la contraseña antes de guardar
    });

    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: err.message });
  }
});

export default router;
