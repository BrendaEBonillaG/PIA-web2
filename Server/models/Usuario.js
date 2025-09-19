// server/models/Usuario.js

import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  Usuario: {
    type: String,
    required: true,
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
  },
  Activo: {
    type: Boolean,
    default: true,
  },
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;
