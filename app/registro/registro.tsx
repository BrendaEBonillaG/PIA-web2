export default function Registro() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form className="w-full max-w-xs space-y-2 bg-blue-300 p-6 rounded-t-[30px] shadow-md overflow-hidden flex flex-col justify-between min-h-[80vh]">
        {/* Imagen de perfil centrada */}
        <input
          type="file"
          id="profile-picture"
          className="w-20 h-20 rounded-full border-2 border-black mb-4 mx-auto cursor-pointer"
          style={{ backgroundImage: "url('https://img.icons8.com/ios-filled/100/000000/user.png')" }}
        />
        
        <label className="block text-sm font-medium text-black text-center">Usuario</label>
        <input type="text" placeholder="Usuario" className="w-50 p-2 border rounded text-black bg-white mx-auto" />
        
        <label className="block text-sm font-medium text-black text-center">Nombre completo</label>
        <input type="text" placeholder="Nombre" className="w-50 p-2 border rounded text-black bg-white mx-auto" />
        
        <label className="block text-sm font-medium text-black text-center">Correo</label>
        <input type="email" placeholder="Correo" className="w-50 p-2 border rounded text-black bg-white mx-auto" />
        
        <label className="block text-sm font-medium text-black text-center">Telefono</label>
        <input type="int" placeholder="Telefono" className="w-50 p-2 border rounded text-black bg-white mx-auto" />
        
        <label className="block text-sm font-medium text-black text-center">Contraseña</label>
        <input type="password" placeholder="Contraseña" className="w-50 p-2 border rounded text-black bg-white mx-auto" />
        
        <label className="block text-sm font-medium text-black text-center">Confirmar contraseña</label>
        <input type="password" placeholder="Confirmar contraseña" className="w-50 p-2 border rounded text-black bg-white mx-auto" />
        
        {/* Botón centrado */}
        <button type="submit" className="w-32 mx-auto block border-2 border-black bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Entrar
        </button>

        {/* Texto dentro del formulario */}
        <div className="text-sm mt-4 text-black text-center">
          <a href="/registro" className="text-red-500 hover:underline">
            ¿Ya tienes una cuenta?
          </a>
        </div>
      </form>
    </div>
  );
}
