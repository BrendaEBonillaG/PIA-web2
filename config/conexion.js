import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST, // Por ejemplo, 'localhost'
      user: process.env.DB_USER, // Tu usuario de MySQL
      password: process.env.DB_PASSWORD, // Tu contraseña de MySQL
      database: process.env.DB_NAME, // Tu base de datos
    });
    console.log('MySQL connected');
    return connection;
  } catch (err) {
    console.error('MySQL connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
