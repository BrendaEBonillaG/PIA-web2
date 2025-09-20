import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("perfil", "routes/perfil.tsx"),
  route("favoritos", "routes/favoritos.tsx")
] satisfies RouteConfig;
