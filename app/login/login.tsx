import imagen from "./imagen.png";
import logo from "./logo.png";

export function Login() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen overflow-hidden">
            {/* Columna izquierda */}
            <div className="md:col-span-1 flex flex-col items-center justify-center p-8 bg-white h-screen">
                <h2 className="text-xl font-semibold text-center mb-4 text-black">
                    Bienvenido al lugar donde podrás encontrar todo acerca de las ciudades sede en México de la copa mundial 2026.
                </h2>

                <div className="my-4">
                    <img src={logo} alt="Mapa" className="w-50 h-50 mx-auto" />
                </div>

                <form className="w-full max-w-xs space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-black">Usuario</label>
                        <input
                            type="text"
                            className="w-full border-2 border-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Usuario"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black">Contraseña</label>
                        <input
                            type="password"
                            className="w-full border-2 border-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Contraseña"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full border-2 border-black bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Entrar
                    </button>
                </form>

                <div className="text-sm mt-4 text-black text-center">
                    <p>¿No tienes cuenta?</p>
                    <a href="/registro" className="text-red-500 hover:underline block mt-1">
                        Regístrate...
                    </a>
                </div>

            </div>

            {/* Columna derecha */}
            <div className="hidden md:block md:col-span-2 h-screen overflow-hidden">
                <img
                    src={imagen}
                    alt="Bandera de México"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
