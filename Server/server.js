import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  // Importamos bcryptjs para encriptar contraseñas

// Conectar a MongoDB de escritorio (ajusta la URL de conexión si es necesario)
mongoose.connect('mongodb://localhost:27017/Web2', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conexión a MongoDB exitosa');
}).catch((error) => {
  console.error('Error al conectar con MongoDB:', error);
});

// Definir el esquema de Usuario
const usuarioSchema = new mongoose.Schema({
  Usuario: { type: String, required: true },
  Nombre: { type: String, required: true },
  Correo: { type: String, required: true, unique: true },
  Telefono: { type: String, required: true },
  Password: { type: String, required: true },
  Foto: { type: String, default: null },
  Activo: { type: Boolean, default: true }
});

// Middleware para encriptar la contraseña antes de guardarla
usuarioSchema.pre('save', async function (next) {
  if (this.isModified('Password')) {
    const salt = await bcrypt.genSalt(10);  // Generar un "salt"
    this.Password = await bcrypt.hash(this.Password, salt);  // Encriptar la contraseña
  }
  next();
});

// Crear el modelo de Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Función para insertar un usuario
async function insertarUsuario() {
  const nuevoUsuario = new Usuario({
    Usuario: 'testUser',
    Nombre: 'Juan Pérez',
    Correo: 'juan.perez@example.com',
    Telefono: '123456789',
    Password: '123456',  // La contraseña será encriptada antes de guardarla
    Foto: null,
    Activo: true
  });

  try {
    await nuevoUsuario.save();
    console.log('Usuario insertado correctamente');
  } catch (error) {
    console.error('Error al insertar el usuario:', error);
  }
}

// Llamamos a la función insertarUsuario
insertarUsuario();
