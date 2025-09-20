import mysql from 'mysql2/promise';

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '', // Sin contraseña como indicaste
  database: 'Web2'
};

// Crear pool de conexiones para mejor rendimiento
const pool = mysql.createPool(dbConfig);

// Función para obtener usuario por ID
export async function getUserById(userId: number) {
  try {
    const [rows] = await pool.execute(
      'SELECT IDUsuario, Usuario, Nombre, Correo, Telefono, Foto, Activo FROM Usuario WHERE IDUsuario = ? AND Activo = 1',
      [userId]
    );
    return rows[0] || null;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error;
  }
}

// Función para actualizar perfil de usuario
export async function updateUserProfile(userId: number, userData: {
  nombre: string;
  correo: string;
  telefono: string;
  foto?: string;
}) {
  try {
    const { nombre, correo, telefono, foto } = userData;
    
    let query = 'UPDATE Usuario SET Nombre = ?, Correo = ?, Telefono = ?';
    let params: any[] = [nombre, correo, telefono];
    
    if (foto) {
      query += ', Foto = ?';
      params.push(foto);
    }
    
    query += ' WHERE IDUsuario = ?';
    params.push(userId);
    
    const [result] = await pool.execute(query, params);
    return result;
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    throw error;
  }
}

// Función para verificar si email ya existe (para validación)
export async function checkEmailExists(email: string, excludeUserId?: number) {
  try {
    let query = 'SELECT IDUsuario FROM Usuario WHERE Correo = ? AND Activo = 1';
    let params: any[] = [email];
    
    if (excludeUserId) {
      query += ' AND IDUsuario != ?';
      params.push(excludeUserId);
    }
    
    const [rows] = await pool.execute(query, params);
    return Array.isArray(rows) && rows.length > 0;
  } catch (error) {
    console.error('Error al verificar email:', error);
    throw error;
  }
}

// Función para obtener reseñas de un usuario
export async function getUserReviews(userId: number) {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        r.IDResenas, r.Calificacion, r.Fecha, r.Texto, r.Ventajas, r.Recomendacion,
        l.Nombre as LugarNombre, l.Tipo as LugarTipo
      FROM Resenas r
      JOIN Lugar l ON r.LugarFK = l.IDLugar
      WHERE r.UsuarioFK = ? AND r.Activo = 1
      ORDER BY r.Fecha DESC
    `, [userId]);
    return rows;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    throw error;
  }
}

// Función para obtener favoritos de un usuario
export async function getUserFavorites(userId: number) {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        f.IDFavoritos,
        l.IDLugar, l.Nombre, l.Direccion, l.Info, l.Tipo,
        (SELECT Foto FROM Fotos WHERE LugarFK = l.IDLugar LIMIT 1) as PrimeraFoto
      FROM Favoritos f
      JOIN Lugar l ON f.LugarFK = l.IDLugar
      WHERE f.UsuarioFK = ? AND l.Activo = 1
      ORDER BY l.Nombre
    `, [userId]);
    return rows;
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    throw error;
  }
}

// Función para agregar/quitar favorito
export async function toggleFavorite(userId: number, lugarId: number) {
  try {
    // Primero verificar si ya existe
    const [existing] = await pool.execute(
      'SELECT IDFavoritos FROM Favoritos WHERE UsuarioFK = ? AND LugarFK = ?',
      [userId, lugarId]
    );
    
    if (Array.isArray(existing) && existing.length > 0) {
      // Ya existe, eliminar
      await pool.execute(
        'DELETE FROM Favoritos WHERE UsuarioFK = ? AND LugarFK = ?',
        [userId, lugarId]
      );
      return { action: 'removed', isFavorite: false };
    } else {
      // No existe, agregar
      await pool.execute(
        'INSERT INTO Favoritos (UsuarioFK, LugarFK) VALUES (?, ?)',
        [userId, lugarId]
      );
      return { action: 'added', isFavorite: true };
    }
  } catch (error) {
    console.error('Error al cambiar favorito:', error);
    throw error;
  }
}

export default pool;
