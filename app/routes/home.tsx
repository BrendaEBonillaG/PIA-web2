import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Link } from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" }
 
  ];
}


export default function Home() {
  return (
    <div>
      <Welcome />
      
      {/* 👇 Aquí agregarías el botón */}
      <div className="text-center mt-8">
        <Link 
          to="/ejemplo" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ir a Página Ejemplo
        </Link>
      </div>
    </div>
  );
}