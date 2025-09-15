import type { Route } from "./+types/home";
import { Login } from "../login/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - React Router App" },
    { name: "description", content: "Página de inicio de sesión" },
  ];
}

export default function Home() {
  return <Login />;  // <-- Renderizas el login en lugar de Welcome
}
