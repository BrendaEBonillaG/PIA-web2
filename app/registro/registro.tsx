export default function Registro() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-black">Registro de Usuario</h2>
      <form className="w-full max-w-xs space-y-4 bg-white p-6 rounded-lg shadow-md">
        <input type="text" placeholder="Nombre" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Correo" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Contraseña" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Registrarse
        </button>
      </form>
    </div>
  );
}
