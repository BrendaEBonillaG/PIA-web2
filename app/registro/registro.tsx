export default function Registro() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <form className="w-full max-w-xs space-y-4 bg-white p-6 rounded-lg shadow-md">
        <img src="https://img.icons8.com/ios-filled/100/000000/user.png" alt="User Icon" className="mx-auto mb-4" />
         <label className="block text-sm font-medium text-black text-center">Usuario</label>
        <input type="text" placeholder="Usuario" className="w-full p-2 border rounded text-black" />
        <label className="block text-sm font-medium text-black text-center">Nombre completo</label>
        <input type="text" placeholder="Nombre" className="w-full p-2 border rounded  text-black" />
        <label className="block text-sm font-medium text-black text-center">Correo</label>
        <input type="email" placeholder="Correo" className="w-full p-2 border rounded  text-black" />
        <label className="block text-sm font-medium text-black text-center">Telefono</label>
        <input type="int" placeholder="Telefono" className="w-full p-2 border rounded  text-black" />
        <label className="block text-sm font-medium text-black text-center">Contraseña</label>
        <input type="password" placeholder="Contraseña" className="w-full p-2 border rounded text-black" />
        <label className="block text-sm font-medium text-black text-center">Confirmar contraseña</label>
        <input type="password" placeholder="Confirmar contraseña" className="w-full p-2 border rounded  text-black" />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Entrar
        </button>
      </form>
      {/* Registro a la izquierda */}
      <div className="text-sm mt-4 text-black text-left w-full max-w-xs">

        <a href="/registro" className="text-red-500 hover:underline block mt-1">
          ¿Ya tienes una cuenta?                    </a>
      </div>

    </div>
  );
}
