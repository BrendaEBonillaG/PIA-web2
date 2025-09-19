// /config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Reemplaza esto con tu URI de MongoDB
    const uri = 'mongodb://localhost:27017/web2'; // Si usas MongoDB local
    // O si usas MongoDB Atlas, será algo como esto:
    // const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/web2?retryWrites=true&w=majority';

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Termina el proceso si hay error
  }
};

export default connectDB;
