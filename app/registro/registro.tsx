import React, { useState } from 'react';
import axios from 'axios'; // Importamos axios

export default function Registro() {
  // Definir el estado de cada campo del formulario
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [foto, setFoto] = useState<File | null>(null);

  // Manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'usuario':
        setUsuario(value);
        break;
      case 'nombre':
        setNombre(value);
        break;
      case 'correo':
        setCorreo(value);
        break;
      case 'telefono':
        setTelefono(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'foto':
        const file = e.target.files ? e.target.files[0] : null;
        setFoto(file);
        break;
      default:
        break;
    }
  };const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  const formData = new FormData();
  formData.append('Usuario', usuario);
  formData.append('Nombre', nombre);
  formData.append('Correo', correo);
  formData.append('Telefono', telefono);
  formData.append('Password', password);
  if (foto) formData.append('Foto', foto);

  try {
    const response = await axios.post('http://localhost:5000/usuarios/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201) {
      alert('Usuario registrado con éxito');
    } else {
      throw new Error('No se pudo registrar el usuario');
    }
  } catch (error: any) {
    if (error.response) {
      console.error('Error al registrar el usuario:', error.response);
      alert(`Error del servidor: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      console.error('Error de conexión:', error.request);
      alert('No se pudo conectar al servidor. Verifica que el servidor esté corriendo.');
    } else {
      console.error('Error desconocido:', error.message);
      alert(`Error desconocido: ${error.message}`);
    }
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        className="w-full max-w-xs space-y-2 bg-blue-300 p-6 rounded-t-[30px] shadow-md overflow-hidden flex flex-col justify-between min-h-[80vh]"
        onSubmit={handleSubmit}
      >
        {/* Imagen de perfil centrada */}
        <input
          type="file"
          id="profile-picture"
          name="foto"
          className="w-20 h-20 rounded-full border-2 border-black mb-4 mx-auto cursor-pointer"
          onChange={handleInputChange}
        />

        <label className="block text-sm font-medium text-black text-center">Usuario</label>
        <input
          type="text"
          placeholder="Usuario"
          name="usuario"
          value={usuario}
          onChange={handleInputChange}
          className="w-50 p-2 border rounded text-black bg-white mx-auto"
        />

        <label className="block text-sm font-medium text-black text-center">Nombre completo</label>
        <input
          type="text"
          placeholder="Nombre"
          name="nombre"
          value={nombre}
          onChange={handleInputChange}
          className="w-50 p-2 border rounded text-black bg-white mx-auto"
        />

        <label className="block text-sm font-medium text-black text-center">Correo</label>
        <input
          type="email"
          placeholder="Correo"
          name="correo"
          value={correo}
          onChange={handleInputChange}
          className="w-50 p-2 border rounded text-black bg-white mx-auto"
        />

        <label className="block text-sm font-medium text-black text-center">Telefono</label>
        <input
          type="text"
          placeholder="Telefono"
          name="telefono"
          value={telefono}
          onChange={handleInputChange}
          className="w-50 p-2 border rounded text-black bg-white mx-auto"
        />

        <label className="block text-sm font-medium text-black text-center">Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="w-50 p-2 border rounded text-black bg-white mx-auto"
        />

        <label className="block text-sm font-medium text-black text-center">Confirmar contraseña</label>
        <input
          type="password"
          placeholder="Confirmar contraseña"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange}
          className="w-50 p-2 border rounded text-black bg-white mx-auto"
        />

        {/* Botón centrado */}
        <button
          type="submit"
          className="w-32 mx-auto block border-2 border-black bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Registrar
        </button>

        {/* Texto dentro del formulario */}
        <div className="text-sm mt-4 text-black text-center">
          <a href="/login" className="text-red-500 hover:underline">
            ¿Ya tienes una cuenta?
          </a>
        </div>
      </form>
    </div>
  );
}
