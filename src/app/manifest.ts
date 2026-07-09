import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Francisco Pontes — Engenheiro de Software Full Stack",
    short_name: "Francisco Pontes",
    description:
      "Portfólio de Francisco Pontes, Engenheiro de Software Full Stack em Fortaleza.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0d",
    theme_color: "#0a0a0d",
    icons: [
      {
        src: "/icon.png",
        sizes: "544x544",
        type: "image/png",
      },
    ],
  };
}
