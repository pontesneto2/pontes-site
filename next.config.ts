import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["src"],
    ignoreDuringBuilds: true,
  },
  images: {
    // AVIF antes de WebP: mesma qualidade percebida com payload menor,
    // reduzindo o peso de imagem que pesa em LCP.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.thum.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/devicon/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "pontes-portfolio.vercel.app" }],
        destination: "https://fcopts.com.br/:path*",
        permanent: true,
      },
      {
        source: "/work-with-me",
        destination: "/trabalhe-comigo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
