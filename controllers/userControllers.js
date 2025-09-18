import jwt from 'jsonwebtoken';
import connectDB from '../config/db.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';  // Usamos express-validator para la validación de los datos

// Registrar usuario
export const registerUser = async (req, res) => {
  const { Usuario, Nombre, Correo, Telefono, Password } = req.body;

  // Validación de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const connection = await connectDB();

    // Comprobar si el correo ya existe
    const [existingUser] = await connection.execute(
      'SELECT * FROM Usuario WHERE Correo = ?',
      [Correo]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Correo ya registrado' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Insertar el usuario en la base de datos
    const [result] = await connection.execute(
      'INSERT INTO Usuario (Usuario, Nombre, Correo, Telefono, Password) VALUES (?, ?, ?, ?, ?)',
      [Usuario, Nombre, Correo, Telefono, hashedPassword]
    );

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// Iniciar sesión y obtener JWT
export const loginUser = async (req, res) => {
  const { Correo, Password } = req.body;

  try {
    const connection = await connectDB();

    // Buscar al usuario por correo
    const [rows] = await connection.execute(
      'SELECT * FROM Usuario WHERE Correo = ? AND Activo = 1',  // Verificar que el usuario esté activo
      [Correo]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado o inactivo' });
    }

    // Comparar contraseñas
    const match = await bcrypt.compare(Password, rows[0].Password);
    if (!match) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear JWT
    const token = jwt.sign({ id: rows[0].IDUsuario }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Obtener información de un usuario
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();

    // Obtener los datos del usuario
    const [rows] = await connection.execute(
      'SELECT IDUsuario, Usuario, Nombre, Correo, Telefono, Foto, Activo FROM Usuario WHERE IDUsuario = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los datos del usuario' });
  }
};

// Actualizar información de un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { Nombre, Correo, Telefono, Foto } = req.body;

  try {
    const connection = await connectDB();

    // Verificar si el correo ya está en uso por otro usuario
    const [existingEmail] = await connection.execute(
      'SELECT * FROM Usuario WHERE Correo = ? AND IDUsuario != ?',
      [Correo, id]
    );

    if (existingEmail.length > 0) {
      return res.status(400).json({ message: 'El correo ya está en uso por otro usuario' });
    }

    // Actualizar el usuario
    await connection.execute(
      'UPDATE Usuario SET Nombre = ?, Correo = ?, Telefono = ?, Foto = ? WHERE IDUsuario = ?',
      [Nombre, Correo, Telefono, Foto, id]
    );

    res.status(200).json({ message: 'Usuario actualizado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar los datos del usuario' });
  }
};

// Marcar usuario como inactivo (en lugar de eliminarlo)
export const deactivateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await connectDB();

    // Marcar el usuario como inactivo
    await connection.execute(
      'UPDATE Usuario SET Activo = 0 WHERE IDUsuario = ?',
      [id]
    );

    res.status(200).json({ message: 'Usuario desactivado con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al desactivar el usuario' });
  }
};
