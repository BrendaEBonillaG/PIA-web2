import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, getUserById, updateUser, deactivateUser } from '../controllers/userController.js';

const router = express.Router();

// Registrar usuario con validación
router.post(
  '/register',
  [
    body('Correo')
      .isEmail()
      .withMessage('Correo debe ser válido')
      .normalizeEmail(), // Normalizamos el correo para evitar problemas con mayúsculas/minúsculas

    body('Password')
      .isLength({ min: 8 })
      .withMessage('La contraseña debe tener al menos 8 caracteres')
      .matches(/[A-Z]/)
      .withMessage('La contraseña debe contener al menos una letra mayúscula')
      .matches(/[a-z]/)
      .withMessage('La contraseña debe contener al menos una letra minúscula')
      .matches(/[0-9]/)
      .withMessage('La contraseña debe contener al menos un número')
      .matches(/[\W_]/)
      .withMessage('La contraseña debe contener al menos un carácter especial (por ejemplo, @, #, $, etc.)'),
  ],
  registerUser
);

// Iniciar sesión
router.post('/login', loginUser);

// Obtener usuario por ID
router.get('/:id', getUserById);

// Actualizar usuario
router.put('/:id', updateUser);

// Desactivar usuario (marcar como inactivo)
router.put('/:id/deactivate', deactivateUser);

export default router;
