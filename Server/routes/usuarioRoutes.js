import express from 'express';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import Usuario from '../models/Usuario.js';  // El modelo de Mongoose para usuarios

const router = express.Router();

// Configuración de multer para manejar la subida de la foto de perfil
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');  // Ruta donde guardarás las fotos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Genera un nombre único para la foto
    },
});
const upload = multer({ storage });

// Esquema de la ruta para registrar un nuevo usuario
router.post('/register', upload.single('Foto'), async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);  // Para ver los datos recibidos
        console.log('Archivo recibido:', req.file);  // Para ver si el archivo se sube correctamente

        const { Usuario, Nombre, Correo, Telefono, Password } = req.body;
        const Foto = req.file ? req.file.path : null;  // Si la foto se ha cargado, usamos la ruta del archivo

        // Validación de campos requeridos
        if (!Usuario || !Nombre || !Correo || !Telefono || !Password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        // Verificar si el correo ya está registrado
        const existingUser = await Usuario.findOne({ Correo });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Crear el nuevo usuario
        const nuevoUsuario = new Usuario({
            Usuario,
            Nombre,
            Correo,
            Telefono,
            Password: hashedPassword,
            Foto,
        });

        // Guardar el nuevo usuario en la base de datos
        await nuevoUsuario.save();
        return res.status(201).json({ message: 'Usuario registrado con éxito' });

    } catch (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).json({ message: 'Hubo un error al registrar el usuario', error: err.message });
    }
});

export default router;
