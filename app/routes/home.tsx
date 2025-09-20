import { Link } from 'react-router-dom';
import { Login } from "../login/login";
import Registro from "../registro/registro"; // ← importación por defecto
import Favoritos from "../routes/favoritos";
import Perfil from "../routes/perfil";

// Metadata de la página
export function meta() {
  return [
    { title: "Home - React Router App" },
    { name: "description", content: "Página de inicio de sesión o registro" },
  ];
}

// Componente principal de la página Home
export default function Home() {
  return (
   <Perfil />
  );
}
