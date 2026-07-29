import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Programa de Colaboración · El Mas de Borràs",
    short_name: "Mas de Borràs",
    description:
      "Plataforma de colaboración para proyectos con fechas y cupos limitados.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7ef",
    theme_color: "#566b45",
    lang: "es",
  };
}
