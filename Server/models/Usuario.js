import mongoose from 'mongoose';

// Esquema de Usuario
const usuarioSchema = new mongoose.Schema({
  Usuario: {
    type: String,
    required: true,
    unique: true,
  },
  Nombre: {
    type: String,
    required: true,
  },
  Correo: {
    type: String,
    required: true,
    unique: true,
  },
  Telefono: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Foto: {
    type: String,
    default: null, // Foto opcional
  },
  Activo: {
    type: Boolean,
    default: true, // Usuario activo por defecto
  },
});

// Crear el modelo de Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
