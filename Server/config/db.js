mongoose.connect('mongodb://localhost:27017/Web2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión a MongoDB exitosa');
    insertarUsuario();  // Llamamos a la función insertarUsuario después de conectar a MongoDB
  })
  .catch((err) => console.log('Error al conectar con MongoDB:', err));
