import { Login } from "../login/login";
import Registro from "../registro/registro"; // ← importación por defecto

// Metadata de la página
export function meta() {
  return [
    { title: "Login - React Router App" },
    { name: "description", content: "Página de inicio de sesión" },
  ];
}

// Componente principal de la página Home
export default function Home() {
  return <Registro />;
}
